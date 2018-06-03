
(function ($, cms) {
  let
  // member
    list,
    view,
    elements = {
      btn: {
        create: '.btn--create',
        save: '.btn--save',
        delete: '.btn--delete',
        update: '.btn--update',
      },
      list: {
        header: '.memo-template__list .header',
        body: '.memo-template__list .body',
      },
      content: {
        input: {
          title: '.memo-template__content .header__title input',
          msg: '.memo-template__content .input-area',
        },
        'available-number': '.memo-template__content .number',
      },
      dialog: {
        'input-error': '#input-error-memo-template',
        'delete-memo-template': '#delete-memo-template',
      },
    },
    // private method
    _showError,
    _goNewMode,
    _goEditMode,
    _setTemplate,
    _getViewInfo,
    _makeList,
    _selectItem,
    _showAvaliableChars,
    _clear,
    // event method
    _create,
    _save,
    _delete,
    _update,
    // public method
    refresh,
    initModule;

  _showError = function (list_key) {
    // 既存のエラーを消す
    _.each(view.get('content__input'), (val, key) => {
      $(val).removeClass('is-error');
    });

    _.each(list_key, (val, key) => {
      view.get(`content__input__${val}`).addClass('is-error');
    });

    if (list_key.length > 0) {
      view.get('dialog__input-error').get(0).showModal();
    }
  };

  _goNewMode = function () {
    view.get('btn__delete').addClass('is-hidden');
    view.get('btn__update').addClass('is-hidden');
    view.get('btn__save').removeClass('is-hidden');
    _clear();
  };

  _goEditMode = function () {
    view.get('btn__delete').removeClass('is-hidden');
    view.get('btn__update').removeClass('is-hidden');
    view.get('btn__save').addClass('is-hidden');
  };

  /**
   * テンプレート詳細画面に選択されたテンプレート内容を表示
   * @param {Array} data
   * @param {String} data[0].title - タイトル
   * @param {String} data[0].msg   - 内容
   */
  _setTemplate = function (data) {
    data = (_.isArray(data)) ? data[0] : data;

    view.get('content__input__title').val(data.title);
    view.get('content__input__msg').val(data.msg);

    _showAvaliableChars();
  };

  /**
   * テンプレート詳細画面から入力された内容を表示する
   * @return {Object}
   */
  _getViewInfo = function () {
    return {
      title: view.get('content__input__title').val(),
      msg: view.get('content__input__msg').val(),
    };
  };

  /**
   * テンプレート一覧情報を作成
   * @param  {Array} datas
   */
  _makeList = function (datas) {
    let
      data = { list: datas },
      tmpl = customer.db.getHtml('template/memo-template.html'),
      complied = _.template(tmpl);
    view.get('list__body').empty();
    view.get('list__body').append(complied(data));
  };

  /**
   * テンプレート選択したときに詳細情報を表示する
   * @param  {Event} e
   */
  _selectItem = function (e) {
    let
      item = $(e.target).parents('.item'),
      id = item.attr('data-memo-template-id');
    if (!id) { return; }

    // 既存のエラーを消す
    _.each(view.get('content__input'), (val, key) => {
      $(val).removeClass('is-error');
    });

    view.get('list__body').find('.item').removeClass('is-selected');
    item.addClass('is-selected');

    cms.model.memoTemplate.find({ id: Number(id) }, _setTemplate);

    _goEditMode();
  };

  _showAvaliableChars = function () {
    const length = view.get('content__input__msg').val().length;

    view.get('content__available-number').text(500 - length);
  };

  /**
   * テンプレート詳細画面の初期化
   */
  _clear = function () {
    // 既存のエラーを消す
    _.each(view.get('content__input'), (val, key) => {
      $(val).removeClass('is-error');
    });

    view.get('list__body').find('.item').removeClass('is-selected');

    view.get('content__input__title').val('');
    view.get('content__input__msg').val('');
    view.get('content__available-number').text('500');
  };

  _save = function () {
    cms.model.memoTemplate.insert(
      _getViewInfo(),
      () => {
        refresh();
        _goNewMode();
      },
      _showError,
    );
  };

  _delete = function () {
    cms.model.memoTemplate.remove((datas) => {
      _makeList(datas);
      _setTemplate(datas[0]);
    });
  };

  _update = function () {
    cms.model.memoTemplate.update(
      _getViewInfo(),
      refresh,
      _showError,
    );
  };

  refresh = function () {
    cms.model.memoTemplate.fetch()
      .then((r) => {
        _makeList(r);

        if (r.length === 0) {
          _setTemplate({ title: '', msg: '' });
          _goNewMode();
        }
      });
  };

  initModule = function () {
    $('.main-contents--settings-memo-template')
      .append(cms.db.getHtml('/html/settings.template.html'));

    view = new Controller('.memo-template');

    util.alert({
      selector: view.top,
      id: 'input-error-memo-template',
      msg: '入力に誤りがあります',
    });

    util.confirm({
      selector: view.top,
      id: 'delete-memo-template',
      msg: '選択したテンプレートを削除しますか？',
      yes: _delete,
    });

    view.initElement(elements);

    cms.model.memoTemplate.fetch()
      .then((r) => {
      // データが存在するならばはじめのデータを初期表示にする
        if (r.length > 0) {
          _setTemplate(r[0]);
          _goEditMode();
          cms.model.memoTemplate.setSelectedItem(r[0].id);
        }

        _makeList(r);
      });

    view.addListener({
      'click btn__create': _goNewMode,
      'click btn__save': _save,
      'click btn__update': _update,
      'click btn__delete': function () { view.get('dialog__delete-memo-template').get(0).showModal(); },
      'click list__body': _selectItem,
      'keyup content__input__msg': _showAvaliableChars,
    });
  };

  cms.view.memoTemplate = {
    initModule,
    refresh,
  };
}(jQuery, customer));
