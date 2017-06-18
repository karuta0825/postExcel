/**
 *
 */

(function ( $, cms ) {

  var
  config = {
    table         : 'partners',
    tab_name      : 'パートナー',
    item_name_map : {
      'sa_pid'        : 'PID',
      'sa_company'    : '販社名',
      'sa_postal_cd'  : '郵便番号',
      'sa_address'    : '住所',
      'sa_affliation' : 'SA所属',
      'sa_kana'       : 'SAフリガナ',
      'sa_name'       : 'SA担当者',
      'sa_tel'        : 'SA電話番号',
      'sa_fax'        : 'SA_FAX',
      'sa_email'      : 'SA_Email',
      'se_pid'        : 'PID',
      'se_company'    : '販社名',
      'se_postal_cd'  : '郵便番号',
      'se_address'    : '住所',
      'se_affliation' : 'SE所属',
      'se_kana'       : 'SEフリガナ',
      'se_name'       : 'SE担当者',
      'se_tel'        : 'SE電話番号',
      'se_fax'        : 'SE_FAX',
      'se_email'      : 'SE_Email',
      'em_company'    : '緊急連絡先社名',
      'em_name'       : '担当者',
      'em_tel'        : '緊急電話番号',
      'em_email'      : '緊急Email'
    }
  }
  , vl = new util.Validate({
      'sa_pid'        : 'isId',
      'sa_postal_cd'  : 'isTEL',
      'sa_tel'        : 'isTEL',
      'sa_fax'        : 'isTEL',
      'sa_email'      : 'isMailAddress',
      'se_pid'        : 'isId',
      'se_postal_cd'  : 'isTEL',
      'se_tel'        : 'isTEL',
      'se_fax'        : 'isTEL',
      'se_email'      : 'isMailAddress',
      'em_tel'        : 'isTEL',
      'em_email'      : 'isMailAddress'
    })
  , _model = new Model( config )
  , validate
  ;

  validate = function ( data ) {
    var
      diff   = _model._checkWhatsUpdated(data)
    , result = vl.validate( diff )
    ;
    return result;
  };

  // to public
  cms.model.userPartner = {
    fetch     : $.proxy( _model.fetch, _model ),
    getCache  : $.proxy( _model.getCache, _model ),
    update    : $.proxy( _model.update, _model),
    check     : validate,
    register  : $.proxy( _model.initUpdate, _model ),
  };


}( jQuery, customer ));

