

(function ( $, cms )  {

  var
    view
  , list_select = []
  , elements = {
      btn : {
        'exec' : '.btn--exec',
        'close' : '.btn--close'
      },
      input : {
        'start_on' : '.start_on .input',
        'end_on'   : '.end_on .input',
        'category' : '.category .input'
      },
      dialog : {
        'confirm' : '#confirm-update-fenics',
        'alert' : '#input-error-bulkFenics'
      }
    }
  , _update
  , _close
  , open
  , initModule
  ;

  _update = function () {

    var updateObj = {};

    if ( view.get('input__start_on').val() !== '' ) {
      updateObj['start_on'] = view.get('input__start_on').val();
    }

    if ( view.get('input__end_on').val() !== '' ) {
      updateObj['end_on'] = view.get('input__end_on').val();
    }

    if ( view.get('input__category').val() !== '' ) {
      updateObj['category'] = view.get('input__category').val();
    }

    if ( list_select.length < 1 ) {
      alert('更新するものを選択してください');
      return;
    };

    return cms.model.fenics.updates( list_select, updateObj )
    .then( function () {
      list_select = [];
      _close();
    })
    .then( function () {
      return cms.model.fenics.fetch()
    })
    .then( function () {
      cms.view.fenics.drawTable(
        cms.model.fenics.getFiltered()
      );
    });
    ;

  };

  _close = function () {

    list_select = [];

    _.each( view.get('input'), function (v, k) {
      v.removeClass('is-error');
      v.val('');
    });

    view.wrap.get(0).close();
  };

  open = function ( list ) {
    list_select = list;
    view.wrap.get(0).showModal();
  };

  initModule = function () {

    view = new Controller('#modal-update-fenics');

    util.confirm({
      selector : view.top,
      id       : 'confirm-update-fenics',
      msg      : '選択したユーザを一括更新しますか？',
      yes      : _update
    });

    util.alert({
      selector : view.top,
      id       : 'input-error-bulkFenics',
      msg      : '入力に誤りがあります'
    });

    view.initElement(elements);

    view.addListener({
      'click btn__exec' : function () { view.get('dialog__confirm').get(0).showModal() },
      'click btn__close' : _close
    });

  };

  cms.view.dialogBulkFenics = {
    initModule : initModule,
    open : open
  };

}( jQuery, customer ));