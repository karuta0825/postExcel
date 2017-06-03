/**
 * ネットワーク情報モデル
 */

( function ( $, cms ) {

  var
    _model = new Model({
      'table' : 'fenics'
    })
  , _updateInfo = []
  , makeFenicsDownloadMap
  , changeUpdateInfo
  , update
  ;

  changeUpdateInfo = function ( id ) {
    _updateInfo.push({ fenics_id : id });
  };

  update = function () {

    var
      params = {
        data : _model.find( _updateInfo )
      }
    , kid = _model.getCache()[0].kid
    ;

    cms.db.update('/updateFenics', params, function () {
      _model.fetch( kid, cms.view.userNetwork.redrawTable );
    });

  };

  /**
   * fenicsアカウント作成CSV用のオブジェクト配列の生成
   * @param  {Array} list_checed - チェックの付いたfenicsId
   * @return {Array}             - 列順のオブジェクト配列
   */
  makeAccountMapList = function ( list_checed ) {

    var user_name    = cms.model.userBaseInfo.getCache().user_name;
    var partner_name = cms.model.userPartner.getCache().name;
    var server       = cms.model.userBaseInfo.getCache().server;
    var list_fenics  = _model.find( list_checed );

    return _.map( list_fenics, function ( val, key ) {
      return {
        'update_flag'          : 'A',
        'prefix'               : 'hopecl-',
        'user_label'           : val.fenics_id,
        'init_password'        : val.password,
        'id_group'             : 'お客様　システム１',
        'access_control_group' : 'お客様用　システム１',
        'start_date'           : val.start_on,
        'end_date'             : '',
        'comment1'             : user_name,
        'comment2'             : 'パートナー　' + partner_name,
        'comment3'             : 'システム１　' + server,
        'regist_terminal_flag' : 2
      };
    });

  };

  cms.model.userNetwork = {
    fetch               : $.proxy( _model.fetch, _model ),
    getCache            : $.proxy( _model.getCache, _model),
    delete              : $.proxy( _model.delete, _model ),
    find                : $.proxy( _model.find, _model ),
    makeAccountMapList  : makeAccountMapList,
    changeUpdateInfo    : changeUpdateInfo,
    update              : update
  };

}( jQuery, customer ));

