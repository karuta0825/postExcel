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
        'open_date'              : '',
        'w_network'              : '',
        'w_subnet'               : '',
        'w_router'               : '',
        'has_sx'                 : '',
        'how_to_cooperate'       : '',
        'has_L3'                 : '',
        'sx_ip'                  : '',
        'has_carte'              : '',
        'carte_system'           : '',
        'carte_html_save_ip'     : '',
        'has_cc'                 : '',
        'cc_ip'                  : '',
        'download_server_ip'     : '',
        'auth_server_ip'         : '',
      }
    }
  , vl = new util.Validate({
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
    })
  , _model = new Model( config )
  , validate
  ;

  validate = function ( data ) {

    var
      diff = _model._checkWhatsUpdated(data)
    , result = vl.validate(diff)
    ;
    return result;

  };

  /**
   * @override
   */
  _model.update = function ( view_data, callback ) {

    var update_data = this._checkWhatsUpdated( view_data );

    // updateする対象が存在する場合
    if ( _.keys(update_data).length > 0 ) {

      // データの更新
      customer.db.update('/update', {
        data      : update_data,
        condition : {'base_id' : this['_cache'][0]['base_id']},
        table     : this['config']['table']
      });

      // 履歴の更新
      this._updateHistory( this._diffUpdated( update_data ) );

      // 再描画
      if ( typeof callback === 'function' ) {
        callback( this.fetch( this['_cache'][0]['kids_id']) );
      }

      // 履歴テーブルの再描画
      customer.model.userHistory.fetch( this['_cache'][0]['kids_id'],
        customer.view.userHistory.drawTable
      );

    }

  }

  // to public
  cms.model.userBusiv = {
    fetch    : $.proxy( _model.fetchAsync, _model ),
    getCache : $.proxy( _model.getCache, _model),
    update   : $.proxy( _model.update, _model ),
    check    : validate
  };

}( jQuery, customer ));