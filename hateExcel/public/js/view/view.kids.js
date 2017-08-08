/**
 *  list users
 */

( function ( $, cms ) {

  var
  // member
    jqueryMap = {}
  // private
  , _setJqueryMap
  , _hideCol
  , _drawHead
  , _drawBody
  , _onClickColumn
  , _onClickKid
  , _onClickDownload
  , _selectSystem
  , _selectVertion
  , _selectNetwork
  , _selectMobileAvailable
  , _getSelectItem
  , _deleteUser
  , _selectPage
  , _highlightIndexPage
  // public
  , initModule
  , makePageButton
  , moveUserDetail
  , drawTable
  , redrawTable
  , regenerateTable
  , selectServer
  , refresh
  ;

  /**
   * DOMキャッシュ生成
   */
  _setJqueryMap = function ( map ) {
    var
      content = $('.main-contents--view-usr')
      filter  = content.find('.main-contents__filter')
    , table   = content.find('table')
    , header  = content.find('thead')
    , body    = content.find('tbody')
    ;

    // update dom cache
    if ( map ) {
      if ( ! _.isObject(map) ) { return false; }
      _.each( map, function ( val, key ) {
        if ( jqueryMap.hasOwnProperty(key) ) {
          jqueryMap[key] = content.find(val);
        }
      });
    }
    // new cache
    else {
      jqueryMap.tableWraper  = content.find('.users-table__body');

      jqueryMap.btnOnpre      = filter.find('.btn--onpre');
      jqueryMap.btnCloud      = filter.find('.btn--cloud');
      jqueryMap.btnOnpreCloud = filter.find('.btn--onpre-cloud');
      jqueryMap.btnSystem     = filter.find('.system .filter-item__body');

      jqueryMap.btnLM        = filter.find('.btn--LM');
      jqueryMap.btnES        = filter.find('.btn--ES');
      jqueryMap.btnESLM      = filter.find('.btn--ESLM');
      jqueryMap.btnVersion   = filter.find('.version .filter-item__body');

      jqueryMap.btnBusiv  = filter.find('.btn--busiv');
      jqueryMap.btnUniv = filter.find('.btn--univ');
      jqueryMap.btnBusivUniv = filter.find('.btn--busivUniv');
      jqueryMap.btnNetwork = filter.find('.network .filter-item__body');

      jqueryMap.btnMobileOn  = filter.find('.btn--mon');
      jqueryMap.btnMobileOff = filter.find('.btn--moff');
      jqueryMap.btnMobileOnOff = filter.find('.btn--mon-off')
      jqueryMap.btnMobile = filter.find('.mobile .filter-item__body');

      jqueryMap.dialog = content.find('#modal-delete-user');
      jqueryMap.btnDialogOk = content.find('dialog .btn--exec');
      jqueryMap.btnDialogCancel = content.find('dialog .btn--cancel');

      jqueryMap.btnPrev     = content.find('.prev');
      jqueryMap.btnNext     = content.find('.next');
      jqueryMap.pageList    = content.find('.page_list');
      jqueryMap.search      = filter.find('.search');


      jqueryMap.btnDel      = content.find('.btn--del');
      jqueryMap.btnDownload = content.find('.btn--download');
      jqueryMap.table       = table;
      jqueryMap.thead       = table.find('thead');
      jqueryMap.tbody       = table.find('tbody');
      jqueryMap.row         = table.find('tr');


      jqueryMap.header = table.find('th.mdl-data-table__cell--non-numeric');
      jqueryMap.body   = {};
      jqueryMap.col    = {};

      _.each( customer.model.kids.getHeader(), function ( val, key ) {
        jqueryMap.body[key]   = body.find(   '.' + key );
        jqueryMap.col[key]    = table.find(  '.' + key );
      });
    }

  };


  _drawHead = function ( data ) {
    var
      data     = { headerMap : data }
    , tmpl     = customer.db.getHtml('template/kids.head.html')
    , complied = _.template( tmpl )
    ;

    delete data.headerMap.uid;

    jqueryMap.thead.append( complied( data ) );

  };

  _drawBody = function ( data ) {

    var data, tmpl, complied;

    data     = { list : data };
    tmpl     = customer.db.getHtml('template/kids.body.html');
    complied = _.template( tmpl );


    if ( data.list.length < 1 ) {
      return;
    }

    jqueryMap.tbody.append( complied( data ) );

  };

  _hideCol = function () {
    jqueryMap.col['kana'         ].addClass('is-hidden');
    jqueryMap.col['license'      ].addClass('is-hidden');
    jqueryMap.col['system_type'  ].addClass('is-hidden');
    jqueryMap.col['version'      ].addClass('is-hidden');
    jqueryMap.col['has_mobile'   ].addClass('is-hidden');
    jqueryMap.col['has_busiv'    ].addClass('is-hidden');
    jqueryMap.col['has_fenics'   ].addClass('is-hidden');
    jqueryMap.col['is_registered'].addClass('is-hidden');
    jqueryMap.col['register_on'  ].addClass('is-hidden');
    jqueryMap.col['sa_company'   ].addClass('is-hidden');
    jqueryMap.col['sa_name'      ].addClass('is-hidden');
    jqueryMap.col['sa_tel'       ].addClass('is-hidden');
    jqueryMap.col['sa_email'     ].addClass('is-hidden');
    jqueryMap.col['se_company'   ].addClass('is-hidden');
    jqueryMap.col['se_name'      ].addClass('is-hidden');
    jqueryMap.col['se_tel'       ].addClass('is-hidden');
    jqueryMap.col['se_email'     ].addClass('is-hidden');
    jqueryMap.col['em_company'   ].addClass('is-hidden');
    jqueryMap.col['em_name'      ].addClass('is-hidden');
    jqueryMap.col['em_tel'       ].addClass('is-hidden');
    jqueryMap.col['em_email'     ].addClass('is-hidden');
  };

  _onClickColumn = function () {

    column_class_name = $(this).attr('class').split(' ')[1];
    customer.model.kids.sortByCol( column_class_name, redrawTable );

  };

  _onClickKid = function () {

    var kids_id = $(this).parents('tr').attr('id');

    cms.view.editUsrs.open(kids_id);

  };


  _onClickDownload = function () {
    // 確認ダイアログを表示させる

    // 対象を取得
    var ids = _getSelectItem();

    var filename = new moment().format('YYYYMMDD') + '_KID_List.csv';
    var header = 'id,';
    var data = customer.model.kids.find( ids );
    header += _.values( customer.model.kids.getHeader() ).join(',');
    var Blob = util.convertMap2Blob( data, header );
    // ダウンロード
    util.downloadFile( this, Blob, filename );

  };

  _selectSystem = function ( event ) {

    var list_class = $( event.target ).attr('class').split(' ');

    switch ( list_class[1] ) {
      case 'btn--onpre' :
        jqueryMap.btnOnpre.addClass('btn--on');
        jqueryMap.btnCloud.removeClass('btn--on');
        jqueryMap.btnOnpreCloud.removeClass('btn--on');
        customer.model.kids.setCondition( { 'system_type' : 'onpre' }, regenerateTable );
        break;
      case 'btn--cloud' :
        jqueryMap.btnOnpre.removeClass('btn--on');
        jqueryMap.btnCloud.addClass('btn--on');
        jqueryMap.btnOnpreCloud.removeClass('btn--on');
        customer.model.kids.setCondition( { 'system_type' : 'cloud' }, regenerateTable );
        break;
      case 'btn--onpre-cloud' :
        jqueryMap.btnOnpre.removeClass('btn--on');
        jqueryMap.btnCloud.removeClass('btn--on');
        jqueryMap.btnOnpreCloud.addClass('btn--on');
        customer.model.kids.setCondition( { 'system_type' : 'all'}, regenerateTable );
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
        jqueryMap.btnES.addClass('btn--on');
        jqueryMap.btnLM.removeClass('btn--on');
        jqueryMap.btnESLM.removeClass('btn--on');
        customer.model.kids.setCondition( {'version' : 'ES', 'server' : 'all' }, regenerateTable );
        // 選択サーバ変更
        selectServer('ES');
        break;
      case 'btn--LM' :
        jqueryMap.btnES.removeClass('btn--on');
        jqueryMap.btnLM.addClass('btn--on');
        jqueryMap.btnESLM.removeClass('btn--on');
        customer.model.kids.setCondition( { 'version' : 'LM', 'server' : 'all' }, regenerateTable );
        // 選択サーバ変更
        selectServer('LM');
        break;
      case 'btn--ESLM' :
        jqueryMap.btnES.removeClass('btn--on');
        jqueryMap.btnLM.removeClass('btn--on');
        jqueryMap.btnESLM.addClass('btn--on');
        customer.model.kids.setCondition( { 'version' : 'all', 'server' : 'all'}, regenerateTable );
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
        jqueryMap.btnMobileOn.addClass('btn--on');
        jqueryMap.btnMobileOff.removeClass('btn--on');
        jqueryMap.btnMobileOnOff.removeClass('btn--on');
        customer.model.kids.setCondition( {'has_mobile' : 1 }, regenerateTable );
        break;
      case 'btn--moff' :
        jqueryMap.btnMobileOn.removeClass('btn--on');
        jqueryMap.btnMobileOff.addClass('btn--on');
        jqueryMap.btnMobileOnOff.removeClass('btn--on');
        customer.model.kids.setCondition( { 'has_mobile' : 0 }, regenerateTable );
        break;
      case 'btn--mon-off' :
        jqueryMap.btnMobileOn.removeClass('btn--on');
        jqueryMap.btnMobileOff.removeClass('btn--on');
        jqueryMap.btnMobileOnOff.addClass('btn--on');
        customer.model.kids.setCondition( { 'has_mobile' : 'all' }, regenerateTable );
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

        jqueryMap.btnBusiv.toggleClass('btn--on');
        jqueryMap.btnBusivUniv.removeClass('btn--on');

        if ( jqueryMap.btnBusiv.hasClass('btn--on') ) {
          cms.model.kids.setCondition( { 'has_busiv' : 1 } );
        }
        else {
          cms.model.kids.setCondition( { 'has_busiv' : 0 } );
        }

        if ( jqueryMap.btnUniv.hasClass('btn--on') ) {
          cms.model.kids.setCondition( { 'has_fenics' : 1 } );
        }
        else {
          cms.model.kids.setCondition( { 'has_fenics' : 0 } );
        }

        cms.model.kids.getCondition( regenerateTable );

        break;
      case 'btn--univ' :
        jqueryMap.btnUniv.toggleClass('btn--on');
        jqueryMap.btnBusivUniv.removeClass('btn--on');

        if ( jqueryMap.btnBusiv.hasClass('btn--on') ) {
          cms.model.kids.setCondition( { 'has_busiv' : 1 } );
        }
        else {
          cms.model.kids.setCondition( { 'has_busiv' : 0 } );
        }

        if ( jqueryMap.btnUniv.hasClass('btn--on') ) {
          cms.model.kids.setCondition( { 'has_fenics' : 1 } );
        }
        else {
          cms.model.kids.setCondition( { 'has_fenics' : 0 } );
        }

        cms.model.kids.getCondition( regenerateTable );

        break;
      case 'btn--busivUniv' :

        if ( jqueryMap.btnBusivUniv.hasClass('btn--on') ) {

          jqueryMap.btnBusivUniv.removeClass('btn--on');

          if ( jqueryMap.btnBusiv.hasClass('btn--on') ) {
            cms.model.kids.setCondition( { 'has_busiv' : 1 } );
          }
          else {
            cms.model.kids.setCondition( { 'has_busiv' : 0 } );
          }

          if ( jqueryMap.btnUniv.hasClass('btn--on') ) {
            cms.model.kids.setCondition( { 'has_fenics' : 1 } );
          }
          else {
            cms.model.kids.setCondition( { 'has_fenics' : 0 } );
          }

          cms.model.kids.getCondition( regenerateTable );

        }
        else {
          jqueryMap.btnBusivUniv.addClass('btn--on');
          cms.model.kids.setCondition( { 'has_fenics' : 'all', 'has_busiv' : 'all' }, regenerateTable );
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
      return { 'id' : $(val).attr('id') } ;
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

    _.each( jqueryMap.pageList.find('.page'), function (v,k) {
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
      cms.model.kids.getPage(page, regenerateTable);
    }


  };

  /**
   * ページ番号のボタンや..を作る
   * @param  {Array} list - 表示するページ番号リスト
   */
  makePageButton = function ( list ) {


    var el;

    jqueryMap.pageList.empty();

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

      jqueryMap.pageList.append(el);

    });

  };

  drawTable = function () {
    _drawHead( customer.model.kids.getHeader() );
    _drawBody( customer.model.kids.getData()   );
    _setJqueryMap();
    _hideCol();
  };

  /**
   * 並び替えによる再描画処理
   * 行数が変わらないことがポイント
   */
  redrawTable = function ( col, data ) {

    var headerMap = customer.model.kids.getHeader();

    delete headerMap.uid;

    jqueryMap.row.each( function ( key, val ) {
      // idだけは個別処理
        $(val).attr('id', data[key].id );

      // 各々の列の値をクリアしてソートした値をセット
      _.each( headerMap, function ( v, k ) {
        $(val).find('.' + k).empty().append( data[key][k] );
      });

    });

  };

  /**
   * 行数変わるテーブル再描画処理
   * TODO:カッコ悪い実装だな
   */
  regenerateTable = function ( data ) {

    if ( data === null ) {
      return;
    }

    var body = "<table class='mdl-data-table mdl-js-data-table mdl-data-table--selectable mdl-shadow--2dp'>";
    body += "<thead></thead><tbody></tbody></table>"

    jqueryMap.table.remove();
    jqueryMap.tableWraper.append(body);

    _setJqueryMap();
    _drawHead( customer.model.kids.getHeader() );
    _drawBody( data );
    _setJqueryMap();
    _hideCol();

    // これが肝 チェックボックスを生成してくれる
    componentHandler.upgradeElement( jqueryMap.table.get(0) );

    jqueryMap.body.kid.on( 'click', _onClickKid );
    jqueryMap.header.on( 'click', _onClickColumn );

    cms.model.kids.getPageList( makePageButton );
    _highlightIndexPage( cms.model.kids.getPageIndex() );

  };

  refresh = function () {

    cms.model.kids.fetch( null );
    cms.model.kids.getCondition( cms.view.kids.regenerateTable );

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

    _setJqueryMap();

    drawTable();
    cms.model.kids.getPageList( makePageButton );
    _highlightIndexPage( cms.model.kids.getPageIndex() );


    // サーバー選択肢作成
    selectServer( 'all' );

    // ヘッダークリック
    jqueryMap.header.on( 'click', _onClickColumn );

    // サーバー選択時
    $('.select-servers').change( function () {
      customer.model.kids.setCondition( { server : $(this).val() }, regenerateTable );
    });

    // ボタンイベント登録
    jqueryMap.btnDel.on( 'click', function() {
      jqueryMap.dialog.get(0).showModal();
    } );

    jqueryMap.btnDownload.on( 'click', _onClickDownload );
    jqueryMap.body.kid.on( 'click', _onClickKid );

    // フィルターイベント登録
    jqueryMap.btnSystem.on( 'click', _selectSystem );
    jqueryMap.btnVersion.on( 'click', _selectVertion );
    jqueryMap.btnNetwork.on('click', _selectNetwork );
    jqueryMap.btnMobile.on( 'click', _selectMobileAvailable );

    jqueryMap.btnPrev.on('click', function () { cms.model.kids.prevPage( regenerateTable ); });
    jqueryMap.btnNext.on('click', function () { cms.model.kids.nextPage( regenerateTable ); });

    jqueryMap.pageList.on( 'click', _selectPage );

    jqueryMap.search.on('change', function () {
      var keyword = $(this).val();
      cms.model.kids.search( keyword, regenerateTable );
    });

  };

  // to public
  cms.view.kids = {
    initModule      : initModule,
    redrawTable     : redrawTable,
    regenerateTable : regenerateTable,
    refresh         : refresh,
    selectServer    : selectServer,
    tmp             : _getSelectItem
  };


}( jQuery, customer ));