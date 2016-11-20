

  // クライアント側操作
$(function(){

  // 表示設定テンプレート

  // var serverTmpl = $('#servers').html();
  // list_server = customer.db.selectAll('servers');
  // var servers    = _.template( serverTmpl, list_server );
  // $('#user').append(servers);

  // シェルはView作成だけでよい
  // その後の処理は、viewの中で対応する
  for ( var key in customer.view ) {
    if ( customer.view.hasOwnProperty(key) ) {
      customer.view[key].initModule();
    }
  }

});