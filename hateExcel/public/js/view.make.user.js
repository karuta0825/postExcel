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
      makeUserView.get('select__version').addClass('is-hidden');
      makeUserView.get('select__server').addClass('is-hidden');
     }
     else {
      makeUserView.get('select__version').removeClass('is-hidden');
      makeUserView.get('select__server').removeClass('is-hidden');
     }
  };

  _makeSelectServer = function () {
    var version = $(this).val();
    var list_option = customer.model.servers.find( { 'version' : version, 'type' : 'AP' } );
    util.addOption( list_option, makeUserView.get('select__server'), true );
  };

  _makeUser = function () {

    var param = {
      'data' : {
        system_type : makeUserView.get('select__system').val(),
        version     : makeUserView.get('select__version').val(),
        server      : makeUserView.get('select__server').val()
      },
      'table' : 'kids'
    };

    if ( param['data'].system_type !== 'onpre ') {
      _.each( param['data'], function ( val, key ) {
         if ( !val ) {
          alert('情報不足のため、ユーザー作成できません');
          return;
         }
      }); 
    }

    console.log( param );

    // KID, Userkey, DB Passwordを決める
    // 決まったあとは、トリガー経由で自動で他のテーブルにデータが入る
    // customer.db.insert( params );

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