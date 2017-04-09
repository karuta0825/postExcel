/**
 * サーバモデル
 */
( function ( $, cms_model ) {

  /* member */
  var
    _data
    , stock = { insert :[], del : [], update : [] }
    , getServers
    , refresh
    , initModule
    , update
    , addStock
    , delStock
    , findObjById
    ;

  getServers = function () {
    return _data;
  };

  refresh = function () {
    _data = customer.db.selectAll('servers');
    return _data;
  }

  // delete & insert
  update = function () {

  };

  // 以下スタック処理は、一つのメソッドで内部で処理したほうが良さそうだな
  // 基本は、ひとつでプライベートで複数の処理にわけよう。命名が大変そうだな。
  addStock = function ( obj ) {
    stock.push( obj );
  };

  delStock = function ( id ) {
    stock.del.push( findObjById(id) );
  };

  updateStock = function ( id ) {
    stock.update.push( findObjById( id ) );
  };

  findObjById = function ( id ) {
    return _.select( _data, function ( val  ) {
      return val.id === Number(id);
    })[0];
  };

  initModule = function () {
    _data = customer.db.selectAll('servers');
  };

  /* to public */
  cms_model.servers = {
    initModule : initModule,
    getServers : getServers,
    refresh    : refresh,
    addStock   : addStock,
    delStock   : delStock,
    tmp        : function () { return stock; }
  };

}( jQuery, customer.model ));