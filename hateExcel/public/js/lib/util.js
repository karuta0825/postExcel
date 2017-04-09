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


  util.makeSelect       = _makeSelect;
  util.convertMap2Blob  = _makeBlobFromMapList;
  util.downloadFile     = _downloadFile;


  // 公開
  this.util = util;

}(jQuery ));