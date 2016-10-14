  // DBから取得用データ
  // テーブル列・表示用データ
  // TODO: 配列してviewに関する情報を追加しやすいようにする
  // ex)html表示名をここで決める
  var view = {
    kid    : true,
    server   : true,
    genics   : true,
    userkey    : true
  };

  var headerMap = {
    check          : '対象',
    kid            : 'KID',
    company        : '名前',
    server        : 'サーバ',
    genics         : 'genicd',
    userKey        : 'ユーザキー',
    author         : '作成者',
    account_number : 'アカウント数',
    updateDate     : '更新日'
  };

  var data, list_server;

  // クライアント側操作
$(function(){

  // 表示設定テンプレート
  // var colTmpl = $('#view-config').html();
  // var cols = _.template( colTmpl, view );
  // $('#config').append( cols );

  var headerTmpl = $('#table-header').html();
  var headers = _.template( headerTmpl, headerMap );
  $('thead').append( headers );

  var serverTmpl = $('#servers').html();
  list_server = customer.db.selectAll('servers');
  var servers    = _.template( serverTmpl, list_server );
  $('#user').append(servers);


  /**
   * 選択した列を表示・日表示する機能
   * @param {String} key - 対象列のキー
   */
  var viewCol = function ( key ) {
    if ( view[key] === true ) {
      $( '.' + key ).hide();
      view[key] = false;
    }
    else {
      $( '.' + key ).show();
      view[key] = true;
    }
  };

  // シェルはView作成だけでよい
  // その後の処理は、viewの中で対応する
  for ( var key in customer.view ) {
    if ( customer.view.hasOwnProperty(key) ) {
      customer.view[key].initModule();
    }
  }

});