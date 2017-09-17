

(function ( $, cms ) {

  var
    view
  , elements = {
      'btn' : {
        'close' : '.btn--close'
      },
      'msg' : '.dialog-message'
    }
  , defaultMsg = '入力に誤りがあります'
  , viewMsg
  , close
  , open
  , initModule
  ;


  open = function ( msg ) {

    if ( msg ) {
      view.get('msg').text(msg);
    }
    else {
      view.get('msg').text(defaultMsg);
    }

    view.wrap.get(0).showModal();

  };

  close = function () {
    view.wrap.get(0).close();
  };

  initModule = function () {

    view = new Controller('#dialog-alert');

    view.initElement( elements );

    view.get('msg').text(defaultMsg);

    view.addListener({
      'click btn__close' : close
    });

  };

  cms.view.dialogAlert = {
    initModule : initModule,
    open  : open,
    close : close
  };

}( jQuery, customer ));