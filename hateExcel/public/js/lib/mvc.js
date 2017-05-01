
( function ( $, exports ) {

  // Contorllerの役割は何か？
  // DOM管理（作成、更新）
  // Event登録、削除
  exports.Controller = function ( content ) {
    this.view = $(content);
    this['_el'] = {};
  };

  Controller.fn = Controller.prototype;

  Controller.fn.$ = function ( selector ) {
    return $( selector, this.view );
  }

  /**
   * [initElement description]
   * @param  {[type]} elements_map
   * @return {[type]}
   * TODO: deep性能をつけよう
   */
  Controller.fn.initElement = function ( elements_map, key ) {

    this['selector'] = elements_map;
    this.deep( elements_map, key );

    // _.each( elements_map, function ( val, key ) {
    //   this['_el'][key] = this.$(val);
    // },this);

  };

  Controller.fn.deep = function ( obj, key ) {

    for ( var i in obj ) {
      if ( ! (typeof obj[i] === 'object')) {
        if ( !key ) {
          this['_el'][i] = this.$(obj[i]);
        }
        else {
          this['_el'][key][i] = this.$(obj[i]);
        }
      }
      else {
        this['_el'][i] = {}
        this.deep(obj[i], i );
      }
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
    // return this['selector'][property];

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

  Controller.fn.addElement = function ( elements_map ) {
    _.each( elements_map, function ( val, key ) {
      if ( !this.get(key) ) {
        this['_el'][key] = this.$(val);
      }
    },this);
  };

  Controller.fn.updateElement = function ( elements_map ) {
    _.each( elements_map, function ( val, key ) {
      if ( this.get(key) ) {
        this['_el'][key] = this.$(val);
      }
    },this);
  };

  /**
   * [addListener description]
   * @param {[type]} callbacks_map
   * @example
   * Controller.addListner({
   *   'click kid'     : function () { console.log(this); },
   *   'click userkey' : onClickUserKey }
   * });
   * TODO: listenerを複数つけられるようにする？
   */
  Controller.fn.addListener = function ( callbacks_map, context ) {
    _.each( callbacks_map, function ( val, key ) {
      var
        event    = key.split(' ')[0]
      , property = key.split(' ')[1]
      ;

      if ( this.get(property) ) {
        if ( context ) {
          $(this.view).on( event, this.getSelector(property), $.proxy(val,this) );
        }
        else {
          $(this.view).on( event, this.getSelector(property), val );
        }
      }

    },this);
  };

}(jQuery, this));

