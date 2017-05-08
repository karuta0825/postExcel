/**
 * ユーザー作成
 */


( function ( $, cms ) {


  var
    makeUserView
  , elements = {
      btn : {
        'ok' : '.btn--ok'
      },
      select : {
        system  : '.select-system',
        version : '.select-version',
        server  : '.select-server'
      }
    }
  , _makeSelectServer
  , _selectSystem
  , _makeUser
  , initModule
  ;

  _selectSystem = function () {
     if ( $(this).val() ===  'onpre' ) {
      // makeUserView.get('select__version').addClass('is-hidden');
      makeUserView.get('select__server').addClass('is-hidden');
     }
     else {
      // makeUserView.get('select__version').removeClass('is-hidden');
      makeUserView.get('select__server').removeClass('is-hidden');
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
    , param
    ;

    if ( system_type === 'onpre' ) {
      server = '';
    }

    param = {
      data : {
        system_type : system_type,
        version : version,
        server : server
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
    // customer.db.insert( '/makeUser', param );


    // kidsモデルを更新して再描画


  };

  initModule = function () {

    $('.main-contents--mk-usr').append( customer.db.getHtml('make.user.html') );

    makeUserView = new Controller('.main-contents--mk-usr');

    makeUserView.initElement( elements );

    makeUserView.addListener({
      'click btn__ok'          : _makeUser,
      'change select__system' 　: _selectSystem,
      'change select__version' : _makeSelectServer
    });

  };

  // to public
  cms.view.makeUser = {
    initModule : initModule
  };

}( jQuery, customer ));