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
      'table' : {
        'es' : '.es-service-table',
        'lm' : '.lm-service-table'
      },
      'select_table' : '',
      'th_checkbox' : 'th .mdl-checkbox',
      'td_checkbox' : 'td .mdl-checkbox',
      'checkbox' : '.mdl-checkbox'
    }
  , _checked
  , _unchecked
  , _selected
  , _unselected
  , _selectVersion
  , setViewInfo
  , setChecked
  , makeServiceTable
  , getViewInfo
  , cancel
  , save
  , edit
  , clear
  , reset
  , initModule
  ;

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

  _setChecked = function ( data ) {

    var data = _.extend( {}, data[0]);

    delete data.kid;

    _.each( data, function ( val, key ) {

      if ( val === 1 ) {
        _checked( licenseView.get('select-table').find('.' + key) );
      }
      else {
        _unchecked( licenseView.get('select-table').find('.' + key) );
      }

    });

  };

  _selectVersion = function ( version ) {
    if ( version === 'LM') {
      licenseView.get('table__es').addClass('is-hidden');
    }
    else {
      licenseView.get('table__lm').addClass('is-hidden');
    }
  };

  makeServiceTable = function ( data, version ) {

    var data, tmpl, complied;

    data     = { list : data };

    if ( version === 'lm' ) {
      tmpl   = customer.db.getHtml('template/user.service.lm.html');
    }
    else {
      tmpl   = customer.db.getHtml('template/user.service.es.html');
    }

    complied = _.template( tmpl );

    $('#usr-service-panel').append( complied(data) );

    componentHandler.upgradeElements(
      $('#usr-service-panel').find('table')
    );

  };


  /**
   * 画面からチェックの付いたサービスを取得
   * @return {Object} result - 画面のチェックが付いたサービス一覧
   */
  getViewInfo = function () {

    var
      result = {}
    , obj = licenseView.get('select-table').find('tbody').find('tr')
    ;

    _.each( obj, function ( val, key ) {

      if ( $(val).hasClass('is-selected') ) {
        result[ $(val).attr('class').split(' ')[0] ] = 1;
      }
      else {
        result[ $(val).attr('class').split(' ')[0] ] = 0;
      }

    });

    return result;

  };

  cancel = function () {

    // テーブル初期化
    clear();

    // 登録ライセンスのみ表示
    setViewInfo( customer.model.userLicense.getCache() );

  };

  save = function () {

    customer.model.userLicense.update( getViewInfo(), setViewInfo );

    cancel();

  };

  edit = function () {

    // モデルから現在サービスにチェックをつける
    _setChecked( customer.model.userLicense.getCache() );

    // チェックボックス表示
    licenseView.get('table__lm').find('tr').removeClass('is-hidden');
    licenseView.get('table__es').find('tr').removeClass('is-hidden');
    licenseView.get('checkbox').removeClass('is-hidden');

    // ボタン制御
    licenseView.get('btn__edit').addClass('is-hidden');
    licenseView.get('btn__cancel').removeClass('is-hidden');
    licenseView.get('btn__save').removeClass('is-hidden');

  };

  /**
   * [setViewInfo description]
   * @param {[type]} data
   * TODO: 引数をObjectにする　CollectionとModelを切り分けるとできる
   */
  setViewInfo = function ( data ) {

    var
      clone = _.extend( {}, data[0] )
    , version = cms.model.userBaseInfo.getCache().version
    ;

    if ( version === 'LM' ) {
      licenseView.updateElement({ 'select-table' : '.lm-service-table' } );
    }
    else {
      licenseView.updateElement({ 'select-table' : '.es-service-table' } );
    }

    delete clone.kid;

    // 表示テーブルの選択
    _selectVersion( version );

    // 利用サービスのみ表示
    _.each( clone, function ( val, key ) {

      if ( val === 0 ) {
        _unselected( licenseView.get('select-table').find('.' + key) );
      }

    });

  };

  clear = function () {

    var data = customer.model.userLicense.getCache();

    // LMES両方テーブル表示
    licenseView.get('table__es').removeClass('is-hidden');
    licenseView.get('table__lm').removeClass('is-hidden');

    _.each( data[0], function ( val, key ) {
      // 再表示
      _selected( licenseView.get('select-table').find('.' + key));
      _unchecked( licenseView.get('select-table').find('.' + key));
    });

    // チェックボックスの非表示
    licenseView.get('checkbox').addClass('is-hidden');

    // ボタン制御
    licenseView.get('btn__edit').removeClass('is-hidden');
    licenseView.get('btn__cancel').addClass('is-hidden');
    licenseView.get('btn__save').addClass('is-hidden');

  };

  initModule = function () {

    // テーブル生成
    makeServiceTable( cms.model.services.find({ 'version' : 'LM', 'is_setup_info' : 0 }), 'lm' );
    makeServiceTable( cms.model.services.find({ 'version' : 'ES', 'is_setup_info' : 0 }), 'es' );

    licenseView = new Controller('#usr-service-panel');
    licenseView.initElement( elements );

    licenseView.addListener({
      'click btn__edit'   : edit,
      'click btn__cancel' : cancel,
      'click btn__save'   : save
    });

    licenseView.get('checkbox').addClass('is-hidden');

  };

  // to public
  cms.view.userService = {
    initModule : initModule,
    makeServiceTable : makeServiceTable,
    clear : clear,
    setViewInfo : setViewInfo,
    getViewInfo : getViewInfo,
    get : function () { return licenseView; }
  }

}( jQuery, customer ))