
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
  , changeUpdateInfo
  , clearUpdateInfo
  , update
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
   * 対応FenicsIDを更新
   */
  update = function () {

    if ( _updateInfo.length === 0 ) {
      return;
    }

    var
      params = {
        data : _model.find( _updateInfo )
      }
    , kid = _model.getCache()[0].kid
    ;

    cms.db.update('/updateClient', params, function () {
      _model.fetch( kid, cms.view.userClient.redrawTable );
    });

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
      'downloadSite' : 'https://',
      'downloadUrl'  : 'http:',
      'password'     : 'pass',
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
  _makeOpenNoticeMapList = function ( list_checked ) {

    var list_clients = _model.find( list_checked );

    return  _.map( list_clients, function ( val, key ) {

      return {
        'hostname'        : val.fenics_id && val.fenics_id.toUpperCase() || '',
        'fenics_id'       : val.fenics_id && 'hopecl-' + val.fenics_id || '',
        'password'        : val.fenics_id || '',
        'client_id'       : val.client_id,
        'client_password' : val.client_pass
      };
    });

  };

  makeOpenNotice = function ( list_checked ) {
    return {
      header :  _makeOpenNoticeHeader(),
      body   :  _makeOpenNoticeMapList(list_checked)
    }
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
      'DBName='  : db || '',
      'User='    : base.userkey || '',
      'Password=' : base.db_password || ''
    };
  }

  // to public
  cms.model.clients = {
    fetch               : $.proxy( _model.fetch, _model ),
    getCache            : $.proxy( _model.getCache, _model),
    find                : $.proxy( _model.find, _model ),
    insert              : $.proxy( _model.insert, _model ),
    delete              : $.proxy( _model.delete, _model ),
    tmp                 : _makeOpenNoticeMapList,
    changeUpdateInfo    : changeUpdateInfo,
    clearUpdateInfo     : clearUpdateInfo,
    update              : update,
    makeBatInfo         : makeBatInfo,
    makeOpenNotice      : makeOpenNotice
  };

}( jQuery, customer ));