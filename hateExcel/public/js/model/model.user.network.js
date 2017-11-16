/**
 * ネットワーク情報モデル
 * TODO:名前をfenicsに変えよう
 *       viewに縛られる必要はない
 */

( function ( $, cms ) {

  var
    _model = new Model({
      'table' : 'fenics'
    })
  , vl = new util.Validate({
      'kids_id'    : 'noCheck',
      'fenics_id'  : 'isAlphaNum',
      'password'   : 'isAlphaNum',
      'pc_name'    : 'isAlphaNum',
      'fenics_ip'  : 'isIp',
      'start_on'   : 'noCheck',
      'end_on'     : 'noCheck',
      'is_mobile'  : 'noCheck',
      'create_on'  : 'noCheck'
    })
  // update候補のidのみ保存
  , makeFenicsDownloadMap
  , update
  , addFenicsAccount
  , deleteFenics
  , registerFenicsAccount
  ;

  update = function ( view_data, cb_success, cb_fail ) {

    var
      errs    = vl.validate( view_data )
    , kids_id = cms.model.userBaseInfo.getCache().id
    ;

    if ( errs && errs.length > 0 ) {
      cb_fail( errs );
      return;
    }

    return cms.db.post('/isUniqueIp', { ip : view_data['fenics_ip']})
    .then( function (result) {

      // 重複で更新不可
      if ( result.length > 0 && result[0]['fenics_id'] !== view_data['fenics_id']) {
        cb_fail( ['fenics_ip'], function () {
          cms.view.dialogAlert.open('FenicsIPが重複してます');
        });
        throw new Error('FenicsIP重複');
      }

    })
    .then( function () {
      return cms.db.post('/updateFenics', { data : [view_data] })
    })
    .then( function () {
      return _model.fetchAsync( kids_id );
    })
    .then ( function (result) {
      if (typeof cb_success === 'function'){ cb_success() };
    })
    .catch( function (err) {
      throw new Error(err);
    });


  };

  /**
   * fenicsアカウント作成CSV用のオブジェクト配列の生成
   * @param  {Array} list_checed - チェックの付いたfenicsId
   * @return {Array}             - 列順のオブジェクト配列
   */
  makeAccountMapList = function ( list_checed ) {

    var user_name    = cms.model.userBaseInfo.getCache().user_name;
    var partner_name = cms.model.userPartner.getCache()[0].sa_company || '';
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
        'start_date'           : val.start_on && moment(val.start_on).format('YYYYMMDD') || '',
        'end_date'             : '',
        'comment1'             : user_name,
        'comment2'             : 'パートナー　' + partner_name,
        'comment3'             : 'システム１　' + server,
        'regist_terminal_flag' : 2
      };
    });

  };

  /**
   * 追加した数を取得
   * @param {Object} view_data
   */
  addFenicsAccount = function ( view_data ) {

    var before = customer.model.userBaseInfo.getCache();
    var after  = view_data.number_pc;
    var diff   = after - before.number_pc;

    if ( diff < 1 ) {
      return;
    }

    var post = {
      kids_id         : before.id,
      fenics_key      : before.fenics_key,
      number_pc_added : diff
    }

    return customer.db.post('/addFenicsAccounts', { data  : post } )
    .then( function () {
      return customer.model.userNetwork.fetch( before.id );
    })
    .then( function (r) {
      cms.model.userNetwork.find( {is_mobile:0},
        customer.view.userFenics.drawTable
      );
    });

  };

  deleteFenics = function ( fenics_id, callback ) {

    var
      kids_id = cms.model.userBaseInfo.getCache().id
    , number_accounts_now = cms.model.userBaseInfo.getCache().number_pc
    , is_mobile = _model.find({'fenics_id' : fenics_id })[0].is_mobile
    , params = {
        table : 'fenics',
        data : [{ 'fenics_id' : fenics_id }]
      }
    , number_mobile_accounts_now
    ;

    if (is_mobile) {
      number_mobile_accounts_now = cms.model.userMobile.getCache()[0].client_number;
    }

    return cms.db.post('/delete', params )
    .then( function () {
      return cms.model.userNetwork.fetch( kids_id );
    })
    .then( function () {
      // ネットワークタブ再描画
      cms.model.userNetwork.find({'is_mobile' : 0},
        cms.view.userFenics.drawTable
      );

      // モバイルfenicsテーブル再描画
      cms.model.userNetwork.find({'is_mobile' : 1},
        cms.view.userMobile.drawTable
      );
    })
    // PC用のとき
    .then( function () {

      if ( !is_mobile ) {
        // 端末台数の変更
        cms.model.kids.update({
          'id'        : kids_id,
          'number_pc' : number_accounts_now - 1
        });
      }

    })
    // モバイル用のとき
    .then( function () {

      if ( is_mobile ) {
        cms.model.userMobile.fetch(kids_id, cms.view.userMobile.setInfo );

        cms.db.post('/insert', {
          data : [{
            kids_id      : kids_id,
            type         : '更新',
            content_name : 'モバイル',
            item_name    : 'デバイス数',
            before       : number_mobile_accounts_now,
            after        : number_mobile_accounts_now-1
          }],
          table : 'historys'
        })
        .then( function () {
          cms.model.userHistory.fetch( kids_id, cms.view.userHistory.drawTable);
        });
      }

    })
    .then( callback )
    ;

  };

  /**
   * ユーザ登録時のFenicsアカウント作成関数
   * @param  {Object} map
   * @param  {String} map.kid
   * @param  {String} map.fenics_key
   * @param  {Number} map.number_pc_added
   * @return {Promise}
   */
  registerFenicsAccount = function ( map ) {

    var params = { data : map };
    return cms.db.post('/addFenicsAccounts', params );

  };


  cms.model.userNetwork = {
    fetch                 : $.proxy( _model.fetchAsync, _model ),
    getCache              : $.proxy( _model.getCache, _model),
    delete                : $.proxy( _model.delete, _model ),
    deleteFenics          : deleteFenics,
    find                  : $.proxy( _model.find, _model ),
    makeAccountMapList    : makeAccountMapList,
    addFenicsAccount      : addFenicsAccount,
    registerFenicsAccount : registerFenicsAccount,
    update                : update
  };

}( jQuery, customer ));

