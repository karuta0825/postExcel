/**
 * ビジV情報
 */

( function ( $, cms ) {

  var
    config = {
      table : 'busivs',
      tab_name : 'ネットワーク',
      item_name_map : {
        'circuit_name'           : '回線品目',
        'circuit_service'        : '回線サービス',
        'open_date'              : '開通通知日',
        'w_network'              : 'ネットワークアドレス',
        'w_subnet'               : 'サブネットマスク',
        'w_router'               : 'Sirルータアドレス',
        'has_sx'                 : 'S連携有無',
        'how_to_cooperate'       : '連携方法',
        'has_L3'                 : 'L3有無',
        'sx_ip'                  : 'SのIPアドレス',
        'has_carte'              : 'カルテ連携有無',
        'carte_system'           : 'カルテシステム',
        'carte_html_save_ip'     : 'カルテHTML保存IP',
        'has_cc'                 : 'CC連携',
        'cc_ip'                  : 'CCのIPアドレス',
        'download_server_ip'     : 'ダウンロードサーバ',
        'auth_server_ip'         : '認証サーバ',
        'virual_dl_ip'           : '仮想ダウンロードIPアドレス' ,
        'has_sxr_j'              : 'SXRまたはJ連携有無' ,
        'sx_ip'                  : 'SのIP' ,
        'has_rx'                 : 'RX連携有無' ,
        'rx_ip'                  : 'RのIPアドレス' ,
        'has_sd'                 : 'スマデバ有無' ,
        'clients_ip'             : 'クライアントIPアドレス'
      }
    }
  , vl = {}
  , _model = new Model( config )
  ;

  vl['LM'] = new util.Validate({
    'circuit_name'           : 'noCheck',
    'circuit_service'        : 'noCheck',
    'open_date'              : 'noCheck',
    'w_network'              : 'isIp',
    'w_subnet'               : 'isIp',
    'w_router'               : 'isIp',
    'has_sx'                 : 'noCheck',
    'how_to_cooperate'       : 'noCheck',
    'has_L3'                 : 'noCheck',
    'sx_ip'                  : 'noCheck',
    'has_carte'              : 'noCheck',
    'carte_system'           : 'noCheck',
    'carte_html_save_ip'     : 'isIp',
    'has_cc'                 : 'noCheck',
    'cc_ip'                  : 'isIp',
    'download_server_ip'     : 'isIp',
    'auth_server_ip'         : 'isIp'
  });

  vl['ES'] = new util.Validate({
    'circuit_name'    : 'noCheck',
    'circuit_service' : 'noCheck',
    'open_date'       : 'noCheck',
    'w_network'       : 'isIp',
    'w_subnet'        : 'isIp',
    'w_router'        : 'isIp',
    'virtual_dl_ip'   : 'noCheck' ,
    'has_sxr_j'       : 'noCheck' ,
    'sx_ip'           : 'noCheck' ,
    'has_rx'          : 'noCheck' ,
    'rx_ip'           : 'noCheck' ,
    'has_sd'          : 'noCheck' ,
    'auth_server_ip'  : 'noCheck' ,
    'clients_ip'      : 'noCheck'
  });


  /**
   * @override
   */
  _model.update = function ( view_data, cb_success, cb_fail, version ) {

    var
      update_data = this._checkWhatsUpdated( view_data )
    , errs = vl[version].validate( update_data )
    , context = this
    ;

    if ( errs && errs.length > 0 ) {
      cb_fail(errs);
      return;
    }

    // データの更新
    customer.db.post('/update', {
      data      : { information : JSON.stringify(view_data) },
      condition : {'base_id' : this['_cache'][0]['base_id']},
      table     : this['config']['table']
    })
    .then(function(){
      if ( _.keys(update_data).length > 0 ) {

        context._updateHistory( context._diffUpdated( update_data ) );

        // 再描画
        if ( typeof cb_success === 'function' ) {
          cb_success( context.fetch( context['_cache'][0]['kids_id']) );
        }

        // 履歴テーブルの再描画
        customer.model.userHistory.fetch( context['_cache'][0]['kids_id'],
          customer.view.userHistory.drawTable
        );

      }
    })
    .catch(function(r){
      cms.view.dialogAlert.open(r);
    });

  }

  // to public
  cms.model.userBusiv = {
    fetch    : $.proxy( _model.fetchAsync, _model ),
    getCache : $.proxy( _model.getCache, _model),
    update   : $.proxy( _model.update, _model )
  };

}( jQuery, customer ));