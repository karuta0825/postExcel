/**
 * HOME画面グラフ用モデル
 */


( function ( $, cms ) {

  var
    _model = new Model({'table' : 'get_add_info_in_each_month'})
  , indexMonth = moment()
  , initModule
  , get
  , find
  , refresh
  ;

  initModule = function () {

    var params = {
      'table' : 'add_info'
    };

    params['condition'] = indexMonth.format('YYYY/MM');

    _model['_cache'] = cms.db.select('/select', params );

  };

  get = function ( state, callback ) {

    var params = {
      'table' : 'add_info'
    };

    if ( state === 'next' ) {
      params['condition'] = indexMonth.add(1, 'months').format('YYYY/MM');
    }

    if ( state === 'prev' ) {
      params['condition'] = indexMonth.add(-1, 'months').format('YYYY/MM');
    }

    if ( state === 'this_month' ) {
      indexMonth = moment();
      params['condition'] = indexMonth.format('YYYY/MM');
    }

    _model['_cache'] = cms.db.select('/select', params );
    if ( typeof callback === 'function' ) {
      callback();
    }
    else {
      return _model['_cache'];
    }

  };

  /**
   * バージョンごとの追加情報(２次元配列)を取得する。
   * @param  {String} version
   * @return {Array}
   */
  find = function ( version ) {

    var list_select = _.map( _model.find({'version' : version}), _.clone );

    list_select = _.map(list_select, function (v,k) {
      delete v.version;
      return v;
    });

    list_select = _.map( list_select, function ( v,k ) {
      return _.values(v);
    });

    // ヘッダー追加
    list_select.unshift(['','ユーザ','クライアント', 'PC']);

    return list_select;

  };

  refresh = function ( callback ) {

    _model['_cache'] = cms.db.select('/select', { 'table' : 'add_info' });

    callback( 'ES' );
    callback( 'LM' );

  };

  // to public
  cms.model.homeGraph = {
    initModule : initModule,
    find       : find,
    getCache   : $.proxy( _model.getCache, _model ),
    get        : get,
    refresh    : refresh
  };

} ( jQuery, customer ));
