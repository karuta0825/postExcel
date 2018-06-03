
/**
 * fenics画面
 */

(function ($, cms) {
  let
    view,
    elements = {
      btn: {
        edit: '.fenics-table td.edit',
      },
      body: '.body',
      check: '.mdl-checkbox',
    },
    _openFenicsEditDialog,
    getSelectItem,
    drawTable,
    refresh,
    releaseCheck,
    initModule
  ;

  /**
   * チェックされたユーザを取得する
   */
  getSelectItem = function () {
    const ids = _.map($('.is-selected', view.top), (val, key) => ({ fenics_id: $(val).attr('id') }));

    return ids;
  };

  _openFenicsEditDialog = function () {
    let
      fenics_id = $(this).parents('tr').attr('id'),
      item = cms.model.userNetwork.find({ fenics_id })[0];


    cms.view.dialogFenics.open(item);
  };


  drawTable = function (data) {
    var
      data = {
        list: data,
        clients: cms.model.userClients.find({ is_admin: 0 }),
      },
      tmpl = customer.db.getHtml('template/mobile.fenics.list.html'),
      complied = _.template(tmpl);
    view.get('body').empty();
    view.get('body').append(complied(data));
    componentHandler.upgradeElements(view.wrap);
  };

  refresh = function () {
    const kids_id = cms.model.userBaseInfo.getCache().id;

    // fenics tableの更新
    cms.model.userNetwork.fetch(kids_id)
      .then(() => {
        cms.model.userNetwork.find({ is_mobile: 0 }, drawTable);
      });
  };

  releaseCheck = function () {
    _.each(view.get('checkbox'), (val, key) => {
      if ($(val).hasClass('is-checked')) {
        $(val).trigger('click');
      }
    });
  };

  initModule = function () {
    view = new Controller('.fenics-section');

    view.initElement(elements);

    view.addListener({
      'click btn__edit': _openFenicsEditDialog,
    });
  };

  cms.view.userFenics = {
    initModule,
    show() { view.wrap.removeClass('is-hidden'); },
    hide() { view.wrap.addClass('is-hidden'); },
    drawTable,
    refresh,
    getSelectItem,
    releaseCheck,
  };
}(jQuery, customer));
