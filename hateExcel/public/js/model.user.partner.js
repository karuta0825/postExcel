/**
 *
 */

(function ( $, cms ) {

  var
  config = {
    table         : 'partners',
    tab_name      : 'パートナー',
    item_name_map : {
      'pid'           : 'PID',
      'name'          : '販社名',
      'postal_cd'     : '郵便番号',
      'address'       : '住所',
      'se_affliation' : 'SE所属',
      'se_name'       : 'SE担当者',
      'se_tel'        : 'SE電話番号',
      'se_fax'        : 'SE_FAX',
      'se_email'      : 'SE_Email',
      'sa_affliation' : 'SA所属',
      'sa_name'       : 'SA担当者',
      'sa_tel'        : 'SA電話番号',
      'sa_fax'        : 'SA_FAX',
      'sa_email'      : 'SA_Email',
      'em_company'    : '緊急連絡先社名',
      'em_name'       : '担当者',
      'em_tel'        : '緊急電話番号',
      'em_email'      : '緊急Email'
    }
  }
  , _model = new Model( config )
  ;

  // to public
  cms.model.userPartner = {
    fetch     : function( kid, callback ) { _model.fetch( kid, callback ) },
    getCache  : function() { return _model.getCache()[0] },
    update    : $.proxy( _model.update, _model),
    check     : $.proxy( _model._checkWhatsUpdated, _model )
  };


}( jQuery, customer ));

