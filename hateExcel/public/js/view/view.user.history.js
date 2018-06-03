
/**
 * 履歴情報
 */

(function ($, cms) {
  let
  // member
    view,
    elements = {
      btn: {
        del: '.delete .mdl-button',
      },
      filter: {
        self: '.filter',
        select: '.select-item_name',
      },
      table: '.body',
      confirm: '#confirm-delete-history',
    },
    // private method
    _selectedId,
    _drawTable,
    _confirmDel,
    _delete,
    _selectFilter,
    // public method
    makeFilter,
    refresh,
    initModule;

  _confirmDel = function () {
    _selectedId = $(this).parents('tr').attr('hid');
    view.get('confirm').get(0).showModal();
  };

  _delete = function () {
    const option = view.get('filter__select').val();
    cms.model.userHistory.remove(_selectedId, () => {
      const data = cms.model.userHistory.find({ item_name: option });
      makeFilter();

      if (data.length > 0) {
        view.get('filter__select').val(option);
        drawTable(data);
      } else {
        drawTable(cms.model.userHistory.getCache());
      }
    });
  };

  makeFilter = function () {
    const options = cms.model.userHistory.getFilterOption();

    view.get('filter__select').empty();

    view.get('filter__select').append($('<option>', { value: 'all', text: '全て' }));

    _.each(options, (v, k) => {
      view.get('filter__select').append($('<option>', { value: v, text: v }));
    });
  };

  _selectFilter = function () {
    const item_name = $(this).val();
    const items = cms.model.userHistory.find({ item_name });

    drawTable(items);
  };

  drawTable = function (data) {
    var
      data = { list: data },
      tmpl = customer.db.getHtml('template/user.history.html'),
      complied = _.template(tmpl);
    view.get('table').empty().append(complied(data));
  };

  refresh = function () {
    const kids_id = cms.model.userBaseInfo.getCache().id;
    cms.model.userHistory.fetch(kids_id)
      .then((r) => {
        drawTable(r);
        makeFilter();
      });
  };

  initModule = function () {
    view = new Controller('#usr-history-panel');

    view.wrap.append(customer.db.getHtml('html/user.history.html'));

    util.confirm({
      selector: view.top,
      id: 'confirm-delete-history',
      msg: '選択した履歴を削除しますか?',
      yes: _delete,
    });

    view.initElement(elements);

    view.addListener({
      'click btn__del': _confirmDel,
      'change filter__select': _selectFilter,
    });
  };

  // to public
  cms.view.userHistory = {
    initModule,
    drawTable,
    makeFilter,
    refresh,
  };
}(jQuery, customer));
