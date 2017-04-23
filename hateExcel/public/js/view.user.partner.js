/**
 * パートナー情報
 */

( function ( $, cms ) {

  var
    partnerView
  , elements = {
      'btnEdit'       : '.btn--edit',
      'btnCancel'     : '.btn--cancel',
      'btnSave'       : '.btn--save',
      'pid'           : '.pid',
      'company'       : '.company',
      'postal_cd'     : '.postal_cd',
      'address'       : '.address',
      'se_affliation' : '.se_affliation',
      'se_name'       : '.se_name',
      'se_tel'        : '.se_tel',
      'se_fax'        : '.se_fax',
      'se_email'      : '.se_email',
      'sa_affliation' : '.sa_affliation',
      'sa_name'       : '.sa_name',
      'sa_tel'        : '.sa_tel',
      'sa_fax'        : '.sa_fax',
      'sa_email'      : '.sa_email',
      'em_company'    : '.em_company',
      'em_name'       : '.em_name',
      'em_tel'        : '.em_tel',
      'em_email'      : '.em_email',
    }
  , cancel
  , save
  , edit
  , reset
  , inputData
  , initModule
  ;

  cancel = function () {};
  save = function () {};
  edit = function () {};
  reset = function () {};
  inputData = function () {};

  initModule = function () {
    $('#usr-partner-panel')
    .append( customer.db.getHtml('template/user.partner.html'));

    partnerView = new Controller('#usr-partner-panel');
    partnerView.initElement(elements);

  };

  // to public
  cms.view.userPartner = {
    initModule : initModule,
    get : function () { return partnerView; }
  }

}( jQuery, customer ))