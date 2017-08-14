
( function ( $, exports ) {

  /**
   * View Controller クラス
   */

  exports.Controller = function ( content ) {
    this['wrap'] = $(content);
    this['_el'] = {};
    this['top'] = content;
  };

  Controller.fn = Controller.prototype;

  Controller.fn.$ = function ( selector ) {
    return $( selector, this.wrap );
  }

  /**
   * [initElement description]
   * @param  {[type]} map_element
   * @return {[type]}
   * TODO: deep性能をつけよう
   */
  Controller.fn.initElement = function ( map_element, key ) {

    this['selector'] = map_element;
    this['_el'] = this.deep( map_element, key );

  };

  Controller.fn.deep = function ( obj, key ) {

    if ( _.isObject(obj) ) {
      return _.mapObject( obj, function (v,k) {
        return this.deep(v);
      },this);
    }
    else {
      return this.$(obj);
    }

  };

  Controller.fn.propertys = function () {
    return _.keys( this['_el'] );
  };

  Controller.fn.get = function ( property ) {

    var local = this['_el'];
    property = property.split('__');

    if ( property.length === 1 ) {
      return this['_el'][property[0]];
    }

    for ( var i=0; i < property.length; i+=1 ) {
      local = local[ property[i] ];
    }
    return local;

  };

  Controller.fn.getSelector = function ( property ) {

    var local = this['selector'];
    property = property.split('__');

    if ( property.length === 1 ) {
      return this['selector'][property[0]];
    }

    for ( var i=0; i < property.length; i+=1 ) {
        local = local[ property[i] ];
    }

    return local;

  };

  Controller.fn.hasElement = function ( property ) {
    return this['_el'][property] ? true : false;
  };

  Controller.fn.addElement = function ( map_element ) {

    var
      list_key
    , local = this['_el']
    , k
    ;

    _.each( map_element, function ( val, key ) {
      list_key = key.split('__');
      local = this['_el'];
      k = _.last( list_key );

      if ( list_key.length === 1 ) {
        this['_el'][key] = this.$(val);
      }
      else {
        for ( var i = 0; i< list_key.length-1; i+=1 ) {
          if ( local.hasOwnProperty(list_key[i]) ) {
            local = local[list_key[i]];
          }
          else {
            local[list_key[i]] = {};
            local = local[list_key[i]];
          }
        }
        local[k] = this.$(val);
      }
    },this);


  };

  Controller.fn.updateElement = function ( map_element ) {

    var obj = {};

    // 文字列ならば既存の再登録
    if ( _.isString(map_element) ) {
      obj[map_element] = this.getSelector( map_element );
    }
    else {
      obj = map_element;
    }

    // 存在しない場合
    if ( _.isString(map_element) && !obj[map_element] ) {
      throw new Error('存在しないセレクタの更新です. addElementを使用してください.');
      return;
    }

    this.addElement( obj );

  };

  /**
   * [addListener description]
   * @param {[type]} map_callback
   * @example
   * Controller.addListner({
   *   'click kid'     : function () { console.log(this); },
   *   'click userkey' : onClickUserKey }
   * });
   * TODO: listenerを複数つけられるようにする？
   */
  Controller.fn.addListener = function ( map_callback, context ) {
    _.each( map_callback, function ( val, key ) {
      var
        event    = key.split(' ')[0]
      , property = key.split(' ')[1]
      ;

      if ( this.get(property) ) {
        if ( context ) {
          $(this.wrap).on( event, this.getSelector(property), $.proxy(val,this) );
        }
        else {
          $(this.wrap).on( event, this.getSelector(property), val );
        }
      }

    },this);
  };


  /**
   *  MODEL クラス
   */

  exports.Model = function ( map_setttings ) {

    this['_cache'] = [];
    this['config'] = map_setttings;

  };

  Model.fn = Model.prototype;

  Model.fn.fetch = function ( kids_id, callback ) {

     this['_cache'] = customer.db.select('/select', {
      'condition' : [kids_id],
      'table'     : this['config']['table']
    });

    if ( typeof callback === 'function' ) {
      callback( this['_cache'] );
      this['_filterList'] = this['_cache'];
    }
    else {
      this['_filterList'] = this['_cache'];
      return  this['_cache'] ;
    }

  };

  Model.fn.fetchAsync = function ( kids_id, callback ) {

    var
      context = this
    , promise
    ;

    promise = customer.db.post('/select', {
      'condition' : [kids_id],
      'table'     : this['config']['table']
    });

    if ( !promise ) {
      throw Error('非同期処理できません');
    }

    return promise.then( function (result) {
      context['_cache'] = result;
      context['_filterList'] = result;

      if ( typeof callback === 'function' ) {
        callback( result );
      }

      return result;

    });

  };

  Model.fn.search = function ( keyword, callback ) {

    var
      reg = new RegExp(keyword, 'i')
    , ary = []
    ;

    _.each( this['_cache'], function (item,idx) {

      var is_match = 0;

      _.each( item, function (v,k) {
        if ( String(v).match(reg) !== null ) {
          is_match = 1;
        }
      });

      if ( is_match === 1 ) {
        ary.push(item);
      }

    });

    if ( typeof callback  === 'function') {
      this['_filterList'] = ary;
      callback( ary );
    }
    else {
      return ary;
    }

  };


  Model.fn.add = function ( item ) {
    this['_cache'].push(item);
  };

  Model.fn.union = function ( list ) {
    this['_cache'] = _.union( this['_cache'], list );
  };

  Model.fn.getCache = function ( callback ) {

    if ( typeof callback === 'function' ) {
      callback( this._cache );
    }
    else {
      return this._cache;
    }

  };

  Model.fn.getFiltered = function () {
    return this['_filterList'];
  };

  Model.fn.freeCache = function () {
    this['_cache'] = [];
  };


  Model.fn.sortByKey = function ( key, callback ) {

  };

  Model.fn.find = function ( conditions, callback ) {

    var result;

    if ( _.isArray( conditions   ) ){
      result = this.findUnion( conditions );
    }
    else {
      result = this.findOneCondition( conditions );
    }

    this['_filterList'] = result;

    if ( typeof callback === 'function' ) {
      callback( result );
    }
    else {
      return result;
    }


  };

  Model.fn.findOneCondition = function ( map_condition ) {

    var filtered = this['_cache'];

    _.each( map_condition, function ( val, key ) {

      if ( val !== 'all') {
        filtered = _.select( filtered, function ( v, k ) {
          return v[key] === val;
        });
      }

    });

    return filtered;

  };

  /**
   * 検索結果の和集合を返す
   */
  Model.fn.findUnion = function ( list_condition ) {

    var
     list_result = []
   , filtered
   ;

    if ( !_.isArray( list_condition ) ) {
      console.log('arguments is not array!')
      return;
    }

    _.each( list_condition, function ( condition, index ) {

      if ( ! _.isObject( condition ) ) {
        return;
      }

      list_result = _.union( list_result, this.findOneCondition( condition ) );

    }, this );

    return list_result;

  };

  Model.fn.setCondition = function ( obj, callback ) {

    _.each( obj, function (val, key) {
      _condition[key] = val;
    });

    find( _condition, callback );

  };


  /**
   * [_checkWhatsUpdated description]
   * @param  {[type]} view_data
   * @return {[type]}
   * @private
   */
  Model.fn._checkWhatsUpdated = function ( view_data ) {

    var result = {};

    if ( !this['_cache'] ) {
      return view_data;
    }

    _.each( view_data, function ( v, k ) {
      // モデル値nullのときは、''で比較する
      if ( this['_cache'][0][k] === null ) {
        if ( v !== '' ) {
          result[k] = v;
        }
      }
      else {
        if ( this['_cache'][0][k] !== v ) {
          result[k] = v;
        }
      }
    },this);

    return result;

  };

  /**
   * [_diffUpdated description]
   * @param  {[type]} update_data
   * @return {[type]}
   * @private
   */
  Model.fn._diffUpdated = function ( update_data ) {
    var
      before = {}
    , after  = {}
    , list_history = []
    ;

    for ( var i in update_data ) {

      list_history.push({
        kids_id      : this['_cache'][0]['kids_id'],
        type         : '更新',
        content_name : this['config']['tab_name'],
        item_name    : this['config']['item_name_map'][i],
        before       : this['_cache'][0][i],
        after        : update_data[i]
      });

    }

    return list_history;

  };

  /**
   * [_updateHistory description]
   * @param  {[type]} data
   * @return {[type]}
   * @private
   */
  Model.fn._updateHistory = function ( data ) {

    customer.db.insert('/insert', {
      data  : data,
      table : 'historys'
    });

  };


  Model.fn.update = function ( view_data, callback ) {

    var update_data = this._checkWhatsUpdated( view_data );

    // updateする対象が存在する場合
    if ( _.keys(update_data).length > 0 ) {

      // データの更新
      customer.db.update('/update', {
        data      : update_data,
        condition : {'kids_id' : this['_cache'][0]['kids_id']},
        table     : this['config']['table']
      });

      // 履歴の更新
      this._updateHistory( this._diffUpdated( update_data ) );

      // 再描画
      if ( typeof callback === 'function' ) {
        callback( this.fetch( this['_cache'][0]['kids_id']) );
      }

      // 履歴テーブルの再描画
      customer.model.userHistory.fetch( this['_cache'][0]['kids_id'],
        customer.view.userHistory.drawTable
      );

    }

  };

  Model.fn.insert = function ( data, callback ) {

    customer.db.insert('/insert', {
      data  : data,
      table : this['config']['table']
    });

    if ( typeof callback === 'function' ) {
      callback( this.fetch( this['_cache'][0]['kids_id']) );
    }

  };

  Model.fn.delete = function ( data, callback ) {

    customer.db.remove('/delete', {
      data : data,
      table : this['config']['table']
    }, callback );

  };

  Model.fn.push = function ( data ) {
    var item = this.find({id : data.id});

    // 保持していないとき
    if ( item.length !== 0 ) {
      _.each( data, function ( val, key ) {
        item[0][key] = val;
      });
    }
    else {
      this.add(data);
    }

  };

  Model.fn.remove = function ( id ) {
    this['_cache'].some( function (v,i) {
      if ( v.id === id ) {
        this['_cache'].splice(i,1);
      }
    },this);
  };

  Model.fn.initUpdate = function ( obj, callback ) {

    var kids_id = obj.kids_id;
    delete obj.kids_id;

    return customer.db.post('/update', {
      data  : obj,
      condition : { 'kids_id' : kids_id },
      table : this['config']['table']
    });


  };

// モデルとコレクションをわけるのだ
// 今までModelに書いてきたメソッドのほとんどは、コレクションが持つ機能である

  exports.Collection = function () {

  };

  // 履歴管理クラス
  // exports.History = function ( config ) {
  //   this['config'] = config;
  // };

  // History.fn = History.prototype;

  // History.fn.makeDate = function () {};

  // History.fn.update = function () {};



}(jQuery, this));

