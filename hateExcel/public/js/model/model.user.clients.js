
/**
 * クライアント情報モデル
 *
 */
( function ( $, cms ) {

  /*member*/
  var
    _model = new Model({
      'table' : 'clients'
    })
  , _updateInfo = []
  , _makeOpenNoticeHeader
  , _makeOpenNoticeMapList
  , _makeOpenNoticeMapListForAdd
  , changeUpdateInfo
  , clearUpdateInfo
  , update
  , remove
  , makeOpenNotice
  , makeBatInfo
  ;

  changeUpdateInfo = function ( id ) {
    _updateInfo.push({ client_id : id });
  };

  clearUpdateInfo = function () {
    _updateInfo = [];
  };

  /**
   * Citrixユーザー情報の更新
   */
  update = function () {

    if ( _updateInfo.length === 0 ) {
      return;
    }

    var
      params = {
        data : _model.find( _updateInfo )
      }
    , kids_id = _model.getCache()[0].kids_id
    ;

    cms.db.post('/updateClient', params )
    .then(function() {
      return _model.fetch( kids_id );
    })
    .then(function (r) {
      cms.view.userClient.redrawTable(r);
    });

  };

  remove = function ( data, callback ) {

    var
      base = cms.model.userBaseInfo.getCache()
    , history_info = {
        kids_id      : base['id'],
        type         : '更新',
        content_name : '基本情報',
        item_name    : 'ユーザ数(CitrixID数)',
        before       : base['client_number'],
        after        : base['client_number'] - data.length
      }
    ;

    customer.db.post('/insert', {
      data  : [history_info],
      table : 'historys'
    })
    .then( function () {
      return customer.model.userHistory.fetch( base['id'] );
    })
    .then( function (r) {
      customer.view.userHistory.drawTable(r);
    })
    .then( function () {
      _model.delete( data );
    })
    .then( function () {
      cms.view.homeNotices.refresh();
      cms.view.homeGraph.refresh();
      cms.view.kids.refresh();
      cms.view.userBaseInfo.refresh();
      cms.view.userClient.refresh();
    })
    .then( callback );

  };

  /**
   * 開通通知書の基本情報
   * @return {Object}
   */
  _makeOpenNoticeHeader = function () {

    var
      base = cms.model.userBaseInfo.getCache()
    , ip = cms.model.servers.find({ name : base.server })[0].ip
    ;

    return {
      'user_name'    : base.user_name,
      'kid'          : base.kid,
      'userkey'      : base.userkey,
      'db_password'  : base.db_password,
      'domain'       : base.server,
      'ap_address'   : ip,
      'citrix_url'   : 'http://' + ip + '/Citrix/PNagent/config.xml'
    };

  };



  /**
   * 選択したクライアントの開通通知用の行情報取得
   * @param  {Array} list_checked
   * @return {Array}
   * TODO:
   */
  _makeOpenNoticeMapList = function ( list_checked, is_add ) {

    var
      list_clients  = _model.find( list_checked )
    , fenics_account
    , result
    ;

    return  _.map( list_clients, function ( val, key ) {

      fenics_account = cms.model.userNetwork.find({ 'fenics_id' : val.fenics_id })[0];

      result = {
        'hostname'        : fenics_account && fenics_account.pc_name || '',
        'fenics_id'       : val.fenics_id && 'hopecl-' + val.fenics_id || '',
        'password'        : val.fenics_id || '',
        'client_id'       : val.client_id,
        'client_password' : val.client_pass
      };

      if( is_add ) {
        result['comment'] = moment().format('YYYY/MM/DD') + ' 追加分';
      }

      return result;

    });

  };

  makeOpenNotice = function ( list_checked, is_add ) {

    var content = _makeOpenNoticeMapList(list_checked, is_add );

    return {
      header :  _makeOpenNoticeHeader(),
      body   :  content
    };

  };

  /**
   * iniファイル作成用のデータ取得
   */
  makeBatInfo = function ( list_checked ) {

    var
      base = cms.model.userBaseInfo.getCache()
    , ap = base.server
    , db = cms.model.servers.find({ name : ap })[0].connect_db
    ;

    return {
      '[USER]'   : '',
      'DBName='  : db || '',
      'User='    : base.userkey || '',
      'Password=' : base.db_password || ''
    };
  }

  // to public
  cms.model.userClients = {
    fetch               : $.proxy( _model.fetchAsync, _model ),
    getCache            : $.proxy( _model.getCache, _model),
    find                : $.proxy( _model.find, _model ),
    insert              : $.proxy( _model.insert, _model ),
    delete              : remove,
    changeUpdateInfo    : changeUpdateInfo,
    clearUpdateInfo     : clearUpdateInfo,
    update              : update,
    makeBatInfo         : makeBatInfo,
    makeOpenNotice      : makeOpenNotice
  };

}( jQuery, customer ));
