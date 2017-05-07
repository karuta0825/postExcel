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
  , _selectSystem
  , _selectVertion
  , _selectNetwork
  , _selectServer
  , _selectMobileAvailable
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
      jqueryMap.btnOnpreCloud = filter.find('.btn--onpre-cloud');

      jqueryMap.btnLM        = filter.find('.btn--LM');
      jqueryMap.btnES        = filter.find('.btn--ES');
      jqueryMap.btnESLM      = filter.find('.btn--ESLM');

      jqueryMap.btnBusiv  = filter.find('.btn--busiv');
      jqueryMap.btnFenics = filter.find('.btn--fenics');
      jqueryMap.btnBusivFenics = filter.find('.btn--busiv-fenics')
      jqueryMap.btnNetwork = filter.find('.network .filter-item__body');

      jqueryMap.btnMobileOn  = filter.find('.btn--mon');
      jqueryMap.btnMobileOff = filter.find('.btn--moff');
      jqueryMap.btnMobileOnOff = filter.find('.btn--mon-off')
      jqueryMap.btnMobile = filter.find('.mobile .filter-item__body');

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

    if ( data.list.length < 1 ) {
      return;
    }

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
    jqueryMap.header.on( 'click', _onClickColumn );

  };

  _onClickColumn = function () {

    column_class_name = $(this).attr('class').split(' ')[1];
    customer.model.kids.sortByCol( column_class_name, redrawTable );

  };

  _onClickKid = function () {
    var kid = $(this).text().trim();

    // 基本情報タブ描画
    customer.model.userBaseInfo.fetch( kid,
      customer.view.userBaseInfo.makeUserInfo
    );

    // クライアントテーブル描画
    // customer.view.editUsrs.makeAccountTable(
    //   customer.model.accounts.getAccounts({ kid : kid })
    // );

    // サービステーブル描画
    customer.model.services.fetchLicenses( kid,
      customer.view.userService.setViewInfo
    );

    // パートナータブの描画
    customer.model.userPartner.fetch( kid,
      customer.view.userPartner.setInfo
    );

    // 履歴タブの描画
    customer.model.userHistory.fetch( kid,
      customer.view.userHistory.drawTable
    );

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
    var data = customer.model.kids.find( ids );
    header += _.values( customer.model.kids.getHeader() ).join(',');
    var Blob = util.convertMap2Blob( data, header );
    // ダウンロード
    util.downloadFile( this, Blob, filename );

  };

  _selectSystem = function () {

    var list_class = $(this).attr('class').split(' ');

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
  _selectVertion = function () {

    var list_class = $(this).attr('class').split(' ');

    switch ( list_class[1] ) {
      case 'btn--ES' :
        jqueryMap.btnES.addClass('btn--on');
        jqueryMap.btnLM.removeClass('btn--on');
        jqueryMap.btnESLM.removeClass('btn--on');
        customer.model.kids.setCondition( {'version' : 'ES', 'server' : 'all'}, regenerateTable );
        // 選択サーバ変更
        _selectServer('ES');
        break;
      case 'btn--LM' :
        jqueryMap.btnES.removeClass('btn--on');
        jqueryMap.btnLM.addClass('btn--on');
        jqueryMap.btnESLM.removeClass('btn--on');
        customer.model.kids.setCondition( { 'version' : 'LM', 'server' : 'all' }, regenerateTable );
        // 選択サーバ変更
        _selectServer('LM');
        break;
      case 'btn--ESLM' :
        jqueryMap.btnES.removeClass('btn--on');
        jqueryMap.btnLM.removeClass('btn--on');
        jqueryMap.btnESLM.addClass('btn--on');
        customer.model.kids.setCondition( { 'version' : 'all', 'server' : 'all'}, regenerateTable );
        //
        _selectServer('all');
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

  _selectNetwork = function ( event ) {

    var list_class = $( event.target ).attr('class').split(' ');

    switch ( list_class[1] ) {
      case 'btn--busiv' :
        jqueryMap.btnBusiv.addClass('btn--on');
        jqueryMap.btnFenics.removeClass('btn--on');
        jqueryMap.btnBusivFenics.removeClass('btn--on');
        // customer.model.kids.setCondition( {'version' : 'ES', 'server' : 'all'}, regenerateTable );
        break;
      case 'btn--fenics' :
        jqueryMap.btnBusiv.removeClass('btn--on');
        jqueryMap.btnFenics.addClass('btn--on');
        jqueryMap.btnBusivFenics.removeClass('btn--on');
        // customer.model.kids.setCondition( { 'version' : 'LM', 'server' : 'all' }, regenerateTable );
        break;
      case 'btn--busiv-fenics' :
        jqueryMap.btnBusiv.removeClass('btn--on');
        jqueryMap.btnFenics.removeClass('btn--on');
        jqueryMap.btnBusivFenics.addClass('btn--on');
        // customer.model.kids.setCondition( { 'version' : 'all', 'server' : 'all'}, regenerateTable );
        break;
      default:
        break;
    }

  };


  _selectServer = function ( version ) {

    var filtered = customer.model.servers.find({ 'version' : version, type : 'AP' });
    var select =  util.addOption( filtered, $('.select-servers') );
    $('.filter-item.servers .filter-item__body').append( select );

  };



  initModule = function () {
    // table load
    $('.main-contents--view-usr').append( customer.db.getHtml('list.users.html') );

    _setJqueryMap();

    drawTable();

    // on event
    jqueryMap.header.on( 'click', _onClickColumn );

    $('.select-servers').change( function () {
      customer.model.kids.setCondition( { server : $(this).val() }, regenerateTable );
    });

    jqueryMap.btnEdit.on( 'click', _onClickEdit );
    jqueryMap.btnDownload.on( 'click', _onClickDownload );
    jqueryMap.body.kid.on( 'click', _onClickKid );

    jqueryMap.btnOnpre.on( 'click', _selectSystem );
    jqueryMap.btnCloud.on( 'click', _selectSystem );
    jqueryMap.btnOnpreCloud.on( 'click', _selectSystem );

    jqueryMap.btnLM.on( 'click', _selectVertion );
    jqueryMap.btnES.on( 'click', _selectVertion );
    jqueryMap.btnESLM.on( 'click', _selectVertion );


    jqueryMap.btnNetwork.on('click', _selectNetwork );

    jqueryMap.btnMobile.on( 'click', _selectMobileAvailable );


  };

  cms_view.users = {
    initModule : initModule,
    redrawTable : redrawTable,
    regenerateTable : regenerateTable
  }


}( jQuery, customer.view ));