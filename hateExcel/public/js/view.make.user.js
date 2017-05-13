/**
 * ユーザー作成
 */


( function ( $, cms ) {


  var
    makeUserView
  , elements = {
      btn : {
        'ok' : '.btn--ok',
        'cancel' : '.btn--cancel',
        'exec' : '.btn--exec'
      },
      select : {
        system  : '.select-system',
        version : '.select-version',
        server  : '.select-server'
      },
      'server-title' : '.select-name.server',
      'dialog' : '.mdl-dialog'
    }
  , _openDialog
  , _makeSelectServer
  , _selectSystem
  , _makeUser
  , initModule
  ;

  _openDialog = function () {
    makeUserView.get('dialog').get(0).showModal();
  };

  _closeDialog = function () {
    makeUserView.get('dialog').get(0).close();
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

    // if ( param['data'].system_type !== 'onpre') {
    //   _.each( param['data'], function ( val, key ) {
    //      if ( !val ) {
    //       alert('情報不足のため、ユーザー作成できません');
    //       return;
    //      }
    //   });
    // }

    console.log( param );

    // KID, Userkey, DB Passwordを決める
    customer.db.insert( '/makeUser', param );

  };

  initModule = function () {

    $('.main-contents--mk-usr').append( customer.db.getHtml('make.user.html') );

    makeUserView = new Controller('.main-contents--mk-usr');

    // ダイアログ作成
    util.dialog({
      selector : '.main-contents--mk-usr',
      msg      : 'ユーザーを作成しますか？'
    });

    makeUserView.initElement( elements );

    makeUserView.addListener({
      'click btn__ok'          : _makeUser,
      'click btn__cancel'      : _closeDialog,
      'click btn__exec'        : _closeDialog,
      'change select__system'  : _selectSystem,
      'change select__version' : _makeSelectServer
    });

  };

  // to public
  cms.view.makeUser = {
    initModule : initModule
  };

}( jQuery, customer ));