/**
 * viewController
 * 新規ユーザー追加
 */
(function ($, cms) {
  let
  // member
    editView,
    elements = {
      btn: {
        back: '.btn--backList',
        'add-memo': '.memo-add',
        'filter-memo': '.mdl-chip.filter',
        'pre-user': '.mdl-button.pre',
        'next-user': '.mdl-button.next',
      },
      tab_bar: {
        'usr-base': 'a[href="#usr-base-panel"]',
        'usr-service': 'a[href="#usr-service-panel"]',
        'usr-client': 'a[href="#usr-client-panel"]',
        'usr-partner': 'a[href="#usr-partner-panel"]',
        'usr-network': 'a[href="#usr-network-panel"]',
        'usr-mobile': 'a[href="#usr-mobile-panel"]',
        'usr-history': 'a[href="#usr-history-panel"]',
      },
      tab_panel: {
        'usr-base': '#usr-base-panel',
        'usr-service': '#usr-service-panel',
        'usr-client': '#usr-client-panel',
        'usr-partner': '#usr-partner-panel',
        'usr-network': '#usr-network-panel',
        'usr-mobile': '#usr-mobile-panel',
        'usr-history': '#usr-history-panel',
      },
      memo: {
        select: '.filter',
        list: '.memo-list',
        items: '.memo-item',
        dialog: '#modal-memo-item',
      },
    },
    _openMemoDialog,
    _selectMemo,
    _filterMemo,
    _nextUser,
    _resetTab,
    backUserTable,
    makeMemos,
    open,
    clearView,
    clearMemoFilter,
    initModule,
    showMobile,
    hideMobile;


  _openMemoDialog = function () {
    editView.get('memo__dialog').get(0).showModal();
    cms.view.userMemo.reset();
  };

  _selectMemo = function (e) {
    let memo_id,
      memo;

    if ($(e.target).data('memo_id')) {
      memo_id = $(e.target).data('memo_id');
    } else {
      memo_id = $(e.target).parents('li').data('memo_id');
    }

    memo = cms.model.userMemo.find({ id: memo_id })[0];

    cms.view.userMemo.makeViewInfo(memo);

    // 更新モードに変更する
    cms.view.userMemo.changeEditMode(true);

    editView.get('memo__dialog').get(0).showModal();
  };

  _filterMemo = function (e) {
    const priority = $(e.target).val();

    cms.model.userMemo.find({ priority }, makeMemos);
  };

  _nextUser = function (is_next) {
    const
      kid = cms.model.userBaseInfo.getCache().kid,
      next = cms.model.kids.getNeighborUser(kid, is_next);
    if (next) { open(next.id, true); }
  };

  _resetTab = function (is_tab_fixed) {
    if (is_tab_fixed) {
      if (cms.model.userBaseInfo.getCache().has_mobile === 0 &&
        editView.get('tab_bar__usr-mobile').hasClass('is-active')
      ) {
        editView.get('tab_bar__usr-mobile').removeClass('is-active');
        editView.get('tab_panel__usr-mobile').removeClass('is-active');
        editView.get('tab_bar__usr-base').addClass('is-active');
        editView.get('tab_panel__usr-base').addClass('is-active');
      }
      return;
    }

    // タブ位置を消去
    _.each(editView.get('tab_bar'), (val, key) => {
      $(val).removeClass('is-active');
    });

    // タブパネル位置を消去
    _.each(editView.get('tab_panel'), (val, key) => {
      $(val).removeClass('is-active');
    });

    // タブ・タブパネルを基本情報に設定
    editView.get('tab_bar__usr-base').addClass('is-active');
    editView.get('tab_panel__usr-base').addClass('is-active');
  };

  open = function (kid, is_tab_fixed) {
    // ローディングダイアログ表示
    cms.view.dialogLoading.open();

    // 各タブの初期化
    clearView();

    // 基本情報タブ システム情報描画
    cms.model.userBaseInfo.fetch(kid, (data) => {
      cms.view.userBaseInfo.makeSystemInfo(data);
      cms.view.userBaseInfoContract.setViewInfo(data);
    });

    // 基本情報タブ 拠点情報作成描画
    cms.model.userCustomer.fetch(kid)
      .then((r) => {
        cms.view.userBaseInfo.makeCustomerInfo(r);
      })
      .then(() => cms.model.userNetwork.fetch(kid))
      .then((r) => {
      // ネットワークタブ描画
        cms.model.userNetwork.find(
          { is_mobile: 0 },
          cms.view.userFenics.drawTable,
        );

        // モバイルfenicsテーブル描画
        cms.model.userNetwork.find(
          { is_mobile: 1 },
          cms.view.userMobile.drawTable,
        );
      })
    // クライアントテーブル描画
      .then(() => cms.model.userClients.fetch(kid))
      .then((r) => {
        cms.view.userClient.drawTable(r);
      })
    // サービステーブル描画
      .then(() => cms.model.userLicense.fetch(kid))
      .then((r) => {
        cms.view.userService.setViewInfo(r);
      })
    // パートナータブの描画
      .then(() => cms.model.userPartner.fetch(kid))
      .then((r) => {
        cms.view.userPartner.setInfo(r);
      })
    // モバイルタブの描画
      .then(() => cms.model.userMobile.fetch(kid))
      .then((r) => {
        cms.view.userMobile.setInfo(r);
      })
    // 履歴タブの描画
      .then(() => cms.model.userHistory.fetch(kid))
      .then((r) => {
        cms.view.userHistory.drawTable(r);
        cms.view.userHistory.makeFilter();
      })
    // メモ一覧作成
      .then(() => cms.model.userMemo.fetch(kid))
      .then((r) => {
        cms.view.editUsrs.makeMemos(r);
      })
      .then(() => {
        _resetTab(is_tab_fixed);
        cms.view.dialogLoading.close();
      })
      .catch((e) => {
        _resetTab(is_tab_fixed);
        cms.view.dialogLoading.close();
      });

    cms.model.memoTemplate.getCache(cms.view.userMemo.makeTemplateOption);

    // ユニバ表示制御
    if (cms.model.userBaseInfo.getCache().has_fenics === 0) {
      cms.view.userNetwork.hideFenics();
    } else {
      cms.view.userNetwork.showFenics();
    }

    // ビジV表示制御
    if (cms.model.userBaseInfo.getCache().has_busiv === 0) {
      cms.view.userNetwork.hideBusiv();
    } else {
      const version = cms.model.userBaseInfo.getCache().version;
      cms.view.userNetwork.setVersion(version);
      cms.view.userNetwork.showBusiv();

      cms.model.userBusiv.fetch(kid)
        .then((r) => {
          if (version === 'LM') {
            cms.view.userBusiv.setViewInfo(r);
          } else {
            cms.view.userBusivES.setViewInfo(r);
          }
        });
    }

    // モバイル表示制御
    if (cms.model.userBaseInfo.getCache().has_mobile === 1) {
      cms.view.editUsrs.showMobile();
    } else {
      cms.view.editUsrs.hideMobile();
    }

    // タイトルの変更
    cms.shell.changeTitle(`${cms.model.userBaseInfo.getCache().kid
    } ${
      cms.model.userBaseInfo.getCache().user_name || ''}`);

    // クリックされたコンテンツにis-activeを付与
    $('.main-contents').removeClass('is-active');
    const target = '.main-contents--edit-usr';
    $(target).addClass('is-active');

    const fenics_key = cms.model.userBaseInfo.getCache().fenics_key;
    if (cms.model.kids.find({ fenics_key }).length > 1) {
      cms.view.userBaseInfo.alertFenics();
    }
  };


  backUserTable = function () {
    // 初期化
    clearView();

    _resetTab(false);

    // 現在画面を非表示
    $('.main-contents').removeClass('is-active');

    // クリックされたコンテンツにis-activeを付与
    const target = `.main-contents--${$(this).attr('href').slice(1)}`;
    $(target).addClass('is-active');
  };

  clearView = function () {
    // タイトルの初期化
    cms.shell.changeTitle();

    // 各タブの初期化
    cms.view.userBaseInfo.clear();
    cms.view.userService.clear();
    cms.view.userClient.clear();
    cms.view.userNetwork.clear();
    cms.view.userPartner.clear();
    cms.view.userMobile.clear();
  };

  clearMemoFilter = function () {
    editView.get('memo__select').val('all');
  };

  makeMemos = function (data) {
    if (data.length === 0) {
      editView.get('memo__items').remove();
      editView.updateElement({ memo__items: '.memo-item' });
      return;
    }

    var
      data = { list: data },
      tmpl = customer.db.getHtml('template/user.memo.html'),
      complied = _.template(tmpl);
    editView.get('memo__items').remove();
    editView.get('memo__list').append(complied(data));

    editView.updateElement({ memo__items: '.memo-item' });

    componentHandler.upgradeElement(editView.get('memo__list').get(0));
  };

  showMobile = function () {
    editView.get('tab_bar__usr-mobile').removeClass('is-hidden');
  };

  hideMobile = function () {
    editView.get('tab_bar__usr-mobile').addClass('is-hidden');
  };

  initModule = function () {
    // コンテンツの挿入
    $('.main-contents--edit-usr').append(customer.db.getHtml('html/edit.user.html'));

    // ビュー管理インスタンス
    editView = new Controller('.main-contents--edit-usr');
    editView.initElement(elements);

    // イベント登録
    editView.addListener({
      'click btn__back': backUserTable,
      'click btn__add-memo': _openMemoDialog,
      'click memo__items': _selectMemo,
      'change btn__filter-memo': _filterMemo,
      'click btn__pre-user': function () { _nextUser(false); },
      'click btn__next-user': function () { _nextUser(true); },
    });
  };

  cms.view.editUsrs = {
    initModule,
    open,
    makeMemos,
    clearView,
    clearMemoFilter,
    showMobile,
    hideMobile,
  };
}(jQuery, customer));
