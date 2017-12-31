/**
 * Fenicsリストモデル
 * Ajax Defferedのテスト用にする
 */

( function ( $, cms ) {

  var
    // member
    _cache
  , _page = new Page([],1)
  , MAX_VISIBLE_NUMBER = 50
  , vl = new util.Validate({
      'id'         : 'noCheck',
      'kid'        : 'noCheck',
      'fenics_id'  : 'isAlphaNum',
      'fenics_ip'  : 'isIp',
      'password'   : 'isAlphaNum',
      'start_on'   : 'noCheck',
      'end_on'     : 'noCheck',
      'is_mobile'  : 'noCheck',
      'create_on'  : 'noCheck'
    })
  // private method
  , _findUnion
  , _findOneCondition
  // public method
  , update
  , fetch
  , getCache
  , filterIp
  , sort
  ;

  // 成功時と失敗時のコールバックを引数にすることで
  // viewの負担が減る
  update = function ( view_data, cb_success, cb_fail ) {

    var
      errs = vl.validate( view_data );

    if ( errs && errs.length > 0 ) {
      cb_fail( errs );
      return;
    }

    cms.db.post('/isUniqueIp', { ip : view_data['fenics_ip']})
    .then( function (result) {

      // 重複で更新不可
      if ( result.length > 0 && result[0]['fenics_id'] !== view_data['fenics_id']) {

        cb_fail( ['fenics_ip'] );

      }
      // 更新可能
      else {

        cms.db.post('/updateFenics', { data : [view_data] })
        .then( function () {
          _model.fetchAsync( null, cms.view.fenics.drawTable );
        })
        .then ( function (result) {
          cb_success();
        })
        .fail( function (err) {
          throw Error(err);
        });

      }

    });

  };

  fetch = function () {
    return customer.db.post('select', {table: 'all_fenics'})
    .then( function (r) {
      localStorage.setItem('fenics', JSON.stringify(r));
      _page.initialize( r, MAX_VISIBLE_NUMBER );
      return _page.current();
    })
  };

  getCache = function () {
    return JSON.parse( localStorage.getItem('fenics') );
  };

  find = function ( conditions, callback ) {
    var result;

    if ( _.isArray( conditions   ) ){
      result = _findUnion( conditions );
    }
    else {
      result = _findOneCondition( conditions );
    }

    if ( typeof callback === 'function' ) {
      callback( result );
    }
    else {
      return result;
    }
  };

  _findOneCondition = function ( map_condition ) {

    var data = getCache();

    _.each( map_condition, function (val, key) {

      if ( val !== 'all') {
        data = _.select( data, function ( v, k ) {
          return v[key] === val;
        });
      }

    });

    return data;

  };

  _findUnion = function ( list_condition ) {

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

      list_result = _.union( list_result, _findOneCondition( condition ) );

    });

    return list_result;

  };

  search = function ( keyword, callback ) {

    var
      reg = new RegExp(keyword, 'i')
    , ary = []
    ;

    _.each( getCache(), function (item,idx) {

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
      callback( ary );
    }
    else {
      return ary;
    }

  };

  filterIp = function ( from, to ) {
    var
      data = getCache()
    , from_num = util.inet_aton(from)
    , to_num = util.inet_aton(to)
    , filterd
    ;

    if ( from_num === 0 || to_num === 0) {
      _page.initialize( data, MAX_VISIBLE_NUMBER );
      return _page.current();
    }

    if ( from_num > to_num ) {
      _page.initialize( data, MAX_VISIBLE_NUMBER );
      return _page.current();
    }

    filtered = _.filter( data, function (item) {
      return (
        from_num <= item['fenics_ip_num'] &&
        item['fenics_ip_num'] <= to_num
      );
    });

    _page.initialize( filtered, MAX_VISIBLE_NUMBER );

    return filtered;

  };

  sort = function (key, isAsc) {
    var data = getCache();
    if ( isAsc ) {
      return _.sortBy( data , function (v) {
        return v[key];
      });
    }
    else {
      return _.sortBy( data , function (v) {
        return -v[key];
      });
    }
  }

  // to public
  cms.model.fenics = {
    update       : update,
    fetch        : fetch,
    getCache     : getCache,
    find         : find,
    search       : search,
    filterIp     : filterIp,
    sort         : sort,
    nextPage     : $.proxy( _page.next, _page ),
    prevPage     : $.proxy( _page.prev, _page ),
    getPage      : $.proxy( _page.get, _page ),
    getPageIndex : $.proxy( _page.getIndex, _page ),
    getPageList  : $.proxy( _page.getPageList, _page ),
    getCurrent   : $.proxy( _page.current, _page )
  };

} ( jQuery, customer ));