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
        'cancel'   : '.btn--cancel',
        'listPage' : '.page_list',
        'nextPage' : '.next',
        'prevPage' : '.prev',
        'searchIp' : '.search_ips'
      },
      'ip' : {
        'from' : '.ip_from',
        'to' : '.ip_to'
      },
      'wrap'        : '.fenics-wrap',
      'header'      : '.fenics-header',
      'action'      : '.fenics-action',
      'fenics-list' : '.fenics-list',
      'fenics-header' : 'th',
      'edit-icon'   : 'td.edit',
      'search' : '.search'
    }
  // private methos
  , _edit
  , _save
  , _cancel
  , _getSelectItem
  , _selectPage
  , _highlightIndexPage
  , _getViewInfo
  , _searchIps
  , _download
  , _onClickColumn
  // public method
  , drawTable
  , makePageButton
  , initModule
  ;

  _edit = function () {

    // クリックした要素
    var
      fenics_id = $(this).parents('tr').attr('id')
    , item
    ;

    item = cms.model.fenics.find({ 'fenics_id' : fenics_id })[0];

    cms.view.dialogFenics.open(item);

  };

  /**
   * 保存ボタン押下時の処理
   */
  _save = function () {
    cms.model.fenics.update( _getViewInfo(), _cancel, _showError );
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

  _selectPage = function (e) {

    var
      el = $(e.target)
    , page = Number(el.text())
    , is_button = el.hasClass('page')
    ;

    if ( is_button ) {
      cms.model.fenics.getPage(page, drawTable);
    }

  };

  _highlightIndexPage = function ( page_index ) {

    _.each( view.get('btn__listPage').find('.page'), function (v,k) {
      if ( Number($(v).text()) === page_index  ) {
        $(v).addClass('accent-font');
      }
    });

  };

  _searchIps = function () {

    var
      from = view.get('ip__from').val()
    , to = view.get('ip__to').val()
    ;

    cms.model.fenics.filterIp( from, to );
    drawTable( cms.model.fenics.getCurrent() );

  };

  _onClickColumn = function (e) {
    var
      list_class = $(e.target).attr('class').split(' ')
    , column = list_class[1]
    ;

    cms.model.fenics.setSortInfo(column);
    cms.model.fenics.sort(column);
    drawTable( cms.model.fenics.getCurrent() );
  };

  _download = function () {

    var
      ids      = _getSelectItem()
    , filename = new moment().format('YYYYMMDD') + '_Fenics_List.csv'
    , header   = 'no,kid,fenics_key,fenics_id,password,ip,開始日,終了日,モバイルフラグ,作成日'
    , data     = customer.model.fenics.getCache()
    , Blob
    ;

    if ( ids.length === 0 ) {
      alert('選択してください');
      return;
    }

    Blob = util.convertMap2Blob( data, header );

    // ダウンロード
    util.downloadFile( this, Blob, filename );

  };


  drawTable = function ( data ) {

    var
      data     = { list : data }
    , tmpl     = customer.db.getHtml('template/fenics.list.html')
    , complied = _.template( tmpl )
    , sort
    ;

    view.get('fenics-list')
    .empty()
    .append( complied(data) )
    ;

    view.updateElement('fenics-header');

    // set sort info into th element' class.
    _.each( cms.model.fenics.getSortInfo(), function (v,k) {
      if ( v !== '' ) {
        view.wrap.find('th.' + k).addClass(v);
      }
    });

    // MDL表示用に更新
    componentHandler.upgradeElement( view.get('fenics-list').find('table').get(0) );
    makePageButton(cms.model.fenics.getPageList());
    _highlightIndexPage( cms.model.fenics.getPageIndex() );

  };

  makePageButton = function (list) {

    var el;

    view.get('btn__listPage').empty();

    _.each( list, function (number,idx) {

      if ( number === '' ) {
        el = $('<span>', { 'text': '..' } );
      }
      else {
        el = $('<button>', {
          'class' : 'page mdl-button',
          'text': number
        });
      }
      view.get('btn__listPage').append(el);
    });
  };

  initModule = function () {

    view = new Controller('.main-contents--view-fenics');

    view.wrap.append( customer.db.getHtml('template/fenics.html'));

    view.initElement( elements );

    cms.model.fenics.fetch()
    .then( function (r) {
      drawTable(r);
    });

    view.addListener({
      'click edit-icon'     : _edit,
      'click btn__save'     : _save,
      'click btn__cancel'   : _cancel,
      'click btn__download' : _download,
      'click btn__nextPage' : function () { cms.model.fenics.nextPage( drawTable );},
      'click btn__prevPage' : function () { cms.model.fenics.prevPage( drawTable );},
      'click btn__listPage' : _selectPage,
      'click btn__searchIp' : _searchIps,
      'click fenics-header' : _onClickColumn,
      'keyup search' : function (e) { console.log(e.target.value)}
    });

  };

  // to public
  cms.view.fenics = {
    initModule : initModule,
    drawTable  : drawTable,
    test : function () { return view; }
  };

} ( jQuery, customer ));