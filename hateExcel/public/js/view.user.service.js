/**
 * 使用ライセンス情報
 */

( function ( $, cms ) {

  var
    licenseView
  , elements = {
      'btn' : {
        'edit'   : '.btn--edit',
        'cancel' : '.btn--cancel',
        'save'   : '.btn--save',
      },
      'table' : '.service-table',
      'checkbox' : '.mdl-checkbox'
    }
  , makeServiceTable
  , cancel
  , save
  , edit
  , reset
  , inputData
  , initModule
  ;

  makeServiceTable = function ( data ) {

    var
      data     = { list : data }
    , tmpl     = customer.db.getHtml('template/user.service.html')
    , complied = _.template( tmpl )
    ;

    $('#user-edit')
      .find('#usr-service-panel')
      .append( complied(data) );

  };

  cancel = function () {

    licenseView.get('table').find('tr').removeClass('is-selected');

    // チェックボックスの非表示
    licenseView.get('checkbox').parent('th').addClass('is-hidden');
    licenseView.get('checkbox').parent('td').addClass('is-hidden');

    // ボタン制御
    licenseView.get('btn__edit').removeClass('is-hidden');
    licenseView.get('btn__cancel').addClass('is-hidden');
    licenseView.get('btn__save').addClass('is-hidden');

  };

  save = function () {};

  edit = function () {

    // モデルから現在サービスにチェックをつける

    // チェックボックス表示
    licenseView.get('table').find('tr').removeClass('is-hidden');
    licenseView.get('checkbox').parent('th').removeClass('is-hidden');
    licenseView.get('checkbox').parent('td').removeClass('is-hidden');

    // ボタン制御
    licenseView.get('btn__edit').addClass('is-hidden');
    licenseView.get('btn__cancel').removeClass('is-hidden');
    licenseView.get('btn__save').removeClass('is-hidden');

  };

  reset = function () {};


  initModule = function () {

    // makeServiceTable( customer.model.services.getLicenses( { kid : 'KID77777' } ) );

    // licenseView = new Controller('#usr-service-panel');
    // licenseView.initElement( elements );

    //     // 初期状態ではチェックボックス非表示
    // $('.service-table .mdl-checkbox').parent('th').addClass('is-hidden');
    // $('.service-table .mdl-checkbox').parent('td').addClass('is-hidden');

    // licenseView.addListener({
    //   'click btn__edit' : edit,
    //   'click btn__cancel' : cancel
    // });

  };

  // to public
  cms.view.userService = {
    initModule : initModule,
    makeServiceTable : makeServiceTable,
    get : function () { return licenseView; }
  }

}( jQuery, customer ))