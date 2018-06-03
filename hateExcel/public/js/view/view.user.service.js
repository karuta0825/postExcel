/**
 * 使用ライセンス情報
 */

(function ($, cms) {
  let
    licenseView,
    elements = {
      btn: {
        edit: '.btn--edit',
        cancel: '.btn--cancel',
        save: '.btn--save',
        oneline: '.btn--oneline-edit',
      },
      table: {
        es: '.es-service-table',
        lm: '.lm-service-table',
      },
      select_table: '',
      th_checkbox: 'th .mdl-checkbox',
      td_checkbox: 'td .mdl-checkbox',
      checkbox: '.mdl-checkbox',
      dialog: {
        btn: {
          save: '.btn--dialog-save',
          cancel: '.btn--dialog-cancel',
        },
        input: '#oneline-edit-license .oneline-input',
        oneline: '#oneline-edit-license',
      },
    },
    _checked,
    _unchecked,
    _selected,
    _unselected,
    _selectVersion,
    _getUpdateObj,
    _cancelOnelineInput,
    _editOnelineInput,
    setViewInfo,
    setChecked,
    makeServiceTable,
    getViewInfo,
    cancel,
    save,
    onelineSave,
    edit,
    clear,
    reset,
    initModule;

  _checked = function (row_element) {
    const checkbox = $(row_element).find('label');

    if (!checkbox.hasClass('is-checked')) {
      checkbox.trigger('click');
    }
  };

  _unchecked = function (row_element) {
    const checkbox = $(row_element).find('label');

    if (checkbox.hasClass('is-checked')) {
      checkbox.trigger('click');
    }
  };

  _selected = function (el) {
    $(el).removeClass('is-hidden');
  };

  _unselected = function (el) {
    $(el).addClass('is-hidden');
  };

  _setChecked = function (data) {
    var data = _.extend({}, data[0]);

    delete data.kid;

    _.each(data, (val, key) => {
      if (val === 1) {
        _checked(licenseView.get('select-table').find(`.${key}`));
      } else {
        _unchecked(licenseView.get('select-table').find(`.${key}`));
      }
    });
  };

  _selectVersion = function (version) {
    if (version === 'LM') {
      licenseView.get('table__es').addClass('is-hidden');
    } else {
      licenseView.get('table__lm').addClass('is-hidden');
    }
  };

  _getUpdateObj = function () {
    let
      result = {},
      obj = licenseView.get('select-table').find('tbody').find('tr');
    _.each(obj, (val, key) => {
      result[$(val).attr('class').split(' ')[0]] = 0;
    });

    return result;
  };

  _cancelOnelineInput = function () {
    const license = cms.model.userBaseInfo.getCache().license;
    licenseView.get('dialog__input').val(license);
    licenseView.get('dialog__oneline').get(0).close();
  };

  _editOnelineInput = function () {
    cancel();
    licenseView.get('dialog__oneline').get(0).showModal();
  };

  makeServiceTable = function (data, version) {
    var data,
      tmpl,
      complied;

    data = { list: data };

    if (version === 'lm') {
      tmpl = customer.db.getHtml('template/user.service.lm.html');
    } else {
      tmpl = customer.db.getHtml('template/user.service.es.html');
    }

    complied = _.template(tmpl);

    $('#usr-service-panel').append(complied(data));

    componentHandler.upgradeElements($('#usr-service-panel').find('table'));
  };


  /**
   * 画面からチェックの付いたサービスを取得
   * @return {Object} result - 画面のチェックが付いたサービス一覧
   */
  getViewInfo = function () {
    let
      result = {},
      obj = licenseView.get('select-table').find('tbody').find('tr');
    _.each(obj, (val, key) => {
      if ($(val).hasClass('is-selected')) {
        result[$(val).attr('class').split(' ')[0]] = 1;
      } else {
        result[$(val).attr('class').split(' ')[0]] = 0;
      }
    });

    return result;
  };

  cancel = function () {
    // テーブル初期化
    clear();

    // 登録ライセンスのみ表示
    setViewInfo(customer.model.userLicense.getCache());
  };

  save = function () {
    customer.model.userLicense.update(getViewInfo(), setViewInfo);

    cancel();
  };

  onelineSave = function () {
    let
      obj = _getUpdateObj(),
      input = licenseView.get('dialog__input').val(),
      length = input.length,
      i;
    for (i = 0; i < length; i += 2) {
      if (obj.hasOwnProperty(input.substr(i, 2))) {
        obj[input.substr(i, 2)] = 1;
      }
    }

    // 入力チェックが必要
    // 存在しないkeyがあるかもしれないから

    cms.model.userLicense.update(obj, setViewInfo);

    licenseView.get('dialog__oneline').get(0).close();
  };

  edit = function () {
    // モデルから現在サービスにチェックをつける
    _setChecked(customer.model.userLicense.getCache());

    // チェックボックス表示
    licenseView.get('table__lm').find('tr').removeClass('is-hidden');
    licenseView.get('table__es').find('tr').removeClass('is-hidden');
    licenseView.get('checkbox').removeClass('is-hidden');

    // ボタン制御
    licenseView.get('btn__edit').addClass('is-hidden');
    licenseView.get('btn__cancel').removeClass('is-hidden');
    licenseView.get('btn__save').removeClass('is-hidden');
    // テキスト入力ボタン
    licenseView.get('btn__oneline').addClass('is-hidden');
  };

  /**
   * [setViewInfo description]
   * @param {[type]} data
   * TODO: 引数をObjectにする　CollectionとModelを切り分けるとできる
   */
  setViewInfo = function (data) {
    let
      clone = _.extend({}, data[0]),
      version = cms.model.userBaseInfo.getCache().version,
      oneline = '';
    if (version === 'LM') {
      licenseView.updateElement({ 'select-table': '.lm-service-table' });
    } else {
      licenseView.updateElement({ 'select-table': '.es-service-table' });
    }

    delete clone.kid;

    // 表示テーブルの選択
    _selectVersion(version);

    // 利用サービスのみ表示
    _.each(clone, (val, key) => {
      if (val === 0) {
        _unselected(licenseView.get('select-table').find(`.${key}`));
      }

      if (val === 1) {
        _selected(licenseView.get('select-table').find(`.${key}`));
        oneline += key;
      }
    });

    // テキスト入力画面の設定
    licenseView.get('dialog__input').val(oneline);
  };

  clear = function () {
    const data = customer.model.userLicense.getCache();

    // LMES両方テーブル表示
    licenseView.get('table__es').removeClass('is-hidden');
    licenseView.get('table__lm').removeClass('is-hidden');

    _.each(data[0], (val, key) => {
      // 再表示
      _selected(licenseView.get('select-table').find(`.${key}`));
      _unchecked(licenseView.get('select-table').find(`.${key}`));
    });

    // チェックボックスの非表示
    licenseView.get('checkbox').addClass('is-hidden');

    // ボタン制御
    licenseView.get('btn__edit').removeClass('is-hidden');
    licenseView.get('btn__cancel').addClass('is-hidden');
    licenseView.get('btn__save').addClass('is-hidden');
    licenseView.get('btn__oneline').removeClass('is-hidden');
  };

  initModule = function () {
    // テーブル生成
    makeServiceTable(cms.model.services.find({ version: 'LM', is_setup_info: 0 }), 'lm');
    makeServiceTable(cms.model.services.find({ version: 'ES', is_setup_info: 0 }), 'es');

    licenseView = new Controller('#usr-service-panel');
    licenseView.initElement(elements);

    licenseView.addListener({
      'click btn__edit': edit,
      'click btn__cancel': cancel,
      'click btn__save': save,
      'click btn__oneline': _editOnelineInput,
      'click dialog__btn__cancel': _cancelOnelineInput,
      'click dialog__btn__save': onelineSave,
    });

    licenseView.get('checkbox').addClass('is-hidden');
  };

  // to public
  cms.view.userService = {
    initModule,
    makeServiceTable,
    clear,
    setViewInfo,
    getViewInfo,
    get() { return licenseView; },
  };
}(jQuery, customer));
