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

    // CSVのとき
    if ( str_header ) {
      output.unshift( str_header + '\r\n');
    }

    output.unshift( bom );

    return new Blob( output, { 'type' : 'text/plain' } );

  };

  util.makeMapList2Txt = function ( mapList ) {

    var output = _.map( mapList, function ( v, k ) {
      return k + '' + v + '\r\n';
    });

    return new Blob( output, {'type' : 'text/plain'} );

  };


  /**
   * TODO: CSV,json,txtなど一元管理する
   * @param  {DOM}    element
   * @param  {Blob}   Blob
   * @param  {String} filename
   */
  var _downloadFile = function ( element, Blob, filename ) {
    $(element).attr('download', filename );
    $(element).attr('href', window.URL.createObjectURL(Blob) );
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

  /**
   * [dialog description]
   * @param  {Object} map_option
   * @param  {String}  map_option.selector
   * @param  {String}  map_option.id
   * @param  {String}  map_option.title
   * @param  {String}  map_option.msg
   */
  util.confirm = function ( map_option ) {

    // 入力チェック
    if ( !_.isObject( map_option ) ) {
      console.log("don't make dialog because argument is not object.");
      return;
    }

    if ( !map_option.hasOwnProperty('selector') ) {
      console.log("don't make dialog because the argument don't have selector key.");
      return;
    }

    var
      dialog  = $('<dialog>', { 'class' : 'mdl-dialog', 'id' : map_option['id'] } )
    , title   = $('<h6>', { 'class' : 'mdl-dialog__title', 'text' : '確認' })
    , content = $('<p>',  { 'class' : 'mdl-dialog__content', 'text' : map_option['msg']})
    , action  = $('<div>', { 'class' : 'mdl-dialog__actions'} )
    , btnYes  = $('<button>', { 'type' : 'button', 'class' : 'btn modal-btn--yes mdl-button', 'text' : 'OK' })
    , btnNo   = $('<button>', { 'type' : 'button', 'class' : 'btn modal-btn--no mdl-button', 'text' : 'キャンセル' })
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

    btnYes.on('click', function () {
      if( typeof map_option.yes === 'function' ) {
        map_option.yes(this);
      }
      dialog.get(0).close();
    });

    btnNo.on('click', function () {
      if( typeof map_option.no === 'function' ) {
        map_option.no(this);
      }
      dialog.get(0).close();
    });

    $(map_option['selector']).append(dialog);

  };


  util.makeSelect       = _makeSelect;
  // util.makeSelectBox = makeSelectBox;
  util.convertMap2Blob  = _makeBlobFromMapList;
  util.downloadFile     = _downloadFile;


  // 公開
  this.util = util;

}(jQuery ));