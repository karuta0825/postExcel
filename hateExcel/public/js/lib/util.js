( function ($) {

  var util = {};


  /**
   * セレクトボックス作成
   */
  var _makeSelect = function ( id, name, list_select_items ) {
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

  util.addOption = function ( list_option, selectbox, has_all ) {

    var option;

    $(selectbox).find('option').remove();

    if ( !has_all ) {
      $(selectbox).append( $('<option>', { 'value' : 'all', 'text' : '全て' }) );
    }

    _.each( list_option, function (val, key) {
      option = $('<option>', { 'value' : val.name, 'text' : val.name });
      $(selectbox).append(option);
    });

    return selectbox;

  };

  /**
   * jsonを受け取って、csvファイル用のblobオブジェクトを返す
   * @param  {String} mapList    - オブジェクト配列
   * @param  {String} str_header - csvのヘッダー要素となる文字列（カンマ区切り）
   * @return {Blob}
   * @example
   * _makeBlobFromMapList( mapList, )
   */
  var _makeBlobFromMapList = function ( mapList, str_header ) {

    var
      bom    = new Uint8Array([0xEF, 0xBB, 0xBF])
    , output = _.map( mapList, function ( val, key ) {
        return _.values(val).join(',') + '\r\n'
      })
    ;

    output.unshift( str_header + '\r\n');
    output.unshift( bom );

    return new Blob( output, { 'type' : 'text/plain' } );

  };

  /**
   * TODO: CSV,json,txtなど一元管理する
   * @param  {DOM}    element
   * @param  {Blob}   Blob
   * @param  {String} filename
   */
  var _downloadFile = function ( element, Blob, filename ) {
    $(element).attr('download', filename + '.csv');
    $(element).attr('href', window.URL.createObjectURL(Blob) );
  };

  // 日付関連
  // formatをこちらから指定できる
  var dateFormat = function () {

  };

  var getToday = function () {
    var d = new Date();
  };


  /**
   * 次のクライアントナンバーを取得
   */
  util.getNextZeroPadData = function ( value ) {
    var
      numOnly  = value.match(/(\d+)$/)[0],
      notNum   = value.substr(0, value.length - numOnly.length),
      fmtNum   = Number(numOnly),
      nextNum  = fmtNum + 1,
      zeroPad  = ( '000' + nextNum ).slice( -1 * numOnly.length ),
      nextData = notNum + zeroPad
      ;
    return nextData;
  };

  util.dialog = function ( map_option ) {

    // 入力チェック

    var
      dialog  = $('<dialog>', { 'class' : 'mdl-dialog', 'id' = map_option[id] } )
    , title   = $('<h6>', { 'class' : 'mdl-dialog__title', 'text' : map_option[title] })
    , content = $('<div>', { 'class' : 'mdl-dialog__content'})
    , action  = $('<div>', { 'class' : 'mdl-dialog__action'} )
    , btnYes
    , btnNo
    ;

    action
      .append(btnYes)
      .append(btnNo)
      ;

    dialog
      .append( title )
      .append( content )
      .append( action )
      ;

    $(map_option[selector]).append(dialog);

  };


  util.makeSelect       = _makeSelect;
  // util.makeSelectBox = makeSelectBox;
  util.convertMap2Blob  = _makeBlobFromMapList;
  util.downloadFile     = _downloadFile;


  // 公開
  this.util = util;

}(jQuery ));