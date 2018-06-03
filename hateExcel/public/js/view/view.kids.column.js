(function ($, cms) {
  let
    view,
    elements = {
      btn: {
        close: '.btn--close',
        save: '.btn--save',
      },
      list: '.column-list',
      switch: {
        is_marked: '#switch-is_marked',
        kid: '#switch-kid',
        user_name: '#switch-user_name',
        kana: '#switch-kana',
        server: '#switch-server',
        userkey: '#switch-userkey',
        db_password: '#switch-db_password',
        fenics_key: '#switch-fenics_key',
        client_number: '#switch-client_number',
        number_pc: '#switch-number_pc',
        license: '#switch-license',
        number_id: '#switch-number_id',
        range_id: '#switch-range_id',
        update_on: '#switch-update_on',
        system_type: '#switch-system_type',
        version: '#switch-version',
        has_busiv: '#switch-has_busiv',
        has_fenics: '#switch-has_fenics',
        has_mobile: '#switch-has_mobile',
        mobile_number: '#switch-mobile_number',
        is_registered: '#switch-is_registered',
        register_on: '#switch-register_on',
        sa_company: '#switch-sa_company',
        sa_name: '#switch-sa_name',
        sa_tel: '#switch-sa_tel',
        sa_email: '#switch-sa_email',
        se_company: '#switch-se_company',
        se_name: '#switch-se_name',
        se_tel: '#switch-se_tel',
        se_email: '#switch-se_email',
        em_company: '#switch-em_company',
        em_name: '#switch-em_name',
        em_tel: '#switch-em_tel',
        em_email: '#switch-em_email',
      },
    },
    _close,
    _save,
    _switchColumnState,
    open,
    initModule;

  _close = function () {
    view.wrap.get(0).close();
  };

  _save = function () {
    cms.model.kidsColumn.update();
    _close();
  };

  _switchColumnState = function () {
    let
      column = $(this).attr('id').replace(/switch-/, ''),
      is_show;
    if ($(this).parents('label').hasClass('is-checked')) {
      is_show = '0';
    } else {
      is_show = '1';
    }

    cms.model.kidsColumn.setShowColumn(column, is_show);
    cms.view.kids.changeColumnState(column, is_show);
  };

  open = function () {
    const columns = cms.model.kidsColumn.getCache();

    _.each(view.get('switch'), (val, key) => {
      if (columns[key] === '1' && !val.get(0).checked) {
        val.click();
      }

      if (columns[key] === '0' && val.get(0).checked) {
        val.click();
      }
    });

    view.wrap.get(0).showModal();
  };

  initModule = function () {
    view = new Controller('#dialog-show-columns');

    view.initElement(elements);

    view.addListener({
      'click btn__close': _close,
      'click btn__save': _save,
      'click switch__is_marked': _switchColumnState,
      'click switch__kid': _switchColumnState,
      'click switch__user_name': _switchColumnState,
      'click switch__kana': _switchColumnState,
      'click switch__server': _switchColumnState,
      'click switch__userkey': _switchColumnState,
      'click switch__db_password': _switchColumnState,
      'click switch__fenics_key': _switchColumnState,
      'click switch__client_number': _switchColumnState,
      'click switch__number_pc': _switchColumnState,
      'click switch__license': _switchColumnState,
      'click switch__number_id': _switchColumnState,
      'click switch__range_id': _switchColumnState,
      'click switch__update_on': _switchColumnState,
      'click switch__system_type': _switchColumnState,
      'click switch__version': _switchColumnState,
      'click switch__has_busiv': _switchColumnState,
      'click switch__has_fenics': _switchColumnState,
      'click switch__has_mobile': _switchColumnState,
      'click switch__mobile_number': _switchColumnState,
      'click switch__is_registered': _switchColumnState,
      'click switch__register_on': _switchColumnState,
      'click switch__sa_company': _switchColumnState,
      'click switch__sa_name': _switchColumnState,
      'click switch__sa_tel': _switchColumnState,
      'click switch__sa_email': _switchColumnState,
      'click switch__se_company': _switchColumnState,
      'click switch__se_name': _switchColumnState,
      'click switch__se_tel': _switchColumnState,
      'click switch__se_email': _switchColumnState,
      'click switch__em_company': _switchColumnState,
      'click switch__em_name': _switchColumnState,
      'click switch__em_tel': _switchColumnState,
      'click switch__em_email': _switchColumnState,
    });
  };

  // to public
  cms.view.kidsColumn = {
    initModule,
    open,
  };
}(jQuery, customer));

