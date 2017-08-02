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
      'kid'        : 'noCheck',
      'fenics_id'  : 'isAlphaNum',
      'password'   : 'isAlphaNum',
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
      errs = vl.validate( view_data )
    , kid  = cms.model.userBaseInfo.getCache().kid
    ;

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

          // 再取得してテーブル更新
          _model.fetchAsync( kid, function () {

            cms.model.userNetwork.find({is_mobile : 0},
              cms.view.userNetwork.drawTable
            );

            cms.model.userNetwork.find({is_mobile : 1},
              cms.view.userMobile.drawTable
            );

          });

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
   * @param {[type]} view_data
   */
  addFenicsAccount = function ( view_data ) {

    var before = customer.model.userBaseInfo.getCache();
    var after  = view_data.number_pc;
    var diff   = after - before.number_pc;

    if ( diff < 1 ) {
      return;
    }

    var post = {
      kid             : before.kid,
      fenics_key      : before.fenics_key,
      number_pc_added : diff
    }

    customer.db.insert('/addFenicsAccounts',
      { data  : post },
       function () {
        customer.model.userNetwork.fetch( before.kid,
          customer.view.userNetwork.drawTable
        );
       }
    );

  };

  deleteFenics = function ( id, callback ) {

    var
      kid = cms.model.userBaseInfo.getCache().kid
    , number_accounts_now = cms.model.kids.find({kid : kid})[0].number_pc
    , is_mobile = _model.find({'fenics_id' : id })[0].is_mobile
    , params = {
        table : 'fenics',
        data : [{ fenics_id : id }]
      }
    ;

    cms.db.post('/delete', params )
    .then( function () {
      return cms.model.userNetwork.fetch( kid );
    })
    .then( function () {

      // ネットワークタブ再描画
      cms.model.userNetwork.find({'is_mobile' : 0},
        cms.view.userNetwork.drawTable
      );

      // モバイルfenicsテーブル再描画
      cms.model.userNetwork.find({'is_mobile' : 1},
        cms.view.userMobile.drawTable
      );

    })
    .then( function () {

      // ここがモバイルかどうかで分岐の必要あり
      if ( !is_mobile ) {

        // 端末台数の変更
        cms.model.kids.update({
            'kid'       : kid,
            'number_pc' : number_accounts_now - 1
          }, function () {
            cms.view.userBaseInfo.refresh();
        });

      }
      else {
        cms.model.userMobile.fetch(kid, cms.view.userMobile.setInfo )
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

