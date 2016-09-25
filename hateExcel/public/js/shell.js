  // DBから取得用データ
  
  // テーブルデータ
  // var data = [
  //   { id : 'item1', name : 'KID10211', age : 19, sex : 'm', check : 'true'  },
  //   { id : 'item2', name : 'KID10310', age : 15, sex : 'm', check : 'false' },
  //   { id : 'item3', name : 'KID10130', age : 8,  sex : 'f', check : 'true'  },
  //   { id : 'item4', name : 'KID10111', age : 29, sex : 'f', check : 'true'  },
  //   { id : 'item5', name : 'KID05003', age : 12, sex : 'm', check : 'true'  },
  //   { id : 'item6', name : 'KID10330', age : 17, sex : 'f', check : 'true'  },
  //   { id : 'item7', name : 'KID10001', age : 23, sex : 'm', check : 'false' },
  //   { id : 'item8', name : 'KID30113', age : 11, sex : 'f', check : 'false' },
  //   { id : 'item9', name : 'KID05291', age : 9,  sex : 'f', check : 'true'  }
  // ];

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
    check   : '対象',
    kid     : 'KID',
    company : '名前',
    server  : 'サーバ',
    genics  : 'genicd',
    userKey : 'ユーザキー',
    author  : '作成者',
    updateDate : '更新日'
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


  // 列表示・非表示イベント作成
  _.each( view, function ( val, key ) {
    $('#' + key).on( 'click', function (){
      viewCol(key);
    });
  });

});