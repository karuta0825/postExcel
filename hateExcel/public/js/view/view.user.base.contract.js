
(function ($, cms) {
  let
    view,
    elements = {
      choice: {
        is_new_contract: '.is_new_contract .choice',
        is_replaced_from_cj: '.is_replaced_from_cj .choice',
        is_replaced_from_wc: '.is_replaced_from_wc .choice',
        is_replaced_from_another: '.is_replaced_from_another .choice',
      },
    },
    initModule,
    setViewInfo;

  initModule = function () {
    view = new Controller('#usr-base-panel');
    view.initElement(elements);
  };

  setViewInfo = function (data) {
    _.each(view.get('choice'), (val, key) => {
      if (data[key] === 1) {
        $(val).addClass('choice--on');
      } else {
        $(val).removeClass('choice--on');
      }
    });
  };

  cms.view.userBaseInfoContract = {
    initModule,
    setViewInfo,
    get() { return view; },
  };
}(jQuery, customer));
