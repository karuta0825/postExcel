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
  , _onClickEdit
  , _onClickKid
  , _onClickDownload
  , _selectSystem
  , _selectVertion
  , _selectNetwork
  , _selectServer
  , _selectMobileAvailable
  , _getSelectItem
  , _deleteUser
  // public
  , initModule
  , drawTable
  , redrawTable
  , regenerateTable
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
      jqueryMap.btnBusivUniv = filter.find('.btn--busiv-univ')
      jqueryMap.btnNetwork = filter.find('.network .filter-item__body');

      jqueryMap.btnMobileOn  = filter.find('.btn--mon');
      jqueryMap.btnMobileOff = filter.find('.btn--moff');
      jqueryMap.btnMobileOnOff = filter.find('.btn--mon-off')
      jqueryMap.btnMobile = filter.find('.mobile .filter-item__body');

      jqueryMap.dialog = content.find('dialog');
      jqueryMap.btnDialogOk = content.find('dialog .btn--exec');
      jqueryMap.btnDialogCancel = content.find('dialog .btn--cancel');

      jqueryMap.btnDel     = content.find('.btn--del');
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
    jqueryMap.col['system_type'].addClass('is-hidden');
    jqueryMap.col['version'].addClass('is-hidden');
    jqueryMap.col['has_mobile'].addClass('is-hidden');
    jqueryMap.col['is_busiv'].addClass('is-hidden');
    jqueryMap.col['is_registered'].addClass('is-hidden');
  }

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
    customer.model.clients.fetch(kid,
      customer.view.userClient.redrawTable
    );

    // サービステーブル描画
    customer.model.services.fetchLicenses( kid,
      customer.view.userService.setViewInfo
    );

    // ネットワークタブ描画
    customer.model.userNetwork.fetch(kid,
      customer.view.userNetwork.redrawTable
    );

    // パートナータブの描画
    customer.model.userPartner.fetch( kid,
      customer.view.userPartner.setInfo
    );

    // 履歴タブの描画
    customer.model.userHistory.fetch( kid,
      customer.view.userHistory.drawTable
    );

    // メモ一覧作成
    customer.model.userMemo.fetch( kid,
      customer.view.editUsrs.makeMemos
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
    var ids = _getSelectItem();

    var filename = 'a';
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
        jqueryMap.btnUniv.removeClass('btn--on');
        jqueryMap.btnBusivUniv.removeClass('btn--on');
        customer.model.kids.setCondition( { 'is_busiv' : 1 }, regenerateTable );
        break;
      case 'btn--univ' :
        jqueryMap.btnBusiv.removeClass('btn--on');
        jqueryMap.btnUniv.addClass('btn--on');
        jqueryMap.btnBusivUniv.removeClass('btn--on');
        customer.model.kids.setCondition( { 'is_busiv' : 0 }, regenerateTable );
        break;
      case 'btn--busiv-univ' :
        jqueryMap.btnBusiv.removeClass('btn--on');
        jqueryMap.btnUniv.removeClass('btn--on');
        jqueryMap.btnBusivUniv.addClass('btn--on');
        customer.model.kids.setCondition( { 'is_busiv' : 'all'}, regenerateTable );
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

  _getSelectItem = function () {

    // まずい指定が弱い
    var ids = _.map( $('.is-selected'), function (val,key){
      return { 'kid' : $(val).attr('id') } ;
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
        $(val).attr('id', data[key].kid );

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
    _hideCol();

    // これが肝 チェックボックスを生成してくれる
    componentHandler.upgradeElements( jqueryMap.table );

    jqueryMap.body.kid.on( 'click', _onClickKid );
    jqueryMap.header.on( 'click', _onClickColumn );

  };

  refresh = function () {
    // regenerateTable( cms.model.kids.fetch() ) ;
    cms.model.kids.fetch( null, regenerateTable );
  };


  initModule = function () {
    // table load
    $('.main-contents--view-usr').append( customer.db.getHtml('list.users.html') );

    // ダイアログ作成
    util.confirm({
      selector : '.main-contents--view-usr',
      msg      : '選択したユーザーを削除しますか?',
      yes      : _deleteUser
    });

    _setJqueryMap();

    drawTable();

    // サーバー選択肢作成
    _selectServer( 'all' );

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

  };

  // to public
  cms.view.kids = {
    initModule      : initModule,
    redrawTable     : redrawTable,
    regenerateTable : regenerateTable,
    refresh         : refresh,
    get             : _getSelectItem
  };


}( jQuery, customer ));