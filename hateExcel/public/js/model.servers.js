/**
 * サーバモデル
 */
( function ( $, cms ) {

  /* member */
  var
    _model = new Model({
      table : 'servers'
    })
  , updateModel = new Model()
  , insertModel = new Model()
  , deleteModel = new Model()
  , initModule
  , change
  , remove
  , reset
  , save
  ;

  updateModel.update = function () {
    var params = {
      data  : updateModel.getCache(),
      query : 'servers'
    };
    customer.db.update('/m_update', params, function ( result ) {
      var data = _model.fetch();
      cms.view.servers.redrawTable( data );
    });
  };

  insertModel.insert = function () {

    var params = {
      data  : insertModel.getCache(),
      query : 'servers'
    };

    cms.db.insert('/m_server_add', params, function ( result ) {
      console.log(result);
    });

  };

  deleteModel.delete = function () {

    var params = {
      data  : deleteModel.getCache(),
      query : 'servers'
    };

    cms.db.delete('/delete', params, function ( result ) {
      console.log(result);
    });
  };

  initModule = function () {
    _model.fetch();
  };

  reset = function () {
    updateModel.freeCache();
    insertModel.freeCache();
    deleteModel.freeCache();
  };

  remove = function ( id ) {

    updateModel.remove( id );
    insertModel.remove( id );

    // クライアントで作成したデータの削除は含まない
    if ( _.isNumber(id) ) {
      deleteModel.add(id);
    }

  };

  change = function ( view_data ) {

    // 新規データかどうか
    if ( _.isNumber(view_data.id) ) {

      var item   = _.extend({}, _model.find({ id : view_data.id })[0] );
      var update = updateModel.find({ id : view_data.id });

      // 更新対象としてすでに登録されているかどうか
      if ( update.length ) {
        updateModel.push( view_data );
      }
      else {
        _.each( view_data, function ( val, key ) {
          item[key] = val;
        });
        updateModel.add( item );
      }

    }
    else {
      insertModel.push( view_data );
    }

  };

  save = function () {

    // model.insert();
    // model.update();
    // model.delete();
    // これらすべて終了後に再取得する
    // この順序処理が大変

  };

  // 新規かどうか
  // view_data[sid]があるかどうか？
  // 新規ならば
  //   cidを付与
  //   insertModel.push();
  // 新規でないならば
  //   updateModel.push();
  // Model.pushで内で既存変更か追加を判断してくれるようにする

  /* to public */
  cms.model.servers = {
    initModule : initModule,
    getServers : $.proxy( _model.getCache, _model ),
    find       : $.proxy( _model.find, _model ),
    getU       : function () { return updateModel; },
    getI       : function () { return insertModel; },
    getD       : function () { return deleteModel; },
    change     : change,
    remove     : remove,
    reset      : reset,
    update     : updateModel.update
  };


}( jQuery, customer ));