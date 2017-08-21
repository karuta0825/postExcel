
(function ( $, cms ) {

  var
    view
  , elements = {
      'user' : {
        'btn' : {
          'update' : '.user-info .btn--update'
        },
        'input' : {
          'name'  : '.login-user-name input',
          'pass1' : '.login-user-pass .pass1',
          'pass2' : '.login-user-pass .pass2'
        }
      },
      'authority' : {
        'btn' : {
          'update' : '.authority .btn--update',
          'close'  : '.authority .btn--close'
        },
        'dialog' : '#modal-authority',
        'users'  : '.authority .body'
      },
      'dialog' : {
        'error' : '#input-error-login-user-info'
      }
    }
  , _showError
  , _saveLogin
  , _updateAuth
  , _setUserInfo
  , _makeUsersList
  , _selectUser
  , initModule
  ;

  _showUserError = function ( list_keys ) {

    _.each( view.get('user__input'), function (v,k) {
      v.removeClass('is-error');
    });

    _.each( list_keys, function (v,k) {
      view.get('user__input__' + v).addClass('is-error');
    });

    view.get('dialog__error').get(0).showModal();

  };

  _getUserInfo = function () {
    return {
      name  : view.get('user__input__name').val(),
      pass1 : view.get('user__input__pass1').val(),
      pass2 : view.get('user__input__pass2').val()
    };
  }

  _setUserInfo = function (data) {

    data = ( _.isArray(data) ? data[0] : data );

    _.each( view.get('user__input'), function (v,k) {
      v.removeClass('is-error');
    });

    view.get('user__input__name').val( data.name );
    view.get('user__input__pass1').val('');
    view.get('user__input__pass2').val('');

  };

  _saveLogin = function () {

    var input = _getUserInfo();

    cms.model.loginUser.update(
      input,
      _setUserInfo,
      _showUserError
    );

  };

  _selectUser = function ( e ) {

    var user = $(e.target).parents('.item');
    view.get('authority__dialog').get(0).showModal();

  };

  initModule = function () {

    $('.main-contents--settings-login-info')
    .append( cms.db.getHtml('/html/setting.login.html') );

    view = new Controller('.login-info');

    util.alert({
      selector : view.top,
      id       : 'input-error-login-user-info',
      msg      : '入力に誤りがあります'
    });

    view.initElement(elements);

    cms.model.loginUser.fetch()
    .then( function (r) {
      _setUserInfo(r);
    })

    view.addListener({
      'click user__btn__update' : _saveLogin,
      'click authority__users'  : _selectUser,
      'click authority__btn__close' : function () { view.get('authority__dialog').get(0).close(); }
    });

  };

  cms.view.login = {
    initModule : initModule,
    tmp : function () { return view;}
  };

}( jQuery, customer ));