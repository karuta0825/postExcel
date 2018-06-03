
(function ($, cms) {
  let
    view,
    elements = {
      user: {
        btn: {
          update: '.user-info .btn--update',
        },
        input: {
          name: '.login-user-name input',
          pass1: '.login-user-pass .pass1',
          pass2: '.login-user-pass .pass2',
        },
      },
      authority: {
        self: '.authority',
        btn: {
          update: '.authority .btn--update',
          close: '.authority .btn--close',
        },
        dialog: '#modal-authority',
        users: '.authority .body',
        status: {
          admin: '[for="admin"]',
          normal: '[for="normal"]',
          'non-register': '[for="non-register"]',
        },
      },
      dialog: {
        error: '#input-error-login-user-info',
      },
    },
    _showUserError,
    _getUserInfo,
    _setUserInfo,
    _makeUsersList,
    _selectUser,
    _saveLogin,
    _updateAuth,
    initModule;

  _showUserError = function (list_keys) {
    _.each(view.get('user__input'), (v, k) => {
      v.removeClass('is-error');
    });

    _.each(list_keys, (v, k) => {
      view.get(`user__input__${v}`).addClass('is-error');
    });

    view.get('dialog__error').get(0).showModal();
  };

  _getUserInfo = function () {
    return {
      name: view.get('user__input__name').val(),
      pass1: view.get('user__input__pass1').val(),
      pass2: view.get('user__input__pass2').val(),
    };
  };

  _setUserInfo = function (data) {
    data = (_.isArray(data) ? data[0] : data);

    _.each(view.get('user__input'), (v, k) => {
      v.removeClass('is-error');
    });

    view.get('user__input__name').val(data.name);
    view.get('user__input__pass1').val('');
    view.get('user__input__pass2').val('');

    // ナビゲーションバーのユーザー名変更
    $('.login-user .name').text(`${data.name}さん`);
  };

  _saveLogin = function () {
    const input = _getUserInfo();

    cms.model.loginUser.update(
      input,
      _setUserInfo,
      _showUserError,
    );
  };

  _selectUser = function (e) {
    let
      id = $(e.target).closest('.item').attr('data-login-id'),
      user;
    if (!id) { return; }

    cms.model.loginUsers.setUser(id);

    user = cms.model.loginUsers.find({ id: Number(id) })[0];

    switch (user.status) {
      case '未登録':
        view.get('authority__status__non-register').get(0).click();
        break;
      case '一般':
        view.get('authority__status__normal').get(0).click();
        break;
      case '管理者':
        view.get('authority__status__admin').get(0).click();
        break;
      default:
        break;
    }

    view.get('authority__dialog').get(0).showModal();
  };

  _makeUsersList = function (datas) {
    let
      data = { list: datas },
      tmpl = customer.db.getHtml('template/login.list.html'),
      complied = _.template(tmpl);
    view.get('authority__users').empty();
    view.get('authority__users').append(complied(data));
  };

  _updateAuth = function () {
    const status = view.get('authority__dialog').find('.is-checked').attr('for');

    cms.model.loginUsers.update(status, (data) => {
      _makeUsersList(data);
      view.get('authority__dialog').get(0).close();
    });
  };

  initModule = function () {
    $('.main-contents--settings-login-info')
      .append(cms.db.getHtml('/html/setting.login.html'));

    view = new Controller('.login-info');

    util.alert({
      selector: view.top,
      id: 'input-error-login-user-info',
      msg: '入力に誤りがあります',
    });

    view.initElement(elements);

    cms.model.loginUser.fetch()
      .then((r) => {
        _setUserInfo(r);
        return r;
      })
      .then((r) => {
        if (r[0].is_admin === 1) {
          view.get('authority__self').removeClass('is-hidden');
          return cms.model.loginUsers.fetch();
        }
      })
      .then((r) => {
        _makeUsersList(r);
      });

    view.addListener({
      'click user__btn__update': _saveLogin,
      'click authority__users': _selectUser,
      'click authority__btn__close': function () { view.get('authority__dialog').get(0).close(); },
      'click authority__btn__update': _updateAuth,
    });
  };

  cms.view.login = {
    initModule,
    tmp() { return view; },
  };
}(jQuery, customer));
