  exports.Model = function ( map_setttings ) {

    this['_cache'] = [];
    this['config'] = map_setttings;

  };

  Model.fn = Model.prototype;

  Model.fn.fetch = function ( kid, callback ) {

     this['_cache'] = customer.db.select('/select', {
      'condition' : [kid],
      'table'     : this['config']['table']
    });

    if ( typeof callback === 'function' ) {
      callback( this['_cache'][0] );
    }
    else {
      return  this['_cache'][0] ;
    }

  };

  Model.fn.getCache = function ( callback ) {

    if ( typeof callback === 'function' ) {
      callback( this._cache );
    }
    else {
      return this._cache;
    }

  };


  Model.fn.freeCache = function () {
    this['_cache'] = [];
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

    for ( var i in view_data ) {
      if ( view_data[i] !== '' && view_data[i] != this['_cache'][i] ) {
        result[i] = view_data[i];
      }
    }

    return result;

  };


  Model.fn.update = function ( view_data, callback ) {

    var update_data = this._checkWhatsUpdated( view_data );

    // updateする対象が存在する場合
    if ( _.keys(update_data).length > 0 ) {

      // データの更新
      customer.db.update('/update', {
        data      : update_data,
        condition : {'kid' : this['_cache']['kid']},
        table     : this['config']['table']
      });

      // 履歴の更新
      this._updateHistory( this._diffUpdated( update_data ) );

      // 再描画
      if ( typeof callback === 'function' ) {
        callback( this.fetch( this['_cache']['kid']) );
      }

      // 履歴テーブルの再描画
      customer.model.userHistory.fetch( this['_cache']['kid'],
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
      callback( this.fetch( this['_cache']['kid']) );
    }

  };

  Model.fn.delete = function ( data, callback ) {

    customer.db.remove('/delete', {
      data : data,
      table : this['config']['table']
    }, callback );

    if ( typeof callback === 'function' ) {
      callback( this.fetch() ) ;
    }

  };

  /**
   * 履歴に反映しない初回更新
   * @param  {[type]}   obj
   * @param  {Function} callback
   * @return {[type]}
   */
  Model.fn.initUpdate = function ( obj, callback ) {

    var kid = obj.kid;
    delete obj.kid;

    customer.db.update('/update', {
      data  : obj,
      condition : { 'kid' : kid },
      table : this['config']['table']
    }, callback );

  };

  /**
   * Historysクラス
   */
  exports.Historys = function () {

  };

  Historys.fn = Historys.prototype;

  Historys.fn.update = function () {

    customer.db.insert('/insert', {
      data  : data,
      table : 'historys'
    });

  };

  /**
   * [_diffUpdated description]
   * @param  {[type]} update_data
   * @return {[type]}
   * @private
   */
  Historys.fn.diffUpdated = function ( update_data ) {
    var
      before = {}
    , after  = {}
    , list_history = []
    ;

    for ( var i in update_data ) {

      list_history.push({
        kid          : this['_cache']['kid'],
        type         : '更新',
        content_name : this['config']['tab_name'],
        item_name    : this['config']['item_name_map'][i],
        before       : this['_cache'][i],
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
  Historys.fn._updateHistory = function ( data ) {

    customer.db.insert('/insert', {
      data  : data,
      table : 'historys'
    });

  };
