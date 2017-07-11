/**
 *
 */

( function ( $, cms) {

  var
  // member
    view
  , elements = {
      'btn' : {
        'download' : '.btn--download',
        'save'     : '.btn--save',
        'cancel'   : '.btn--cancel'
      },
      'wrap'        : '.fenics-wrap',
      'header'      : '.fenics-header',
      'action'      : '.fenics-action',
      'fenics-list' : '.fenics-list',
      'edit-icon'   : 'td.edit',
      'dialog'      : {
        'edit'   : '#edit-fenics-item',
        'error'  : '#dialog-fenics-edit-error'
      },
      'input'       : {
        'fenics_id' : '.fenics_id .input',
        'password'  : '.password .input',
        'fenics_ip' : '.fenics_ip .input',
        'start_on'  : '.start_on .input',
        'end_on'    : '.end_on .input'
      }
    }
  // private methos
  , _showError
  , _edit
  , _save
  , _cancel
  , _getSelectItem
  , _getViewInfo
  , _download
  // public method
  , drawTable
  , initModule
  ;

  _showError = function ( err_keys ) {

    _.each( view.get('input'), function (val, key){
      val.find('.item-value').removeClass('is-error');
    });

    _.each( err_keys, function ( v,k ) {
      view.get('input__' + v ).addClass('is-error');
    });

    view.get('dialog__error').get(0).showModal();

  };

  _edit = function () {

    // クリックした要素
    var
      fenics_id = $(this).parents('tr').attr('id')
    , item
    ;

    item = cms.model.fenics.find({ 'fenics_id' : fenics_id })[0];

    // input type date用にフォーマット
    item['start_on'] = moment(item['start_on']).format('YYYY-MM-DD');
    item['end_on'] = moment(item['end_on']).format('YYYY-MM-DD');

    _.each( view.get('input'), function (v,k) {
      v.val( item[k] );
    });

    // モーダル表示
    view.get('dialog__edit').get(0).showModal();

  };

  /**
   * 保存ボタン押下時の処理
   */
  _save = function () {

    // 更新
    cms.model.fenics.update( _getViewInfo(), _cancel, _showError );


  };

  /**
   * キャンセルボタン押下時の処理
   */
  _cancel = function () {

    // エラーの初期化
    _.each( view.get('input'), function (val, key){
      val.removeClass('is-error');
    });

    view.get('dialog__edit').get(0).close();

    // 画面データ消去
    _.each( view.get('input'), function (v,k) {
      v.val('');
    });

  };

  /**
   * チェックされている対象を取得する
   * @return {Array} ids - fenicsIdのオブジェクト配列
   */
  _getSelectItem = function () {

    var ids = _.map( $('.is-selected', view.top ), function (val,key){
      return { 'fenics_id' : $(val).attr('id') } ;
    });

    return ids;

  };

  _getViewInfo = function () {

    var result = {};

    _.each( view.get('input'), function (v,k) {
      result[k] = v.val();
    });

    return result;

  };

  _download = function () {

    var
      ids      = _getSelectItem()
    , filename = new moment().format('YYYYMMDD') + '_Fenics_List.csv'
    , header   = 'no,kid,fenics_key,fenics_id,password,ip,開始日,終了日,モバイルフラグ,作成日'
    // , data     = customer.model.fenics.find( ids )
    , data     = customer.model.fenics.getCache()
    , Blob
    ;

    // if ( ids.length === 0 ) {
    //   alert('選択してください');
    //   return;
    // }

    Blob = util.convertMap2Blob( data, header );

    // ダウンロード
    util.downloadFile( this, Blob, filename );

  };


  drawTable = function ( data ) {

    var
      data     = { list : data }
    , tmpl     = customer.db.getHtml('template/fenics.list.html')
    , complied = _.template( tmpl )
    ;

    // 空にして
    view.get('fenics-list').empty();

    // 詰めて
    view.get('fenics-list').append( complied(data) );

    // MDL表示用に更新
    componentHandler.upgradeElement( view.get('fenics-list').find('table').get(0) );

  };

  initModule = function () {

    view = new Controller('.main-contents--view-fenics');

    view.wrap.append( customer.db.getHtml('template/fenics.html'));

    util.alert({
      selector : view.top,
      id       : 'dialog-fenics-edit-error',
      msg      : '入力に誤りがあります'
    });

    view.initElement( elements );

    cms.model.fenics.fetch( null, drawTable );

    view.addListener({
      'click edit-icon'     : _edit,
      'click btn__save'     : _save,
      'click btn__cancel'   : _cancel,
      'click btn__download' : _download
    });

  };

  // to public
  cms.view.fenics = {
    initModule : initModule,
    drawTable  : drawTable
  };

} ( jQuery, customer ));