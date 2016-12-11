

  // クライアント側操作
$(function(){

  // 表示設定テンプレート

  // var serverTmpl = $('#servers').html();
  // list_server = customer.db.selectAll('servers');
  // var servers    = _.template( serverTmpl, list_server );
  // $('#user').append(servers);

  

  // _.each( customer.model, function ( val, key ) {
  //   console.log(val);
  //   val.initModule();
  // });

  $('#mydate').datepicker({
    format : 'yyyy/mm/dd',
    language : 'ja',
    autoclose : true
  });

  // シェルはView作成だけでよい
  // その後の処理は、viewの中で対応する
  _.each( customer.view, function ( val, key ) {
    val.initModule();
  });

});