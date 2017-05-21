/**
 * サーバモデル
 */
( function ( $, cms ) {

  /* member */
  var
    _model = new Model({
      table : 'servers'
    })
  , selectModel = new Model()
  , insertModel = new Model()
  , initModule
  ;

  initModule = function () {
    _model.fetch();
  };


  change = function ( view_data ) {

    var item = selectModel.find({ id : view_data.id});

    if ( item.length !== 0 ) {
      item[view_data.key] = view_data.key;
    }
    else {

      // insert対象
      if ( _model.find({id : view_data.id}).length === 0 ) {
        insertModel.push(view_data);
      }
      // update対象
      else {
        selectModel.push(view_data);
      }
    }

  };


  /* to public */
  cms.model.servers = {
    initModule : initModule,
    getServers : $.proxy( _model.getCache, _model ),
    find       : $.proxy( _model.find, _model ),
    tmp : function () { return selectModel },
    change : change
  };


}( jQuery, customer ));