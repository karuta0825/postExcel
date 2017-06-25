/**
 * HOME画面グラフ用モデル
 */


( function ( $, cms ) {

  var
    _model = new Model({'table' : 'get_add_info_in_each_month'})
  , initModule
  , find
  ;

  initModule = function () {
    _model.fetch();
  };

  /**
   * バージョンごとの追加情報(２次元配列)を取得する。
   * @param  {String} version
   * @return {Array}
   */
  find = function ( version ) {

    var list_select =_model.find({'version' : version});

    list_select = _.map(list_select, function (v,k) {
      delete v.version;
      return v;
    });

    list_select = _.map( list_select, function ( v,k ) {
      return _.values(v);
    });

    // ヘッダー追加
    list_select.unshift(['','ユーザ','クライア ント', 'PC']);

    return list_select;

  };

  // to public
  cms.model.homeGraph = {
    initModule : initModule,
    find       : find,
    getCache   : $.proxy( _model.getCache, _model )
  };

} ( jQuery, customer ));
