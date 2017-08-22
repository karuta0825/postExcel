
/**
 * View Controller クラス
 */

( function ( $, exports ) {

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


}(jQuery, this));

