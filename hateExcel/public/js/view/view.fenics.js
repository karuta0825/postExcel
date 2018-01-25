/**
 *
 */

( function ( $, cms) {

  var
  // member
    view
  , elements = {
      'btn' : {
        'delete'   : '.btn--del',
        'updates'  : '.btn--updates',
        'download' : '.btn--download',
        'listPage' : '.page_list',
        'nextPage' : '.next',
        'prevPage' : '.prev',
      },
      'dialog' : {
        'delete' : '#modal-delete-fenics'
      },
      'keyword' : '.keyword',
      'ip' : {
        'from' : '.ip_from',
        'to' : '.ip_to'
      },
      'isMobile' : '.isMobile',
      'wrap'        : '.fenics-wrap',
      'header'      : '.fenics-header',
      'action'      : '.fenics-action',
      'fenics-list' : '.fenics-list',
      'fenics-header' : 'th',
      'edit-icon'   : 'td.edit',
    }
  // private methos
  , _edit
  , _delete
  , _updates
  , _getSelectItem
  , _selectPage
  , _highlightIndexPage
  , _getViewInfo
  , _searchKeyword
  , _searchIps
  , _download
  , _onClickColumn
  // public method
  , drawTable
  , makePageButton
  , refresh
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

  _delete = function () {

    var list = _getSelectItem();

    if ( list.length < 1 ) {
      alert('削除するものを選択してください');
      return;
    }

    // Promiseを使ったループ削除
    cms.model.fenics.deletes( list )
    .then( function () {
      return cms.model.fenics.fetch()
    })
    .then( function (r) {
      drawTable(r);
    })

  };

  _updates = function () {

    var list = _getSelectItem();

    cms.view.dialogBulkFenics.open(list);

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

    cms.model.fenics.setFilterInfo('ip', { 'from' : from, 'to' : to });
    cms.model.fenics.filterIp( from, to );
    drawTable( cms.model.fenics.getCurrent() );

  };

  _searchKeyword = function () {
    var keyword = $(this).val();
    cms.model.fenics.setFilterInfo('search', keyword);
    cms.model.fenics.search(keyword);
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

  // TODO:更新前の表示画面まで戻す
  refresh = function () {

    var pageIndex = cms.model.fenics.getPageIndex();
    cms.model.fenics.fetch()
    .then( function () {
      cms.model.fenics.getFiltered();
      drawTable( cms.model.fenics.getPage(pageIndex) );
      makePageButton(cms.model.fenics.getPageList());
      _highlightIndexPage(pageIndex);
    });

  };

  initModule = function () {

    view = new Controller('.main-contents--view-fenics');

    view.wrap.append( customer.db.getHtml('html/fenics.html'));

    util.confirm({
      selector : '.main-contents--view-fenics',
      id       : 'modal-delete-fenics',
      msg      : '選択したものを削除しますか?',
      yes      : _delete
    });

    view.initElement( elements );

    cms.model.fenics.fetch()
    .then( function (r) {
      drawTable(r);
    });

    view.addListener({
      'click edit-icon'     : _edit,
      'click btn__delete'   : function () { view.get('dialog__delete').get(0).showModal(); },
      'click btn__updates'  : _updates,
      'click btn__download' : _download,
      'click btn__nextPage' : function () { cms.model.fenics.nextPage( drawTable );},
      'click btn__prevPage' : function () { cms.model.fenics.prevPage( drawTable );},
      'click btn__listPage' : _selectPage,
      'click fenics-header' : _onClickColumn,
      'keyup keyword'       : _searchKeyword,
      'keyup ip__from'      : _searchIps,
      'keyup ip__to'        : _searchIps
    });

  };

  // to public
  cms.view.fenics = {
    initModule : initModule,
    drawTable  : drawTable,
    refresh : refresh
  };

} ( jQuery, customer ));