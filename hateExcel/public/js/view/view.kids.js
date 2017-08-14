/**
 *  list users
 */

( function ( $, cms ) {

  var
  // member
    view
  , elements = {
      'filter' : {
        'search' : '.search',
        'system' : {
          'wrap'  : '.system .filter-item__body',
          'onpre' : '.btn--onpre',
          'cloud' : '.btn--cloud',
          'both'  : '.btn--onpre-cloud'
        },
        'version' : {
          'wrap' : '.version .filter-item__body',
          'LM'   : '.btn--LM',
          'ES'   : '.btn--ES',
          'both' : '.btn--ESLM'
        },
        'server' : '.select-servers',
        'network' : {
          'wrap'  : '.network .filter-item__body',
          'busiv' : '.btn--busiv',
          'univ'  : '.btn--univ',
          'both'  : '.btn--busivUniv'
        },
        'mobile' : {
          'wrap' : '.mobile .filter-item__body',
          'on'   : '.btn--mon',
          'off'  : '.btn--moff',
          'both' : '.btn--mon-off'
        }
      },
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
  , _selectSystem
  , _selectVertion
  , _selectNetwork
  , _selectMobileAvailable
  , _search
  , _getSelectItem
  , _deleteUser
  , _selectPage
  , _highlightIndexPage
  // public
  , initModule
  , makePageButton
  , drawTable
  , redrawTable
  , selectServer
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
          data = customer.model.kids.getFilter();
        break;
      case 'all' :
          data = customer.model.kids.getCache();
      default :
        break;
    }

    filename = new moment().format('YYYYMMDD') + '_KID_List.csv';
    header = 'id,';
    header += _.values( customer.model.kids.getHeader() ).join(',');
    Blob = util.convertMap2Blob( data, header );
    // ダウンロード
    util.downloadFile( view.get('download'), Blob, filename );
    view.get('download').get(0).click();

  };

  _search = function () {

    var keyword = $(this).val();
    cms.model.kids.search( keyword, drawTable );

  };

  _selectSystem = function ( event ) {

    var list_class = $( event.target ).attr('class').split(' ');

    switch ( list_class[1] ) {
      case 'btn--onpre' :
        view.get('filter__system__onpre').addClass('btn--on');
        view.get('filter__system__cloud').removeClass('btn--on');
        view.get('filter__system__both' ).removeClass('btn--on');
        customer.model.kids.setCondition( { 'system_type' : 'onpre' }, drawTable );
        break;
      case 'btn--cloud' :
        view.get('filter__system__onpre').removeClass('btn--on');
        view.get('filter__system__cloud').addClass('btn--on');
        view.get('filter__system__both' ).removeClass('btn--on');
        customer.model.kids.setCondition( { 'system_type' : 'cloud' }, drawTable );
        break;
      case 'btn--onpre-cloud' :
        view.get('filter__system__onpre').removeClass('btn--on');
        view.get('filter__system__cloud').removeClass('btn--on');
        view.get('filter__system__both' ).addClass('btn--on');
        customer.model.kids.setCondition( { 'system_type' : 'all'}, drawTable );
        break;
      default:
        break;
    }

  };

  /**
   * クラス化できるメソッドですね
   */
  _selectVertion = function ( event ) {

    var list_class = $( event.target ).attr('class').split(' ');

    switch ( list_class[1] ) {
      case 'btn--ES' :
        view.get('filter__version__ES').addClass('btn--on');
        view.get('filter__version__LM').removeClass('btn--on');
        view.get('filter__version__both').removeClass('btn--on');
        customer.model.kids.setCondition( {'version' : 'ES', 'server' : 'all' }, drawTable );
        // 選択サーバ変更
        selectServer('ES');
        break;
      case 'btn--LM' :
        view.get('filter__version__ES').removeClass('btn--on');
        view.get('filter__version__LM').addClass('btn--on');
        view.get('filter__version__both').removeClass('btn--on');
        customer.model.kids.setCondition( { 'version' : 'LM', 'server' : 'all' }, drawTable );
        // 選択サーバ変更
        selectServer('LM');
        break;
      case 'btn--ESLM' :
        view.get('filter__version__ES').removeClass('btn--on');
        view.get('filter__version__LM').removeClass('btn--on');
        view.get('filter__version__both').addClass('btn--on');
        customer.model.kids.setCondition( { 'version' : 'all', 'server' : 'all'}, drawTable );
        //
        selectServer('all');
        break;
      default:
        break;
    }

  };

  _selectMobileAvailable = function ( event ) {

    var list_class = $(event.target).attr('class').split(' ');

    switch ( list_class[1] ) {
      case 'btn--mon' :
        view.get('filter__mobile__on').addClass('btn--on');
        view.get('filter__mobile__off').removeClass('btn--on');
        view.get('filter__mobile__both').removeClass('btn--on');
        customer.model.kids.setCondition( {'has_mobile' : 1 }, drawTable );
        break;
      case 'btn--moff' :
        view.get('filter__mobile__on').removeClass('btn--on');
        view.get('filter__mobile__off').addClass('btn--on');
        view.get('filter__mobile__both').removeClass('btn--on');
        customer.model.kids.setCondition( { 'has_mobile' : 0 }, drawTable );
        break;
      case 'btn--mon-off' :
        view.get('filter__mobile__on').removeClass('btn--on');
        view.get('filter__mobile__off').removeClass('btn--on');
        view.get('filter__mobile__both').addClass('btn--on');
        customer.model.kids.setCondition( { 'has_mobile' : 'all' }, drawTable );
        break;
      default:
        break;
    }

  };

  /**
   * ネットワークのフィルター
   * @param  {Event} event
   * TODO: viewに仕事させすぎなのでモデルでできないか！
   */
  _selectNetwork = function ( event ) {

    var list_class = $( event.target ).attr('class').split(' ');

    switch ( list_class[1] ) {
      case 'btn--busiv' :

        view.get('filter__network__busiv').toggleClass('btn--on');
        view.get('filter__network__both').removeClass('btn--on');

        if ( view.get('filter__network__busiv').hasClass('btn--on') ) {
          cms.model.kids.setCondition( { 'has_busiv' : 1 } );
        }
        else {
          cms.model.kids.setCondition( { 'has_busiv' : 0 } );
        }

        if ( view.get('filter__network__univ').hasClass('btn--on') ) {
          cms.model.kids.setCondition( { 'has_fenics' : 1 } );
        }
        else {
          cms.model.kids.setCondition( { 'has_fenics' : 0 } );
        }

        cms.model.kids.getCondition( drawTable );

        break;
      case 'btn--univ' :
        view.get('filter__network__univ').toggleClass('btn--on');
        view.get('filter__network__both').removeClass('btn--on');

        if ( view.get('filter__network__busiv').hasClass('btn--on') ) {
          cms.model.kids.setCondition( { 'has_busiv' : 1 } );
        }
        else {
          cms.model.kids.setCondition( { 'has_busiv' : 0 } );
        }

        if ( view.get('filter__network__univ').hasClass('btn--on') ) {
          cms.model.kids.setCondition( { 'has_fenics' : 1 } );
        }
        else {
          cms.model.kids.setCondition( { 'has_fenics' : 0 } );
        }

        cms.model.kids.getCondition( drawTable );

        break;
      case 'btn--busivUniv' :

        if ( view.get('filter__network__both').hasClass('btn--on') ) {

          view.get('filter__network__both').removeClass('btn--on');

          if ( view.get('filter__network__busiv').hasClass('btn--on') ) {
            cms.model.kids.setCondition( { 'has_busiv' : 1 } );
          }
          else {
            cms.model.kids.setCondition( { 'has_busiv' : 0 } );
          }

          if ( view.get('filter__network__univ').hasClass('btn--on') ) {
            cms.model.kids.setCondition( { 'has_fenics' : 1 } );
          }
          else {
            cms.model.kids.setCondition( { 'has_fenics' : 0 } );
          }

          cms.model.kids.getCondition( drawTable );

        }
        else {
          view.get('filter__network__both').addClass('btn--on');
          cms.model.kids.setCondition( { 'has_fenics' : 'all', 'has_busiv' : 'all' }, drawTable );
        }
        break
      default:
        break;
    }

  };

  selectServer = function ( version ) {

    var filtered = customer.model.servers.find({ 'version' : version, type : 'AP' });
    var select =  util.addOption( filtered, $('.select-servers') );
    $('.filter-item.servers .filter-item__body').append( select );

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
    cms.view.home.refresh();

    // _closeDialog();

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
    });

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

    // サーバー選択肢作成
    selectServer( 'all' );

    view.addListener({
      'change filter__server'       : function () { customer.model.kids.setCondition( { server : $(this).val() }, drawTable );},
      'click btn__delete'           : function () { view.get('dialog__delete').get(0).showModal(); },
      'click btn__download'         : function () { view.get('dialog__download').get(0).showModal(); },
      'click btn__nextPage'         : function () { cms.model.kids.nextPage( drawTable ); },
      'click btn__prevPage'         : function () { cms.model.kids.prevPage( drawTable ); },
      'click btn__listPage'         : _selectPage,
      'click btn__closeDownload'    : function () { view.get('dialog__download').get(0).close(); },
      'click btn__execDownload'     : _onClickDownload,
      'change filter__search'       : _search,
      'click filter__system__wrap'  : _selectSystem,
      'click filter__version__wrap' : _selectVertion,
      'click filter__network__wrap' : _selectNetwork,
      'click filter__mobile__wrap'  : _selectMobileAvailable,
      'click table__body'           : _onClickKid,
      'click table__header'         : _onClickColumn
    });

  };

  // to public
  cms.view.kids = {
    initModule      : initModule,
    drawTable       : drawTable,
    refresh         : refresh,
    selectServer    : selectServer,
    tmp             : function () { return view; }
  };


}( jQuery, customer ));