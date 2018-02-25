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
  , _sortOrder = 1
  , _sortHeaderMap = {
      'id'         : '',
      'kid'        : '',
      'fenics_id'  : '',
      'fenics_ip'  : '',
      'password'   : '',
      'start_on'   : '',
      'end_on'     : '',
      'is_mobile'  : '',
      'create_on'  : '',
      'category'   : ''
    }
  , _filterInfo = {
      search : '',
      ip : { from : '', to : '' },
      isMoible : ''
    }
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
  , item_name = {
      category  : "カテゴリ",
      start_on  : "fenics開始日",
      end_on    : "fenics終了日"
    }
  // private method
  , _findUnion
  , _findOneCondition
  , _delete
  , _update
  // public method
  , update
  , fetch
  , getCache
  , filterIp
  , sort
  , setSortInfo
  , getSortInfo
  , setFilterInfo
  , getFiltered
  , deletes
  ;

  _delete = function ( fenics_id ) {
    var params = {
      table : 'fenics',
      data : [fenics_id]
    };
    return cms.db.post('/delete', params );
  };

  _makeHistoryItems = function ( before, diff ) {

    var
     fenics_id = before.fenics_id
    , arys = []
    ;

    _.each( diff, function (v,k) {
      arys.push({
        kids_id      : before.kids_id,
        type         : '更新',
        content_name : 'ネットワーク',
        item_name    : fenics_id + 'の' + item_name[k],
        before       : before[k],
        after        : v
      })
    });

    return arys;

  };

  // 成功時と失敗時のコールバックを引数にすることで
  // viewの負担が減る
  // TODO: 一括用のupdateに限定されており、IPの変更などができない
  update = function ( fenics_id, updateObj ) {

    var
      now = _.clone(find({fenics_id : fenics_id})[0])
    , updateInfo = Object.assign({}, now, updateObj)
    , diffInfo = util.diffObj( now, updateInfo, false )
    , historyItems = _makeHistoryItems(now,diffInfo)
    ;

    return cms.db.post('/updateFenics', { data : [updateInfo] })
    .then( function () {
      // 履歴作成
      cms.db.insert('/insert', {
        data  : historyItems,
        table : 'historys'
      });
    })
    ;

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

  search = function ( keyword, model  ) {

    var
      data = model || getFiltered()
    , reg = new RegExp(keyword, 'i')
    , ary = []
    ;

    _.each( data, function (item,idx) {

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

    _page.initialize(ary, MAX_VISIBLE_NUMBER);
    return ary;

  };

  filterIp = function ( from, to, model ) {
    var
      data = model || getFiltered()
    , from_num = util.inet_aton(from)
    , to_num = util.inet_aton(to)
    , filterd
    ;

    if ( from_num === 0 || to_num === 0) {
      _page.initialize( data, MAX_VISIBLE_NUMBER );
      return data;
    }

    if ( from_num > to_num ) {
      _page.initialize( data, MAX_VISIBLE_NUMBER );
      return data;
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

  sort = function (column) {
    var
      data = getFiltered()
    , isAsc = ( getSortInfo(column) === 'asc' ) ? true : false
    , filtered
    ;

    if ( column === 'fenics_ip' ) { column = 'fenics_ip_num' }

    filtered = data.sort( function ( item1, item2 ) {
      item1 = _.isString( item1[column] ) && item1[column].toString().toLowerCase() || item1[column];
      item2 = _.isString( item2[column] ) && item2[column].toString().toLowerCase() || item2[column];
      if ( item1 < item2 ) {
        return -1 * _sortOrder;
      }
      else if ( item1 > item2 ) {
        return 1 * _sortOrder;
      }
    });

    _sortOrder = ( isAsc ) ? -1 : 1;

    _page.initialize( filtered, MAX_VISIBLE_NUMBER );
    return filtered;

  };

  setSortInfo = function ( column ) {

    if ( !_sortHeaderMap.hasOwnProperty(column) ) {
      throw new Error( column + 'をキーに持たないためソートできません');
    }

    var before = getSortInfo(column);

    // all clear
    for (var i in _sortHeaderMap ) {
      _sortHeaderMap[i] = '';
    };

    // set
    if ( before === 'asc' ) {
      _sortHeaderMap[column] = 'desc';
    }
    else if ( before === 'desc' ) {
      _sortHeaderMap[column] = 'asc';
    }
    else {
      _sortHeaderMap[column] = 'asc';
    }

  };

  getSortInfo = function ( column ) {
    if (!column) {
      return _sortHeaderMap;
    }
    return _sortHeaderMap[column];
  };

  getFiltered = function () {
    var filter;

    if ( find({is_mobile : _filterInfo.is_mobile}).length < 1) {
      filter = getCache();
    }
    else {
      filter = find({is_mobile : _filterInfo.is_mobile});
    }

    filter = filterIp( _filterInfo['ip']['from'], _filterInfo['ip']['to'], filter );
    filter = search( _filterInfo['search'], filter );

    if ( !filter ) {
      return getCache();
    }

    _page.initialize( filter, MAX_VISIBLE_NUMBER );
    return filter;
  };

  setFilterInfo = function (key, value) {
    _filterInfo[key] = value;
  };

  deletes = function ( fenics_ids ) {

    var length = fenics_ids.length;

    return util.loopWithPromise(
      _delete,
      _.map( fenics_ids, function (v) { return [v] }),
      0,
      length-1
    );

  };

  updates = function ( fenics_ids, updateObj ) {

    var length = fenics_ids.length;

    return util.loopWithPromise(
      update,
      _.map( fenics_ids, function (v) { return [v.fenics_id, updateObj] }),
      0,
      length-1
    );

  };

  // to public
  cms.model.fenics = {
    update       : update,
    updates      : updates,
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
    getCurrent   : $.proxy( _page.current, _page ),
    setSortInfo  : setSortInfo,
    getSortInfo  : getSortInfo,
    setFilterInfo : setFilterInfo,
    getFiltered : getFiltered,
    deletes       : deletes,
  };

} ( jQuery, customer ));