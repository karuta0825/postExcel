/**
 * クライアント情報
 */

(function ($, cms) {
  // member
  let
    clientView,
    elements = {
      btn: {
        cancel: '.btn--cancel',
        delete: '.btn--del',
        save: '.btn--save',
        edit: '.btn--edit',
        download: '.btn--download',
        close: '.btn--close',
        exec: '.btn--exec',
      },
      checkbox: '.mdl-checkbox',
      'select-clients': '.select-clients',
      end_on: '.input--end_on',
      download: {
        client: '.download--client',
        open_notice: '.download--open-notice',
        open_notice_add: '.download--open-notice-for-add',
        citrix_user: '.download--citrix-user',
        db_user: '.download--db-user',
        public_xenapps: '.download--public-xenapps',
      },
      table: '.table--clients',
      dialog: {
        download: '#modal-client-download',
        delete: '#delete-clients-confirm',
      },
    },
    _goEditMode,
    _backMode,
    _openDialog,
    _closeDialog,
    _execDowload,
    _downloadOpenNotice,
    _downloadOpenNoticeForAdd,
    _downloadIni,
    _downloadCitrixUser,
    _downloadDbUser,
    _downloadPublicXenApps,
    _changeFenicsId,
    _changeEndOn,
    _save,
    _cancel,
    makeFenicsSelectBox,
    clear,
    drawTable,
    refresh,
    initModule
  ;

  /**
   * 編集モード
   * TODO:セレクトボックス指定のためのPropertyを作る
   */
  _goEditMode = function () {
    clientView.get('btn__edit').addClass('is-hidden');
    clientView.get('btn__download').addClass('is-hidden');
    clientView.get('btn__cancel').removeClass('is-hidden');
    clientView.get('btn__delete').removeClass('is-hidden');
    clientView.get('btn__save').removeClass('is-hidden');

    // wrapではなく、propertyをしていさせる
    clientView.wrap.find('.select-clients').prop('disabled', false);
    clientView.get('end_on').prop('disabled', false);
  };

  /**
   * 通常モードに戻る
   */
  _backMode = function () {
    clientView.get('btn__edit').removeClass('is-hidden');
    clientView.get('btn__download').removeClass('is-hidden');
    clientView.get('btn__cancel').addClass('is-hidden');
    clientView.get('btn__delete').addClass('is-hidden');
    clientView.get('btn__save').addClass('is-hidden');

    clientView.wrap.find('.select-clients').prop('disabled', true);
    clientView.get('end_on').prop('disabled', false);
  };

  _openDialog = function () {
    clientView.get('dialog__download').get(0).showModal();
  };

  _closeDialog = function () {
    clientView.get('dialog__download').get(0).close();
  };

  _execDowload = function () {
    // ダウンロード
    _.each(clientView.get('checkbox'), (val, key) => {
      if ($(val).hasClass('is-checked')) {
        $(val).find('a')[0].click();
      }
    });

    clear();

    clientView.get('dialog__download').get(0).close();
  };


  _downloadOpenNotice = function () {
    let
      kid = cms.model.userBaseInfo.getCache().kid,
      file_name = `${new moment().format('YYYYMMDD')}_${kid}_OpenNotice.csv`,
      list_checked = _getSelectItem(),
      downloadMap,
      csv_header,
      blob
    ;

    // 検索データがゼロのとき、処理終了
    if (list_checked.length < 1) {
      return;
    }

    // 取得データからモデルにデータ検索
    downloadMap = cms.model.userClients.makeOpenNotice(list_checked, false);

    if (downloadMap.header === null) {
      cms.view.dialogAlert.open('接続先のAPサーバが設定しないため正常に作成できません');
      return;
    }

    csv_header = _.values(downloadMap.header).join(',');

    // データ作成
    blob = util.convertMap2Blob(downloadMap.body, csv_header);

    // ダウンロード
    util.downloadFile(this, blob, file_name);
  };

  _downloadOpenNoticeForAdd = function () {
    let
      kid = cms.model.userBaseInfo.getCache().kid,
      file_name = `${new moment().format('YYYYMMDD')}_${kid}_OpenNotice.csv`,
      list_checked = _getSelectItem(),
      downloadMap,
      csv_header,
      blob
    ;

    // 検索データがゼロのとき、処理終了
    if (list_checked.length < 1) {
      return;
    }

    // 取得データからモデルにデータ検索
    downloadMap = cms.model.userClients.makeOpenNotice(list_checked, true);

    if (downloadMap.header === null) {
      cms.view.dialogAlert.open('接続先のAPサーバが設定しないため正常に作成できません');
      return;
    }

    csv_header = _.values(downloadMap.header).join(',');

    // データ作成
    blob = util.convertMap2Blob(downloadMap.body, csv_header);

    // ダウンロード
    util.downloadFile(this, blob, file_name);
  };

  _downloadIni = function () {
    let
      kid = cms.model.userBaseInfo.getCache().kid,
      file_name = `UserName_${kid}.ini`,
      downloadMap,
      blob;
    downloadMap = cms.model.userClients.makeBatInfo();

    if (downloadMap === null) {
      cms.view.dialogAlert.open('接続先のAPサーバが設定しないため正常に作成できません');
      return;
    }

    // データ作成
    blob = util.makeMapList2Txt(downloadMap);

    // ダウンロード
    util.downloadFile(this, blob, file_name);
  };

  _downloadCitrixUser = function () {
    let
      user = cms.model.userBaseInfo.getCache(),
      file_name = `AP_WinUserSet_${user.kid}.bat`,
      tmpl = cms.db.getHtml('/template/template_AP_WinUserSet_KIDXXXXX.txt'),
      complied = _.template(tmpl),
      blob,
      data;
    data = {
      userkey: user.userkey,
      user_name: user.user_name,
      list: _getSelectItem(),
    };

    if (data.list.length < 1) { return; }

    // データ作成
    blob = util.makeTxt2Blob(complied(data));

    // ダウンロード
    util.downloadFile(this, blob, file_name);
  };

  _downloadDbUser = function () {
    let
      user = cms.model.userBaseInfo.getCache(),
      file_name = `DB_WinUserSet_${user.kid}.bat`,
      tmpl = cms.db.getHtml('/template/template_DB_WinUserSet_KIDXXXXX.txt'),
      complied = _.template(tmpl),
      blob,
      data,
      AP,
      DB;
    if (!user || !user.server) {
      cms.view.dialogAlert.open('接続先のAPサーバが設定しないため正常に作成できません');
      return;
    }

    AP = cms.model.servers.find({ name: user.server })[0];

    if (!AP || !AP.connect_db || !AP.connect_db === '') {
      cms.view.dialogAlert.open('接続先のDBサーバが存在しないため正常に作成できません');
      return;
    }

    DB = cms.model.servers.find({ name: AP.connect_db })[0];

    if (!DB || !DB.domain) {
      cms.view.dialogAlert.open('接続先のDBサーバにドメイン情報が設定されていないため正常に作成できません');
      return;
    }

    data = {
      userkey: user.userkey,
      user_name: user.user_name,
      list: _getSelectItem(),
      domain: DB.domain,
    };

    if (data.list.length < 1) {
      return;
    }

    // データ作成
    blob = util.makeTxt2Blob(complied(data));

    // ダウンロード
    util.downloadFile(this, blob, file_name);
  };

  _downloadPublicXenApps = function () {
    let
      user = cms.model.userBaseInfo.getCache(),
      file_name = `PublicXenApps_${user.kid}.ps1`,
      tmpl = cms.db.getHtml('/template/public_apps.txt'),
      complied = _.template(tmpl),
      blob;
    if (!user.server || !user.userkey) {
      cms.view.dialogAlert.open('接続先のAPサーバかユーザーキーが設定されていないため正常に作成できません');
      return;
    }

    // データ作成
    blob = util.makeTxt2Blob(complied({
      server: user.server,
      userkey: user.userkey,
    }));

    // ダウンロード
    util.downloadFile(this, blob, file_name);
  };

  _getSelectItem = function () {
    const ids = _.map($('.is-selected', clientView.top), (val, key) => ({ client_id: $(val).attr('id') }));

    if (ids.length === 0) {
      alert('選択されていません');
      return [];
    }

    return ids;
  };

  _setFenicsSelectValue = function () {
    let
      tr = clientView.get('table').find('tbody tr'),
      value;
    _.each(tr, (el, idx) => {
      value = cms.model.userClients.find({ client_id: $(el).attr('id') })[0].fenics_id;
      $(el).find('.select-clients').val(value);
    });
  };

  makeFenicsSelectBox = function () {
    let
      data = cms.model.userNetwork.find({ is_mobile: 0 }),
      option;
    clientView.get('select-clients').empty();

    // 空オプション作成
    clientView.get('select-clients').append($('<option>'));

    _.each(data, (v, k) => {
      option = $('<option>', { value: v.fenics_id, text: v.fenics_id });
      clientView.get('select-clients').append(option);
    });

    _setFenicsSelectValue();
  };


  _deleteClients = function () {
    const list_clients = _getSelectItem();

    if (list_clients && list_clients.length > 0) {
      customer.model.userClients.delete(list_clients)
        .then(() => {
          cms.view.homeNotices.refresh();
          cms.view.homeGraph.refresh();
          cms.view.kids.refresh();
          cms.view.userBaseInfo.refresh();
          cms.view.userClient.refresh();
        })
        .then(_backMode);
    }
  };

  _changeFenicsId = function (evt) {
    let
      el = $(evt.target),
      client_id = el.parents('tr').attr('id'),
      value = el.val()
    ;

    // コレクションの値を書き換える
    // これはモデルのしごとだ
    cms.model.userClients.find({ client_id })[0].fenics_id = value;

    cms.model.userClients.changeUpdateInfo(client_id);
  };

  _changeEndOn = function (evt) {
    let
      el = $(evt.target),
      client_id = el.parents('tr').attr('id'),
      value = el.val()
    ;

    // コレクションの値を書き換える
    // これはモデルのしごとだ
    cms.model.userClients.find({ client_id })[0].end_on = value;

    cms.model.userClients.changeUpdateInfo(client_id);
  };


  _save = function () {
    cms.model.userClients.update()
      .then((r) => { drawTable(r); })
      .then(cms.view.kids.refresh)
      .then(cms.view.userBaseInfo.refresh);
    _backMode();
  };

  _cancel = function () {
    _backMode();
    refresh();
  };

  drawTable = function (data) {
    var
      data = { list: data },
      tmpl = customer.db.getHtml('template/clients.html'),
      complied = _.template(tmpl);
    clientView.get('table')
      .empty()
      .append(complied(data));
    clientView.updateElement('table');
    clientView.updateElement('select-clients');
    clientView.updateElement('end_on');

    componentHandler.upgradeElement(clientView.get('table').find('table').get(0));

    makeFenicsSelectBox();
  };

  clear = function () {
    _.each(clientView.get('checkbox'), (val, key) => {
      if ($(val).hasClass('is-checked')) {
        $(val).trigger('click');
      }
    });

    // download状況を初期化
    _.each(clientView.get('download'), (val, key) => {
      $(val).attr('href', '#');
      $(val).removeAttr('download');
    });

    _backMode();
  };

  refresh = function () {
    const kids_id = cms.model.userBaseInfo.getCache().id;
    cms.model.userClients.fetch(kids_id, drawTable);
  };

  initModule = function () {
    // View挿入
    $('#usr-client-panel')
      .append(customer.db.getHtml('html/user.clients.html'));

    util.confirm({
      selector: '#usr-client-panel',
      id: 'delete-clients-confirm',
      msg: '選択したクライアントを削除しますか？',
      yes: _deleteClients,
    });

    clientView = new Controller('#usr-client-panel');
    clientView.initElement(elements);

    drawTable();

    clientView.addListener({
      'click btn__download': _openDialog,
      'click btn__close': _closeDialog,
      'click btn__exec': _execDowload,
      'click btn__delete': function () { clientView.get('dialog__delete').get(0).showModal(); },
      'click btn__edit': _goEditMode,
      'click btn__cancel': _cancel,
      'click btn__save': _save,
      'click download__client': _downloadIni,
      'click download__open_notice': _downloadOpenNotice,
      'click download__open_notice_add': _downloadOpenNoticeForAdd,
      'click download__citrix_user': _downloadCitrixUser,
      'click download__db_user': _downloadDbUser,
      'click download__public_xenapps': _downloadPublicXenApps,
      'click download__spla': function () { alert('download download__s'); },
      'click download__mail': function () { alert('download download__m'); },
      'change select-clients': _changeFenicsId,
      'change end_on': _changeEndOn,
    });
  };

  // to public
  cms.view.userClient = {
    initModule,
    drawTable,
    clear,
    refresh,
    makeFenicsSelectBox,
  };
}(jQuery, customer));

