/**
 * ユーザー作成
 */


( function ( $, cms ) {


  var
    makeUserView
  , elements = {
      btn : {
        'ok'     : '.btn--ok',
        'cancel' : '.btn--cancel',
        'exec'   : '.btn--exec',
        'close'  : '.btn--close'
      },
      select : {
        system  : '.select-system',
        version : '.select-version',
        server  : '.select-server'
      },
      'server-title' : '.select-name.server',
      'dialog' : {
        confirm  : '#make-usr-confirm',
        complete : '#complete-make-user',
        kid      : '#complete-make-user .kid'
      },
    }
  , _openDialog
  , _openCompleteDialog
  , _closeComplteDialog
  , _setInfoDialog
  , _makeSelectServer
  , _selectSystem
  , _makeUser
  , initModule
  ;

  _openConfirm = function () {
    makeUserView.get('dialog__confirm').get(0).showModal();
  };

  _openCompleteDialog = function ( data ) {

    // 画面更新
    cms.view.home.refresh();
    cms.view.kids.refresh();

    _setInfoDialog(data);

    makeUserView.get('dialog__complete').get(0).showModal();

  };

  _closeComplteDialog = function () {
    makeUserView.get('dialog__complete').get(0).close();
  };

  _setInfoDialog = function ( data ) {
    makeUserView.get('dialog__kid').text( data.kid );
  };

  _selectSystem = function () {
     if ( $(this).val() ===  'onpre' ) {
      makeUserView.get('select__server').addClass('is-hidden');
      makeUserView.get('server-title').addClass('is-hidden');
     }
     else {
      makeUserView.get('select__server').removeClass('is-hidden');
      makeUserView.get('server-title').removeClass('is-hidden');
     }
  };

  _makeSelectServer = function () {
    var version = $(this).val();
    var list_option = customer.model.servers.find( { 'version' : version, 'type' : 'AP' } );
    util.addOption( list_option, makeUserView.get('select__server'), true );
  };

  _makeUser = function () {

    var
      system_type = makeUserView.get('select__system').val()
    , version     = makeUserView.get('select__version').val()
    , server      = makeUserView.get('select__server').val()
    , env_id      = customer.model.environments.find({
        'system_type' : system_type,
        'version'     : version
      })[0].id
    , param
    ;

    if ( system_type === 'onpre' ) {
      server = '';
    }

    param = {
      data : {
        system_type    : system_type,
        version        : version,
        environment_id : env_id,
        server         : server,
      }
    };

    // KID, Userkey, DB Passwordを決める
    customer.db.insert( '/makeUser', param,  _openCompleteDialog );

  };

  initModule = function () {

    $('.main-contents--mk-usr').append( customer.db.getHtml('make.user.html') );

    makeUserView = new Controller('.main-contents--mk-usr');

    // ダイアログ作成
    util.confirm({
      selector : '.main-contents--mk-usr',
      id       : 'make-usr-confirm',
      msg      : 'ユーザーを作成しますか？',
      yes      : _makeUser
    });

    makeUserView.initElement( elements );

    makeUserView.addListener({
      'click btn__ok'          : _openConfirm,
      'click btn__close'       : _closeComplteDialog,
      'change select__system'  : _selectSystem,
      'change select__version' : _makeSelectServer
    });

  };

  // to public
  cms.view.makeUser = {
    initModule : initModule
  };

}( jQuery, customer ));