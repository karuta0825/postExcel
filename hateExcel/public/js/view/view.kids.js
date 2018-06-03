/**
 *  list users
 */

(function ($, cms) {
  let
  // member
    view,
    elements = {
      btn: {
        delete: '.btn--del',
        download: '.btn--download',
        nextPage: '.next',
        prevPage: '.prev',
        listPage: '.page_list',
        closeDownload: '.btn--close',
        execDownload: '.btn--exec',
      },
      download: '.download--kids',
      dialog: {
        download: '#modal-kids-download',
        delete: '#modal-delete-user',
      },
      table: {
        wrap: '.users-table__body',
        self: '.users-table__body table',
        header: '.users-table__body th.mdl-data-table__cell--non-numeric',
        body: '.users-table__body tbody',
        row: '.users-table__body tbody tr',
      },
    },
    // private
    _hideCol,
    _setColInfo,
    _onClickColumn,
    _onClickKid,
    _onClickDownload,
    _getSelectItem,
    _deleteUser,
    _selectPage,
    _highlightIndexPage,
    // public
    changeColumnState,
    initModule,
    makePageButton,
    drawTable,
    redrawTable,
    refresh
  ;

  /**
   * viewのtable_colを更新する
   */
  _setColInfo = function () {
    let obj;
    const header = cms.model.kidsColumn.getCache();

    if (header.length < 1) {
      return cms.model.kidsColumn.fetch()
        .then((r) => {
          _.each(r[0], (v, k) => {
            obj = {};
            obj[`table__col__${k}`] = `.users-table__body .${k}`;
            view.addElement(obj);
          });
        });
    }


    _.each(header, (v, k) => {
      obj = {};
      obj[`table__col__${k}`] = `.users-table__body .${k}`;
      view.addElement(obj);
    });

    return Promise.resolve();
  };

  /**
   * 表示列制御
   */
  _hideCol = function () {
    _.each(cms.model.kidsColumn.getCache(), (v, k) => {
      changeColumnState(k, v);
    });
  };

  _onClickColumn = function () {
    column_class_name = $(this).attr('class').split(' ')[1];
    customer.model.kids.sortByCol(column_class_name, redrawTable);
  };

  _onClickKid = function (e) {
    let
      target = $(e.target),
      kids_id;
    if (!target.hasClass('kid')) {
      return;
    }

    kids_id = $(e.target).parents('tr').attr('id');
    cms.view.editUsrs.open(kids_id);
  };


  _onClickDownload = function () {
    // 確認ダイアログを表示させる
    let
      type = view.get('dialog__download').find('.is-checked').attr('for'),
      filename,
      header,
      data,
      Blob;
    switch (type) {
      case 'only-checked':
        data = customer.model.kids.find(_getSelectItem());
        break;
      case 'filtered':
        data = customer.model.kids.getConditionAll();
        break;
      case 'all':
        data = customer.model.kids.getCache();
      default:
        break;
    }

    const order = [
      'kid', 'user_name', 'server', 'userkey', 'db_password',
      'fenics_key', 'client_number', 'number_pc', 'number_id', 'range_id',
      'license', 'has_qa', 'has_busiv', 'mobile_number', 'register_on',
      'is_new_contract', 'is_replaced_from_cj', 'is_replaced_from_wc', 'is_replaced_from_another',
      'sa_company', 'sa_name', 'sa_tel', 'sa_email',
      'se_company', 'se_name', 'se_tel', 'se_email',
      'em_company', 'em_name', 'em_tel', 'em_email'];

    filename = `${new moment().format('YYYYMMDD')}_KID_List.csv`;
    header = _.chain(customer.model.kids.getHeader()).pick(order).values().value();
    data = _.map(data, (v, k) => _.pick(v, order));
    Blob = util.convertMap2Blob(data, header);
    // ダウンロード
    util.downloadFile(view.get('download'), Blob, filename);
    view.get('download').get(0).click();
  };

  _getSelectItem = function () {
    // まずい指定が弱い
    const ids = _.map($('.is-selected'), (val, key) => ({ id: Number($(val).attr('id')) }));

    if (ids.length === 0) {
      alert('選択されていません');
      return;
    }

    return ids;
  };

  _deleteUser = function () {
    // modelを使ったデリート
    const list_delete = _getSelectItem();

    if (list_delete) {
      customer.model.kids.delete(list_delete);
    }

    cms.view.kids.refresh();
    cms.view.homeNotices.refresh();
  };

  _highlightIndexPage = function (page_index) {
    _.each(view.get('btn__listPage').find('.page'), (v, k) => {
      if (Number($(v).text()) === page_index) {
        $(v).addClass('accent-font');
      }
    });
  };

  _selectPage = function (e) {
    let
      el = $(e.target),
      page = Number(el.text()),
      is_button = el.hasClass('page');
    if (is_button) {
      cms.model.kids.getPage(page, drawTable);
    }
  };

  /**
   * ページ番号のボタンや..を作る
   * @param  {Array} list - 表示するページ番号リスト
   */
  makePageButton = function (list) {
    let el;

    view.get('btn__listPage').empty();

    _.each(list, (number, idx) => {
      if (number === '') {
        el = $('<span>', { text: '..' });
      } else {
        el = $('<button>', {
          class: 'page mdl-button',
          text: number,
        });
      }

      view.get('btn__listPage').append(el);
    });
  };


  drawTable = function (data) {
    if (data === null) {
      return;
    }

    let
      content = { list: null },
      header = customer.model.kids.getHeader(),
      body = data,
      tmpl = customer.db.getHtml('template/kids.list.html'),
      complied = _.template(tmpl);
    delete header.uid;
    content.list = {
      header,
      body,
    };

    view.get('table__wrap').empty();
    view.get('table__wrap').append(complied(content));

    view.updateElement('table__self');
    view.updateElement('table__header');
    view.updateElement('table__body');
    view.updateElement('table__row');

    _setColInfo()
      .then(() => {
        _hideCol();
      });

    componentHandler.upgradeElement(view.get('table__self').get(0));

    cms.model.kids.getPageList(makePageButton);
    _highlightIndexPage(cms.model.kids.getPageIndex());
  };

  /**
   * 並び替えによる再描画処理
   * 行数が変わらないことがポイント
   */
  redrawTable = function (col, data) {
    const headerMap = customer.model.kids.getHeader();

    _.each(view.get('table__row'), (val, index) => {
      // idだけは個別処理
      $(val).attr('id', data[index].id);

      // 解約日が設定されている場合、行の背景色変更
      if (data[index].end_on !== null) {
        $(val).addClass('end_user');
      } else {
        $(val).removeClass('end_user');
      }

      // 各々の列の値をクリアしてソートした値をセット
      _.each(headerMap, (v, k) => {
        if (k === 'is_marked') {
          if (data[index][k] === '0') {
            $(val).find(`.${k}`).empty();
          } else {
            $(val).find(`.${k}`).empty().html('<i class="material-icons">star</i>');
          }
          return;
        }

        if (data[index].end_on !== null) {
          $(val).find('.is_marked').empty().html('<i class="material-icons">lock_outline</i>');
        }

        $(val).find(`.${k}`).empty().append(data[index][k]);
      });
    });

    cms.model.kids.getPage(1);
    cms.model.kids.getPageList(makePageButton);
    _highlightIndexPage(cms.model.kids.getPageIndex());
  };

  refresh = function () {
    const pageIndex = cms.model.kids.getPageIndex();

    cms.model.kids.fetch(null, () => {
      cms.model.kids.getCondition(drawTable, pageIndex);
      cms.view.userBaseInfo.refresh();
    });
  };

  changeColumnState = function (column, is_show) {
    const col = `table__col__${column}`;

    if (is_show === '1') {
      view.get(col).removeClass('is-hidden');
    } else {
      view.get(col).addClass('is-hidden');
    }
  };

  initModule = function () {
    // table load
    $('.main-contents--view-usr').append(customer.db.getHtml('html/list.users.html'));

    // ダイアログ作成
    util.confirm({
      selector: '.main-contents--view-usr',
      id: 'modal-delete-user',
      msg: '選択したユーザーを削除しますか?',
      yes: _deleteUser,
    });

    view = new Controller('.main-contents--view-usr');
    view.initElement(elements);

    cms.model.kids.initModule();
    cms.model.kids.fetch(null, drawTable);

    view.addListener({
      'click btn__delete': function () { view.get('dialog__delete').get(0).showModal(); },
      'click btn__download': function () { view.get('dialog__download').get(0).showModal(); },
      'click btn__nextPage': function () { cms.model.kids.nextPage(drawTable); },
      'click btn__prevPage': function () { cms.model.kids.prevPage(drawTable); },
      'click btn__listPage': _selectPage,
      'click btn__closeDownload': function () { view.get('dialog__download').get(0).close(); },
      'click btn__execDownload': _onClickDownload,
      'click table__body': _onClickKid,
      'click table__header': _onClickColumn,
    });
  };

  // to public
  cms.view.kids = {
    initModule,
    drawTable,
    refresh,
    changeColumnState,
  };
}(jQuery, customer));
