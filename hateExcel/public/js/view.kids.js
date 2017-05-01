/**
 *  list users
 */

( function ( $, cms_view ) {

  var
  // member
    jqueryMap = {}
  // private
  , _setJqueryMap
  , _drawHead
  , _drawBody
  , _onClickColumn
  , _onClickEdit
  , _onClickKid
  , _onClickDownload
  , _onClickToggle
  // public
  , initModule
  , drawTable
  , redrawTable
  , regenerateTable
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
      jqueryMap.btnOnpre     = filter.find('.btn--onpre');
      jqueryMap.btnCloud     = filter.find('.btn--cloud');
      jqueryMap.btnLM        = filter.find('.btn--LM');
      jqueryMap.btnES        = filter.find('.btn--ES');
      jqueryMap.btnMobileOn  = filter.find('.btn--mon');
      jqueryMap.btnMobileOff = filter.find('.btn--moff');

      jqueryMap.btnEdit     = content.find('.btn--edit');
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
    var
      data     = { list : data }
    , tmpl     = customer.db.getHtml('template/kids.body.html')
    , complied = _.template( tmpl )
    ;

    jqueryMap.tbody.append( complied( data ) );

  };

  drawTable = function () {
    _drawHead( customer.model.kids.getHeader() );
    _drawBody( customer.model.kids.getData()   );
    _setJqueryMap();
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
        $(val).attr('id', 'id' + data[key].id );

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

    var body = "<table class='mdl-data-table mdl-js-data-table mdl-data-table--selectable mdl-shadow--2dp'>";
    body += "<thead></thead><tbody></tbody></table>"

    jqueryMap.table.remove();
    jqueryMap.tableWraper.append(body);

    _setJqueryMap();
    _drawHead( customer.model.kids.getHeader() );
    _drawBody( data );
    _setJqueryMap();

    // これが肝 チェックボックスを生成してくれる
    componentHandler.upgradeElements( jqueryMap.table );

    jqueryMap.body.kid.on( 'click', _onClickKid );

  };

  _onClickColumn = function () {

    column_class_name = $(this).attr('class').split(' ')[1];
    customer.model.kids.sortByCol( column_class_name, redrawTable );

  };

  _onClickKid = function () {
    var kid = $(this).text().trim();

    // クライアントテーブル作成
    customer.view.editUsrs.makeAccountTable(
      customer.model.accounts.getAccounts({ kid : kid })
    );

    // サービステーブル作成
    // customer.view.userService.makeServiceTable(
    //   customer.model.services.getLicenses({ kid : kid })
    // );


    $('.main-contents').removeClass('is-active');

    // クリックされたコンテンツにis-activeを付与
    var target = '.main-contents--edit-usr'
    $(target).addClass('is-active');

  };

  /**
   * [_onClickEdit description]
   * TODO:shellのメソッドを利用できるようにする
   */
  _onClickEdit = function () {
    $('.main-contents').removeClass('is-active');

    // クリックされたコンテンツにis-activeを付与
    var target = '.main-contents--' + $(this).attr('href').slice(1);
    $(target).addClass('is-active');

  };

  _onClickDownload = function () {
    // 確認ダイアログを表示させる

    // 対象を取得
    var ids = _.map( $('.is-selected'), function (val,key){
      return Number( $(val).attr('id').slice(2) );
    });

    if ( ids.length === 0 ) {
      alert('選択されていません');
    }

    var filename = 'a';
    var header = 'id,';
    var data = customer.model.kids.findByIds( ids );
    header += _.values( customer.model.kids.getHeader() ).join(',');
    var Blob = util.convertMap2Blob( data, header );
    // ダウンロード
    util.downloadFile( this, Blob, filename );

  };

  _onClickToggle = function () {
    $(this).toggleClass('btn--on');
  };

  _onClickMobileSwitch = function () {
    if ( jqueryMap.btnMobileOn.hasClass('btn--on') ) {
      jqueryMap.btnMobileOn.removeClass('btn--on');
      jqueryMap.btnMobileOff.addClass('btn--on');
    }
    else {
      jqueryMap.btnMobileOff.removeClass('btn--on');
      jqueryMap.btnMobileOn.addClass('btn--on');
    }
  };

  initModule = function () {
    // table load
    $('.main-contents--view-usr').append( customer.db.getHtml('list.users.html') );

    _setJqueryMap();

    drawTable();


    // make select box
    var servers = _.map( customer.model.servers.getServers(), function (item) {
      return item.name
    });
    $('.filter__body').append( util.makeSelect( 'servers', 'サーバー', servers ) );

    // on event
    jqueryMap.header.on( 'click', _onClickColumn );

    $('select#servers').change( function () {
      var data_filtered = customer.model.kids.findByServer( $(this).val() );
      regenerateTable( data_filtered );
    });

    jqueryMap.btnEdit.on( 'click', _onClickEdit );
    jqueryMap.btnDownload.on( 'click', _onClickDownload );
    jqueryMap.body.kid.on( 'click', _onClickKid );

    jqueryMap.btnOnpre.on( 'click', _onClickToggle );
    jqueryMap.btnCloud.on( 'click', _onClickToggle );

    jqueryMap.btnLM.on( 'click', _onClickToggle );
    jqueryMap.btnES.on( 'click', _onClickToggle );

    jqueryMap.btnMobileOn.on( 'click', _onClickMobileSwitch );
    jqueryMap.btnMobileOff.on( 'click', _onClickMobileSwitch );

  };

  cms_view.users = {
    initModule : initModule,
    redrawTable : redrawTable,
    regenerateTable : regenerateTable
  }


}( jQuery, customer.view ));