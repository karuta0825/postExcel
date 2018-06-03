
/**
 * busiv ES用画面
 */

(function ($, cms) {
  let
    view,
    elements = {
      input: {
        circuit_name: '.circuit_name',
        circuit_service: '.circuit_service',
        open_date: '.open_date',
        w_network: '.w_network',
        w_subnet: '.w_subnet',
        w_router: '.w_router',
        virtual_dl_ip: '.virtual_dl_ip',
        has_sxr_j: '.has_sxr_j',
        sx_ip: '.sx_ip',
        has_rx: '.has_rx',
        rx_ip: '.rx_ip',
        has_sd: '.has_sd',
        auth_server_ip: '.auth_server_ip',
        clients_ip: '.clients_ip',
      },
    },
    _selectChoice,
    showError,
    isHidden,
    goEditMode,
    goViewMode,
    setViewInfo,
    getViewInfo,
    refresh,
    initModule;

  _selectChoice = function () {
    let
      el_pushed = $(event.target),
      className = el_pushed.attr('class').split(' ')[0],
      yes = $($(this).find('button').get(0));
    if (className === 'choice' && el_pushed.parents('li').hasClass('is-edit')) {
      yes.toggleClass('choice--on');
    }
  };

  isHidden = function () {
    return view.wrap.hasClass('is-hidden');
  };

  showError = function (list_key) {
    _.each(list_key, (v, k) => {
      view.get(`input__${v}`)
        .find('.item-value').addClass('is-error');
    });

    cms.view.dialogAlert.open();
  };

  goViewMode = function () {
    // エラー外す
    _.each(view.get('input'), (v, k) => {
      $(v).find('.item-value').removeClass('is-error');
    });

    _.each(view.get('input'), (val, key) => {
      val.find('.item-value').removeClass('is-edit');
      val.find('.item-value').prop('disabled', true);
    });

    // buisvセレクトボックスの編集不可能
    view.get('input').has_sxr_j.removeClass('is-edit');
    view.get('input').has_rx.removeClass('is-edit');
    view.get('input').has_sd.removeClass('is-edit');
  };

  goEditMode = function () {
    _.each(view.get('input'), (val, key) => {
      val.find('.item-value').addClass('is-edit');
      val.find('.item-value').prop('disabled', false);
    });

    // buisvセレクトボックスの編集可能
    view.get('input').has_sxr_j.addClass('is-edit');
    view.get('input').has_rx.addClass('is-edit');
    view.get('input').has_sd.addClass('is-edit');
  };

  setViewInfo = function (data) {
    var data = _.isArray(data) ? data[0] : data;

    if (!data) {
      return;
    }

    _.each(view.get('input'), (v, k) => {
      v.find('.item-value').val(data[k]);
    });

    // sx連携
    if (data.has_sxr_j === 1) {
      view.get('input__has_sxr_j').find('.yes_sxr_j').addClass('choice--on');
    } else {
      view.get('input__has_sxr_j').find('.yes_sxr_j').removeClass('choice--on');
    }

    //　L3有無
    if (data.has_rx === 1) {
      view.get('input__has_rx').find('.yes_rx').addClass('choice--on');
    } else {
      view.get('input__has_rx').find('.yes_rx').removeClass('choice--on');
    }

    // カルテ連携
    if (data.has_sd === 1) {
      view.get('input__has_sd').find('.yes_sd').addClass('choice--on');
    } else {
      view.get('input__has_sd').find('.yes_sd').removeClass('choice--on');
    }
  };

  getViewInfo = function () {
    let
      result = {},
      list_choice = ['has_sxr_j', 'has_rx', 'has_sd'];
    _.each(view.get('input'), (v, k) => {
      result[k] = v.find('.item-value').val();
    });

    // 選択形式の入力の値を取得
    _.each(list_choice, (v, k) => {
      if (view.get('input')[v].find('.choice').hasClass('choice--on')) {
        result[v] = 1;
      } else {
        result[v] = 0;
      }
    });

    return result;
  };

  refresh = function () {
    cms.model.userBusiv.getCache(setViewInfo);
  };

  initModule = function () {
    view = new Controller('.busiv-es-section');

    view.initElement(elements);

    view.addListener({
      'click input__has_sxr_j': _selectChoice,
      'click input__has_rx': _selectChoice,
      'click input__has_sd': _selectChoice,
    });
  };

  cms.view.userBusivES = {
    initModule,
    show() { view.wrap.removeClass('is-hidden'); },
    hide() { view.wrap.addClass('is-hidden'); },
    setViewInfo,
    getViewInfo,
    refresh,
    goViewMode,
    goEditMode,
    showError,
    isHidden,
  };
}(jQuery, customer));
