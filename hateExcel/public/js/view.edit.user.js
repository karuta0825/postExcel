/**
 * viewController
 * 新規ユーザー追加
 */
( function ( $, cms_view ) {

  var
  // member
    jqueryMap = {}
  , _setJqueryMap
  , _onClickCSVImport
  , _makeInput
  , backUserTable
  , makeAccountTable
  , makeServiceTable
  , initModule
  ;

  /**
   * DOMキャッシュ設定
   * TODO: 更新部分だけ設定する方法も考えよう
   */
  _setJqueryMap = function () {
    var
      content = $('#user-edit')
    ;

    jqueryMap.tab_bar   = {
       'usr-base'    : content.find('a[href="#usr-base-panel"]')
      ,'usr-service' : content.find('a[href="#usr-service-panel"]')
      ,'usr-account' : content.find('a[href="#usr-account-panel"]')
      ,'usr-partner' : content.find('a[href="#usr-partner-panel"]')
      ,'usr-quota'   : content.find('a[href="#usr-quota-panel"]')
      ,'usr-history' : content.find('a[href="#usr-history-panel"]')
    };

    jqueryMap.tab_panel = {
       'usr-base'    : content.find('#usr-base-panel')
      ,'usr-service' : content.find('#usr-service-panel')
      ,'usr-account' : content.find('#usr-account-panel')
      ,'usr-partner' : content.find('#usr-partner-panel')
      ,'usr-quota'   : content.find('#usr-quota-panel')
      ,'usr-history' : content.find('#usr-history-panel')
    };

    jqueryMap.serviceTable = jqueryMap.tab_panel['usr-service'].find('table');
    jqueryMap.accountTable = jqueryMap.tab_panel['usr-account'].find('table');
    jqueryMap.historyTable = jqueryMap.tab_panel['usr-history'].find('table');

  };

  /**
   * セレクトボックス作成
   */
  _makeSelect = function ( id, name, list_select_items ) {
    var
      div      = $('<div>',    { 'class' : 'mdl-selectfield mdl-js-selectfield mdl-selectfield--floating-label' })
    , select   = $('<select>', { 'class' : 'mdl-selectfield__select', 'id' : id, 'name' : id })
    , div_icon = $('<div>',    { 'class' : 'mdl-selectfield__icon' })
    , i        = $('<i>',      { 'class' : 'material-icons', 'text' : 'arrow_drop_down' })
    , label    = $('<label>',  { 'class' : 'mdl-selectfield__label', 'text' : name })
    , option   = $('<option>', { 'value' : '' })
    ;

    // セレクトオプション初期値を追加
    select.append( option );

    // セレクトオプション内容追加
    _.each( list_select_items, function ( val, key ) {
      select.append( $('<option>', { 'value' : val, 'text' : val } ) );
    });

    //
    div_icon.append( i );

    // union
    div.append( select )
       .append( div_icon )
       .append( label )
       ;

    return div;

  };


  backUserTable = function () {
    $('.main-contents').removeClass('is-active');

    // クリックされたコンテンツにis-activeを付与
    var target = '.main-contents--' + $(this).attr('href').slice(1);
    $(target).addClass('is-active');
  };

  /**
   * クライント一覧の生成
   */
  makeAccountTable = function ( data ) {

    var
      data     = { list : data }
    , tmpl     = customer.db.getHtml('template/user.client.html')
    , complied = _.template( tmpl )
    ;

    jqueryMap.accountTable.remove();

    jqueryMap.tab_panel['usr-account'].append( complied(data) );

    componentHandler.upgradeElements( jqueryMap.tab_panel['usr-account'] );
    _setJqueryMap();

  };


  initModule = function () {

    // コンテンツの挿入
    $('.main-contents--edit-usr').append( customer.db.getHtml('edit.user.html'));

    // DOMキャッシュ作成
    _setJqueryMap();

    // イベント登録
    $('.btn--backList').on( 'click', backUserTable );


  };

  cms_view.editUsrs = {
    initModule : initModule,
    makeAccountTable : makeAccountTable,
  };

}( jQuery, customer.view ));