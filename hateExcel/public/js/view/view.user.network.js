/**
 * ネットワークタブ
 * Fenics情報とビジV情報を包含する
 */

(function ($, cms) {
  let
    networkView,
    elements = {
      btn: {
        cancel: '.btn--cancel',
        save: '.btn--save',
        edit: '.btn--edit',
        download: '.btn--download',
        close: '.btn--close',
        exec: '.btn--exec',
      },
      checkbox: '.mdl-checkbox',
      download: {
        fenics: '.download--fenics',
      },
      dialog: {
        download: '#modal-network-download',
      },
      'is-checked': {
        fenics: '#modal-network-download .mdl-checkbox.fenics',
      },
    },
    _version,
    _execDowload,
    _downloadFile,
    _goEditMode,
    _save,
    _cancel,
    clear,
    setVersion,
    showBusiv,
    hideBusiv,
    refresh,
    initModule
  ;

  /**
   * 編集モード
   * TODO:セレクトボックス指定のためのPropertyを作る
   */
  _goEditMode = function () {
    // ボタン制御
    networkView.get('btn__edit').addClass('is-hidden');
    networkView.get('btn__download').addClass('is-hidden');
    networkView.get('btn__cancel').removeClass('is-hidden');
    networkView.get('btn__save').removeClass('is-hidden');

    cms.view.userBusiv.goEditMode();
    cms.view.userBusivES.goEditMode();
  };

  /**
   * 通常モードに戻る
   */
  _goViewMode = function () {
    // ボタン制御
    networkView.get('btn__edit').removeClass('is-hidden');
    networkView.get('btn__download').removeClass('is-hidden');
    networkView.get('btn__cancel').addClass('is-hidden');
    networkView.get('btn__save').addClass('is-hidden');

    cms.view.userBusiv.goViewMode();
    cms.view.userBusivES.goViewMode();
  };

  _execDowload = function () {
    // ダウンロード
    _.each(networkView.get('checkbox'), (val, key) => {
      if ($(val).hasClass('is-checked')) {
        $(val).find('a')[0].click();
      }
    });

    // 初期化
    clear();

    // // 閉じる
    networkView.get('dialog__download').get(0).close();
  };

  _downloadFile = function () {
    let
      csv_header = '"※update_flag[A:Add,M:modify,D:Delete] ",※Prefix,※user_label,init_password,id_group,access_control_group,start_date[ex.20091201],end_date[ex.20091231],comment1,comment2,comment3,"regist_terminal_flag[1:Pre-Reg,2:Auto-Reg,3:Approval]",card_line_no01[ex.09012345678],card_line_no02[ex.09012345678],card_line_no03[ex.09012345678],card_line_no04[ex.09012345678],card_line_no05[ex.09012345678],card_line_no06[ex.09012345678],card_line_no07[ex.09012345678],card_line_no08[ex.09012345678],card_line_no09[ex.09012345678],card_line_no10[ex.09012345678]',
      kid = cms.model.userBaseInfo.getCache().kid,
      file_name = `${new moment().format('YYYYMMDD')}_${kid}_fenicsAccount.csv`,
      list_checked = cms.view.userFenics.getSelectItem(),
      downloadMap,
      blob
    ;

    // 検索データがゼロのとき、処理終了
    if (list_checked.length < 1) {
      alert('選択されていません');
      return;
    }

    // 取得データからモデルにデータ検索
    downloadMap = cms.model.userNetwork.makeAccountMapList(list_checked);

    // データ作成
    blob = util.convertMap2Blob(downloadMap, csv_header);

    // ダウンロード
    util.downloadFile(this, blob, file_name);
  };


  /**
   * ビジV情報を更新するために必要
   */
  _save = function () {
    let
      busivInfo,
      cb_success,
      cb_fail;
    if (_version === 'LM') {
      busivInfo = cms.view.userBusiv.getViewInfo();
      cb_success = function (data) {
        cms.view.userBusiv.setViewInfo(data);
        _goViewMode();
      };
      cb_fail = cms.view.userBusiv.showError;
    } else {
      busivInfo = cms.view.userBusivES.getViewInfo();
      cb_success = function (data) {
        cms.view.userBusivES.setViewInfo(data);
        _goViewMode();
      };
      cb_fail = cms.view.userBusivES.showError;
    }

    cms.model.userBusiv.update(
      busivInfo,
      cb_success,
      cb_fail,
      _version,
    );
  };

  _cancel = function () {
    // 画面制御
    _goViewMode();

    // 最新データの取得・再描画
    refresh();
  };

  /**
   * 初期状態の戻す
   * チェック状態とボタンの情報を初期化してる
   */
  clear = function () {
    // チェックを外す
    cms.view.userFenics.releaseCheck();

    if (!cms.view.userBusiv.isHidden) {
      _goViewMode();
    }

    if (networkView.get('is-checked__fenics').hasClass('is-checked')) {
      networkView.get('is-checked__fenics').click();
    }
  };

  showBusiv = function () {
    if (_version === 'LM') {
      cms.view.userBusiv.show();
      cms.view.userBusivES.hide();
    } else {
      cms.view.userBusiv.hide();
      cms.view.userBusivES.show();
    }

    networkView.get('btn__edit').removeClass('is-hidden');
  };

  hideBusiv = function () {
    cms.view.userBusiv.hide();
    cms.view.userBusivES.hide();
    networkView.get('btn__edit').addClass('is-hidden');
  };

  /**
   * viewの更新
   */
  refresh = function () {
    cms.view.userFenics.refresh();

    cms.view.userBusiv.refresh();
  };

  setVersion = function (version) {
    _version = version;
  };

  initModule = function () {
    networkView = new Controller('#usr-network-panel');

    networkView.wrap.append(customer.db.getHtml('html/user.network.html'));

    networkView.initElement(elements);

    networkView.addListener({
      'click btn__download': function () { networkView.get('dialog__download').get(0).showModal(); },
      'click btn__close': function () { networkView.get('dialog__download').get(0).close(); },
      'click btn__exec': _execDowload,
      'click btn__edit': _goEditMode,
      'click btn__cancel': _cancel,
      'click btn__save': _save,
      'click download__fenics': _downloadFile,
    });
  };


  // to public
  cms.view.userNetwork = {
    initModule,
    clear,
    showBusiv,
    hideBusiv,
    showFenics() { cms.view.userFenics.show(); },
    hideFenics() { cms.view.userFenics.hide(); },
    setVersion,
    refresh,
  };
}(jQuery, customer));
