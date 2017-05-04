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
      'th_checkbox' : 'th .mdl-checkbox',
      'td_checkbox' : 'td .mdl-checkbox',
      'checkbox' : '.mdl-checkbox',
    }
  , _checked
  , _unchecked
  , _selected
  , _unselected
  , setViewInfo
  , setChecked
  , makeServiceTable
  , cancel
  , save
  , edit
  , clear
  , initModule
  ;

  /**
   * [checked description]
   * @param  {Object} data - サービスIDごとの使用可否
   * @return {[type]}
   */
  _checked = function ( row_element ) {

    var checkbox = $(row_element).find('label');

    if ( !checkbox.hasClass('is-checked') ) {
      checkbox.trigger('click');
    }

  };

  _unchecked = function ( row_element ) {

    var checkbox = $(row_element).find('label');

    if ( checkbox.hasClass('is-checked') ) {
        checkbox.trigger('click');
    }

  };

  _selected = function ( el ) {
    $(el).removeClass('is-hidden');
  };

  _unselected = function ( el ) {
    $(el).addClass('is-hidden');
  };

  makeServiceTable = function ( data ) {

    var
      data     = { list : data }
    , tmpl     = customer.db.getHtml('template/user.service.html')
    , complied = _.template( tmpl )
    ;

    $('#usr-service-panel').append( complied(data) );

    componentHandler.upgradeElements(
      $('#usr-service-panel').find('table')
    );

  };

  cancel = function () {

    // テーブル初期化
    clear();

    // 登録ライセンスのみ表示
    setViewInfo( customer.model.services.getCache('licenses') );

  };

  save = function () {};

  edit = function () {

    // モデルから現在サービスにチェックをつける
    _setChecked( customer.model.services.getCache('licenses') );

    // チェックボックス表示
    licenseView.get('table').find('tr').removeClass('is-hidden');
    licenseView.get('checkbox').removeClass('is-hidden');

    // ボタン制御
    licenseView.get('btn__edit').addClass('is-hidden');
    licenseView.get('btn__cancel').removeClass('is-hidden');
    licenseView.get('btn__save').removeClass('is-hidden');

  };

  setViewInfo = function ( data ) {

    _.each( data, function ( val, key ) {

      if ( val === 0 ) {
        _unselected( licenseView.get('table').find('.' + key) );
      }

    });

  };

  _setChecked = function ( data ) {

    _.each( data, function ( val, key ) {

      if ( val === 1 ) {
        _checked( licenseView.get('table').find('.' + key) );
      }
      else {
        _unchecked( licenseView.get('table').find('.' + key) );
      }

    });

  };

  clear = function () {

    var data = customer.model.services.getCache('licenses');

    _.each( data, function ( val, key ) {
      // 再表示
      _selected( licenseView.get('table').find('.' + key));
      _unchecked( licenseView.get('table').find('.' + key));
    });

    // チェックボックスの非表示
    licenseView.get('checkbox').addClass('is-hidden');

    // ボタン制御
    licenseView.get('btn__edit').removeClass('is-hidden');
    licenseView.get('btn__cancel').addClass('is-hidden');
    licenseView.get('btn__save').addClass('is-hidden');

  };

  initModule = function () {

    makeServiceTable( customer.model.services.getCache('services') );

    licenseView = new Controller('#usr-service-panel');
    licenseView.initElement( elements );

    licenseView.addListener({
      'click btn__edit'   : edit,
      'click btn__cancel' : cancel
    });

    licenseView.get('checkbox').addClass('is-hidden');

  };

  // to public
  cms.view.userService = {
    initModule : initModule,
    makeServiceTable : makeServiceTable,
    clear : clear,
    setViewInfo : setViewInfo,
    get : function () { return licenseView; }
  }

}( jQuery, customer ))