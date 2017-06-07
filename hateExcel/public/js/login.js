$(function () {


  var
  // member
    loginView
  , elements = {
      'header' : '.login__header',
      'body'   : '.login__body',
      'register' : '.make-account',
      'btn' : {
        'make_account' : '.btn--make-login-account'
      }
    }
  // public
  , initModule
  , _goMakeAccount
  ;

  _goMakeAccount = function () {
    loginView.get('register').removeClass('is-hidden');
    loginView.get('body').addClass('is-hidden');
  };

  initModule = function () {

    loginView = new Controller('.login')
    loginView.initElement(elements);

    loginView.addListener({
      'click btn__make_account' : _goMakeAccount
    });

  };

  initModule();

});