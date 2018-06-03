

(function ($, cms) {
  let
    view,
    elements = {
      btn: {
        close: '.btn--close',
      },
      msg: '.dialog-message',
    },
    defaultMsg = '入力に誤りがあります',
    funcsAtClose = [],
    viewMsg,
    _initFuncsAtClose,
    close,
    open,
    onClose,
    initModule;
  _initFuncsAtClose = function () {
    funcsAtClose = [];
  };

  open = function (msg) {
    if (msg) {
      view.get('msg').text(msg);
    } else {
      view.get('msg').text(defaultMsg);
    }

    // すでに開いていれば終了
    if (view.wrap.attr('open')) {
      return;
    }

    view.wrap.get(0).showModal();
  };

  close = function () {
    view.wrap.get(0).close();

    _.each(funcsAtClose, (v) => {
      v();
    });

    _initFuncsAtClose();
  };

  onClose = function (func) {
    if (typeof func === 'function') {
      funcsAtClose.push(func);
    }
  };

  initModule = function () {
    view = new Controller('#dialog-alert');

    view.initElement(elements);

    view.get('msg').text(defaultMsg);

    view.addListener({
      'click btn__close': close,
    });
  };

  cms.view.dialogAlert = {
    initModule,
    open,
    close,
    onClose,
  };
}(jQuery, customer));
