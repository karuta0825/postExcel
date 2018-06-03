/**
 * fenics更新ダイアログ
 */

(function ($, cms) {
  let
  // member
    view,
    selectId,
    elements = {
      btn: {
        save: '.btn--save',
        cancel: '.btn--cancel',
        delete: '.btn--delete',
      },
      input: {
        fenics_id: '.fenics_id .input',
        password: '.password .input',
        pc_name: '.pc_name .input',
        fenics_ip: '.fenics_ip .input',
        start_on: '.start_on .input',
        end_on: '.end_on .input',
        category: '.category .input',
      },
      dialog: {
        delete: '#confirm-delete-fenics-account2',
        error: '#input-error-fenics-account',
      },
    },
    // private method
    _setViewInfo,
    _showError,
    _save,
    _delete,
    // public method
    open,
    close,
    getViewInfo,
    initModule
  ;

  /**
   * 入力エラーを部分を赤くし、ダイアログを表示する
   * @param  {Array}   list_err_key
   * @param  {Function} callback
   */
  _showError = function (list_err_key, callback) {
    _.each(view.get('input'), (val, key) => {
      val.find('.item-value').removeClass('is-error');
    });

    _.each(list_err_key, (v, k) => {
      view.get(`input__${v}`).addClass('is-error');
    });

    // エラーダイアログの表示
    if (typeof callback === 'function') {
      callback();
      return;
    }

    view.get('dialog__error').get(0).showModal();
  };

  _setViewInfo = function (data) {
    var data = _.clone(data);

    // input type date用にフォーマット
    data.start_on = moment(data.start_on).format('YYYY-MM-DD');
    data.end_on = moment(data.end_on).format('YYYY-MM-DD');

    // 値をセット
    _.each(view.get('input'), (v, k) => {
      v.val(data[k]);
    });

    // 編集対象のIDを設定
    selectId = data.fenics_id;
  };

  /**
   * 保存する
   * TODO: fenicsリストから使用したときにkids_idがなくてうまく動かない
   */
  _save = function () {
    cms.model.userNetwork.update(getViewInfo(), close, _showError)
      .then(() => {
        cms.model.userNetwork.find(
          { is_mobile: 0 },
          cms.view.userFenics.drawTable,
        );

        cms.model.userNetwork.find(
          { is_mobile: 1 },
          cms.view.userMobile.drawTable,
        );
      })
      .then(cms.view.kids.refresh)
      .then(cms.view.fenics.refresh)
    // fenicsリストから個別更新だとここでkids_idがなくて失敗する
      .then(cms.view.userHistory.refresh)
      .catch((r) => {
        console.log(r);
      });
  };

  /**
   * アカウントの削除
   */
  _delete = function () {
    cms.model.userNetwork.deleteFenics(selectId, close);
  };

  /**
   * 編集画面のデータを消してダイアログを閉じる
   */
  close = function () {
    // エラーの初期化
    _.each(view.get('input'), (val, key) => {
      val.removeClass('is-error');
    });

    // 画面データ消去
    _.each(view.get('input'), (v, k) => {
      v.val('');
    });

    view.wrap.get(0).close();
  };


  /**
   * ダイアログを開いて値を入れる
   */
  open = function (data) {
    // 値を画面にセット
    if (data && _.isObject(data)) {
      _setViewInfo(data);
    }

    // モーダル表示
    view.wrap.get(0).showModal();
  };

  /**
   * 編集画面から値を取得する
   */
  getViewInfo = function () {
    const result = {};

    _.each(view.get('input'), (v, k) => {
      result[k] = v.val();
    });

    return result;
  };

  initModule = function () {
    view = new Controller('#dialog-edit-fenics');

    util.confirm({
      selector: view.top,
      id: 'confirm-delete-fenics-account2',
      msg: '選択したユーザを削除しますか？',
      yes: _delete,
    });

    util.alert({
      selector: view.top,
      id: 'input-error-fenics-account',
      msg: '入力に誤りがあります',
    });

    view.initElement(elements);

    view.addListener({
      'click btn__save': _save,
      'click btn__cancel': close,
      'click btn__delete': function () { view.get('dialog__delete').get(0).showModal(); },
    });
  };

  cms.view.dialogFenics = {
    initModule,
    open,
    close,
    getViewInfo,
  };
}(jQuery, customer));
