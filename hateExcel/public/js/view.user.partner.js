/**
 * パートナー情報
 */

( function ( $, cms ) {

  var
    partnerView
  , elements = {
      'btn' : {
        'edit'       : '.btn--edit',
        'cancel'     : '.btn--cancel',
        'save'       : '.btn--save',
      },
      'input' : {
        'pid'           : '.pid',
        'name'          : '.name',
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
        'em_email'      : '.em_email'
      }
    }
  , cancel
  , save
  , edit
  , reset
  , setInfo
  , getViewInfo
  , clear
  , initModule
  ;

  cancel = function () {
    _.each( partnerView.get('input'), function (val, key){
      val.find('.item-value').removeClass('is-edit');
      val.find('.item-value').prop('disabled', true);
    });

    partnerView.get('btn__edit').removeClass('is-hidden');
    partnerView.get('btn__cancel').addClass('is-hidden');
    partnerView.get('btn__save').addClass('is-hidden');


  };

  save = function () {

    // update
    customer.model.userPartner.update( getViewInfo(), setInfo );

    // 編集不可
    _.each( partnerView.get('input'), function (val, key){
      val.find('.item-value').removeClass('is-edit');
      val.find('.item-value').prop('disabled', true);
    });

    // ボタン状態制御
    partnerView.get('btn__edit').removeClass('is-hidden');
    partnerView.get('btn__cancel').addClass('is-hidden');
    partnerView.get('btn__save').addClass('is-hidden');


  };

  edit = function () {
    _.each( partnerView.get('input'), function (val, key){
      val.find('.item-value').addClass('is-edit');
      val.find('.item-value').prop('disabled', false);
    });

    partnerView.get('btn__edit').addClass('is-hidden');
    partnerView.get('btn__cancel').removeClass('is-hidden');
    partnerView.get('btn__save').removeClass('is-hidden');

  };

  reset = function () {
    customer.model.userPartner.getCache( setInfo );
  };

  setInfo = function ( data ) {

    partnerView.get('input__pid'          ).find('.item-value').val( data[0].pid  );
    partnerView.get('input__name'         ).find('.item-value').val( data[0].name );
    partnerView.get('input__postal_cd'    ).find('.item-value').val( data[0].postal_cd);
    partnerView.get('input__address'      ).find('.item-value').val( data[0].address);
    partnerView.get('input__se_affliation').find('.item-value').val( data[0].se_affliation);
    partnerView.get('input__se_name'      ).find('.item-value').val( data[0].se_name );
    partnerView.get('input__se_tel'       ).find('.item-value').val( data[0].se_tel );
    partnerView.get('input__se_fax'       ).find('.item-value').val( data[0].se_fax);
    partnerView.get('input__se_email'     ).find('.item-value').val( data[0].se_email);
    partnerView.get('input__sa_affliation').find('.item-value').val( data[0].sa_affliation);
    partnerView.get('input__sa_name'      ).find('.item-value').val( data[0].sa_name );
    partnerView.get('input__sa_tel'       ).find('.item-value').val( data[0].sa_tel );
    partnerView.get('input__sa_fax'       ).find('.item-value').val( data[0].sa_fax );
    partnerView.get('input__sa_email'     ).find('.item-value').val( data[0].sa_email );
    partnerView.get('input__em_company'   ).find('.item-value').val( data[0].em_company );
    partnerView.get('input__em_name'      ).find('.item-value').val( data[0].em_name );
    partnerView.get('input__em_tel'       ).find('.item-value').val( data[0].em_tel );
    partnerView.get('input__em_email'     ).find('.item-value').val( data[0].em_email) ;

  };

  getViewInfo = function () {
    return {
      'pid'           : Number(partnerView.get('input__pid'       ).find('.item-value').val()),
      'name'          : partnerView.get('input__name'             ).find('.item-value').val(),
      'postal_cd'     : Number(partnerView.get('input__postal_cd' ).find('.item-value').val()),
      'address'       : partnerView.get('input__address'          ).find('.item-value').val(),
      'se_affliation' : partnerView.get('input__se_affliation'    ).find('.item-value').val(),
      'se_name'       : partnerView.get('input__se_name'          ).find('.item-value').val(),
      'se_tel'        : partnerView.get('input__se_tel'           ).find('.item-value').val(),
      'se_fax'        : partnerView.get('input__se_fax'           ).find('.item-value').val(),
      'se_email'      : partnerView.get('input__se_email'         ).find('.item-value').val(),
      'sa_affliation' : partnerView.get('input__sa_affliation'    ).find('.item-value').val(),
      'sa_name'       : partnerView.get('input__sa_name'          ).find('.item-value').val(),
      'sa_tel'        : partnerView.get('input__sa_tel'           ).find('.item-value').val(),
      'sa_fax'        : partnerView.get('input__sa_fax'           ).find('.item-value').val(),
      'sa_email'      : partnerView.get('input__sa_email'         ).find('.item-value').val(),
      'em_company'    : partnerView.get('input__em_company'       ).find('.item-value').val(),
      'em_name'       : partnerView.get('input__em_name'          ).find('.item-value').val(),
      'em_tel'        : partnerView.get('input__em_tel'           ).find('.item-value').val(),
      'em_email'      : partnerView.get('input__em_email'         ).find('.item-value').val()
    }
  };

  clear = function () {
    setInfo([{
      'pid'           : '',
      'name'          : '',
      'postal_cd'     : '',
      'address'       : '',
      'se_affliation' : '',
      'se_name'       : '',
      'se_tel'        : '',
      'se_fax'        : '',
      'se_email'      : '',
      'sa_affliation' : '',
      'sa_name'       : '',
      'sa_tel'        : '',
      'sa_fax'        : '',
      'sa_email'      : '',
      'em_company'    : '',
      'em_name'       : '',
      'em_tel'        : '',
      'em_email'      : ''
    }])
  };

  initModule = function () {
    // View挿入
    $('#usr-partner-panel')
    .append( customer.db.getHtml('template/user.partner.html'));

    // View管理定義
    partnerView = new Controller('#usr-partner-panel');
    partnerView.initElement( elements );

    // Event定義
    partnerView.addListener({
      'click btn__edit'   : edit,
      'click btn__cancel' : cancel,
      'click btn__save'   : save
    });

  };

  // to public
  cms.view.userPartner = {
    initModule  : initModule,
    setInfo     : setInfo,
    clear       : clear,
    getViewInfo : getViewInfo,
    get : function () { return partnerView; }
  }

}( jQuery, customer ))