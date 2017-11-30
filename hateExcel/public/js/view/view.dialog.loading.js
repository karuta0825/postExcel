

(function ( $, cms ) {

  var
    view
  , elements = {
      'title' : '.mdl-dialog__title'
    }
  , defaultMsg = 'サーバ通信'
  , viewMsg
  , close
  , open
  , initModule
  ;

  open = function ( msg ) {

    if ( msg ) {
      view.get('title').text(msg);
    }
    else {
      view.get('title').text(defaultMsg);
    }

    view.wrap.get(0).showModal();

  };

  close = function () {

    view.wrap.get(0).close();

  };

  initModule = function () {

    view = new Controller('#dialog-loading');

    view.initElement( elements );

    view.get('title').text(defaultMsg);

  };

  cms.view.dialogLoading = {
    initModule : initModule,
    open    : open,
    close   : close
  };

}( jQuery, customer ));