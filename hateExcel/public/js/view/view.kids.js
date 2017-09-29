/**
 *  list users
 */

( function ( $, cms ) {

  var
  // member
    view
  , elements = {
      'btn' : {
        'delete'        : '.btn--del',
        'download'      : '.btn--download',
        'nextPage'      : '.next',
        'prevPage'      : '.prev',
        'listPage'      : '.page_list',
        'closeDownload' : '.btn--close',
        'execDownload'  : '.btn--exec'
      },
      'download' : '.download--kids',
      'dialog' : {
        'download' : '#modal-kids-download',
        'delete'   : '#modal-delete-user'
      },
      'table' : {
        'wrap'   : '.users-table__body',
        'self'   : '.users-table__body table',
        'header' : '.users-table__body th.mdl-data-table__cell--non-numeric',
        'body'   : '.users-table__body tbody',
        'row'    : '.users-table__body tbody tr'
      }
    }
  // private
  , _hideCol
  , _setColInfo
  , _onClickColumn
  , _onClickKid
  , _onClickDownload
  , _getSelectItem
  , _deleteUser
  , _selectPage
  , _highlightIndexPage
  // public
  , changeColumnState
  , initModule
  , makePageButton
  , drawTable
  , redrawTable
  , refresh
  ;

  _setColInfo = function () {

    var obj;

    _.each( cms.model.kids.getHeader(), function (v,k) {
      obj = {};
      obj['table__col__' + k ] = '.users-table__body .' + k ;
      view.addElement(obj);
    });

  };

  _hideCol = function () {

    view.get('table__col__kana'         ).addClass('is-hidden');
    view.get('table__col__license'      ).addClass('is-hidden');
    view.get('table__col__system_type'  ).addClass('is-hidden');
    view.get('table__col__version'      ).addClass('is-hidden');
    view.get('table__col__has_mobile'   ).addClass('is-hidden');
    view.get('table__col__has_busiv'    ).addClass('is-hidden');
    view.get('table__col__has_fenics'   ).addClass('is-hidden');
    view.get('table__col__is_registered').addClass('is-hidden');
    view.get('table__col__register_on'  ).addClass('is-hidden');
    view.get('table__col__sa_company'   ).addClass('is-hidden');
    view.get('table__col__sa_name'      ).addClass('is-hidden');
    view.get('table__col__sa_tel'       ).addClass('is-hidden');
    view.get('table__col__sa_email'     ).addClass('is-hidden');
    view.get('table__col__se_company'   ).addClass('is-hidden');
    view.get('table__col__se_name'      ).addClass('is-hidden');
    view.get('table__col__se_tel'       ).addClass('is-hidden');
    view.get('table__col__se_email'     ).addClass('is-hidden');
    view.get('table__col__em_company'   ).addClass('is-hidden');
    view.get('table__col__em_name'      ).addClass('is-hidden');
    view.get('table__col__em_tel'       ).addClass('is-hidden');
    view.get('table__col__em_email'     ).addClass('is-hidden');

  };

  _onClickColumn = function () {

    column_class_name = $(this).attr('class').split(' ')[1];
    customer.model.kids.sortByCol( column_class_name, redrawTable );

  };

  _onClickKid = function ( e ) {

    var
      target = $(e.target)
    , kids_id
    ;

    if ( !target.hasClass('kid') ) {
      return;
    }

    kids_id = $(e.target).parents('tr').attr('id');
    cms.view.editUsrs.open(kids_id);

  };


  _onClickDownload = function () {
    // 確認ダイアログを表示させる
    var
      type = view.get('dialog__download').find('.is-checked').attr('for')
    , filename
    , header
    , data
    , Blob
    ;

    switch ( type ) {
      case 'only-checked' :
          data = customer.model.kids.find( _getSelectItem() );
        break;
      case 'filtered' :
          data = customer.model.kids.getConditionAll();
        break;
      case 'all' :
          data = customer.model.kids.getCache();
      default :
        break;
    }

    var order = [
    'kid','user_name','server','userkey','db_password',
    'fenics_key','client_number','number_pc','number_id','range_id',
    'license','has_qa','has_busiv','mobile_number', 'register_on',
    'sa_company', 'sa_name','sa_tel', 'sa_email',
    'se_company','se_name', 'se_tel','se_email',
    'em_company','em_name','em_tel','em_email'];

    filename = new moment().format('YYYYMMDD') + '_KID_List.csv';
    header = _.chain( customer.model.kids.getHeader() ).pick(order).values().value();
    data   = _.map( data, function (v,k) { return _.pick(v, order ) } );
    Blob = util.convertMap2Blob( data, header );
    // ダウンロード
    util.downloadFile( view.get('download'), Blob, filename );
    view.get('download').get(0).click();

  };

  _getSelectItem = function () {

    // まずい指定が弱い
    var ids = _.map( $('.is-selected'), function (val,key){
      return { 'id' : Number($(val).attr('id')) } ;
    });

    if ( ids.length === 0 ) {
      alert('選択されていません');
      return;
    }

    return ids;

  };

  _deleteUser = function () {
    // modelを使ったデリート
    var list_delete = _getSelectItem();

    if ( list_delete ) {
      customer.model.kids.delete( list_delete );
    }

    cms.view.kids.refresh();
    cms.view.homeNotices.refresh();

  };

  _highlightIndexPage = function ( page_index ) {

    _.each( view.get('btn__listPage').find('.page'), function (v,k) {
      if ( Number($(v).text()) === page_index  ) {
        $(v).addClass('accent-font');
      }
    });

  };

  _selectPage = function (e) {

    var
      el = $(e.target)
    , page = Number(el.text())
    , is_button = el.hasClass('page')
    ;

    if ( is_button ) {
      cms.model.kids.getPage(page, drawTable);
    }

  };

  /**
   * ページ番号のボタンや..を作る
   * @param  {Array} list - 表示するページ番号リスト
   */
  makePageButton = function ( list ) {


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


  drawTable = function ( data ) {

    if ( data === null ) {
      return;
    }

    var
      content  = { list : null }
    , header   = customer.model.kids.getHeader()
    , body     = data
    , tmpl     = customer.db.getHtml('template/kids.list.html')
    , complied = _.template( tmpl )
    ;

    delete header.uid;
    content.list = {
      header : header,
      body   : body
    };

    view.get('table__wrap').empty();
    view.get('table__wrap').append( complied(content) );

    view.updateElement('table__self');
    view.updateElement('table__header');
    view.updateElement('table__body');
    view.updateElement('table__row');
    _setColInfo();

    componentHandler.upgradeElement( view.get('table__self').get(0) );

    cms.model.kids.getPageList( makePageButton );
    _highlightIndexPage( cms.model.kids.getPageIndex() );

    _hideCol();

  };

  /**
   * 並び替えによる再描画処理
   * 行数が変わらないことがポイント
   */
  redrawTable = function ( col, data ) {

    var headerMap = customer.model.kids.getHeader();

    delete headerMap.uid;

    _.each( view.get('table__row'), function ( val, key) {
      // idだけは個別処理
        $(val).attr('id', data[key].id );

      // 各々の列の値をクリアしてソートした値をセット
      _.each( headerMap, function ( v, k ) {

        if ( k === 'is_marked') {
          if ( data[key][k] === '0' ) {
            $(val).find('.' + k).empty();
          }
          else {
            $(val).find('.' + k).empty().html('<i class="material-icons">star</i>');
          }
          return;
        }

        $(val).find('.' + k).empty().append( data[key][k] );

      });

    });

    cms.model.kids.getPage(1);
    cms.model.kids.getPageList( makePageButton );
    _highlightIndexPage(cms.model.kids.getPageIndex());

  };

  refresh = function () {

    cms.model.kids.fetch( null, function () {
      cms.model.kids.getCondition( drawTable );
      cms.view.userBaseInfo.refresh();
    });

  };

  changeColumnState = function ( column, is_show ) {

    var col = 'table__col__' + column;

    if ( is_show ) {
      view.get(col).removeClass('is-hidden');
    }
    else {
      view.get(col).addClass('is-hidden');
    }

  };

  initModule = function () {
    // table load
    $('.main-contents--view-usr').append( customer.db.getHtml('html/list.users.html') );

    // ダイアログ作成
    util.confirm({
      selector : '.main-contents--view-usr',
      id       : 'modal-delete-user',
      msg      : '選択したユーザーを削除しますか?',
      yes      : _deleteUser
    });

    view = new Controller('.main-contents--view-usr');
    view.initElement(elements);

    cms.model.kids.initModule();
    cms.model.kids.fetch( null, drawTable );

    view.addListener({
      'click btn__delete'           : function () { view.get('dialog__delete').get(0).showModal(); },
      'click btn__download'         : function () { view.get('dialog__download').get(0).showModal(); },
      'click btn__nextPage'         : function () { cms.model.kids.nextPage( drawTable ); },
      'click btn__prevPage'         : function () { cms.model.kids.prevPage( drawTable ); },
      'click btn__listPage'         : _selectPage,
      'click btn__closeDownload'    : function () { view.get('dialog__download').get(0).close(); },
      'click btn__execDownload'     : _onClickDownload,
      'click table__body'           : _onClickKid,
      'click table__header'         : _onClickColumn
    });

  };

  // to public
  cms.view.kids = {
    initModule      : initModule,
    drawTable       : drawTable,
    refresh         : refresh,
    changeColumnState : changeColumnState
  };


}( jQuery, customer ));