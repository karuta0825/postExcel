/**
 * 使用ライセンス情報
 */

( function ( $, cms ) {

  var
    licenseView
  , elements = {
      'btn' : {
        'edit'       : '.btn--edit',
        'cancel'     : '.btn--cancel',
        'save'       : '.btn--save',
      },
      'input' : {
      }
    }
  , drawServices
  , cancel
  , save
  , edit
  , reset
  , inputData
  , initModule
  ;

  drawServices = function () {

  };

  cancel = function () {
    _.each( licenseView.get('input'), function (val, key){
      val.find('.item-value').removeClass('is-edit');
      val.find('.item-value').prop('disabled', true);
    });

    licenseView.get('btn__edit').removeClass('is-hidden');
    licenseView.get('btn__cancel').addClass('is-hidden');
    licenseView.get('btn__save').addClass('is-hidden');

    // モデルのデータを挿入

  };

  save = function () {};

  edit = function () {
    _.each( licenseView.get('input'), function (val, key){
      val.find('.item-value').addClass('is-edit');
      val.find('.item-value').prop('disabled', false);
    });

    licenseView.get('btn__edit').addClass('is-hidden');
    licenseView.get('btn__cancel').removeClass('is-hidden');
    licenseView.get('btn__save').removeClass('is-hidden');

  };

  reset = function () {};


  initModule = function () {
    // View挿入
    $('#usr-partner-panel')
    .append( customer.db.getHtml('template/user.partner.html'));

    // View管理定義
    licenseView = new Controller('#usr-partner-panel');
    licenseView.initElement( elements );

    // Event定義
    licenseView.addListener({
      'click btn__edit' : edit,
      'click btn__cancel' : cancel
    });

  };

  // to public
  cms.view.userPartner = {
    initModule : initModule,
    get : function () { return licenseView; }
  }

}( jQuery, customer ))