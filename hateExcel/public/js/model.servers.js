/**
 * サーバモデル
 */
( function ( $, cms ) {

  /* member */
  var
    _model = new Model({
      table : 'servers'
    })
  , list_es = new Model()
  , list_lm = new Model()
  , initModule
  , insertItem
  , removeItem
  , updateItem
  , resetItems
  , sendServer
  ;


  initModule = function () {
    _model.fetch();
    list_lm['_cache'] = _.map( _model.find({ 'version' : 'LM' }), _.clone );
    list_es['_cache'] = _.map( _model.find({ 'version' : 'ES' }), _.clone );
  };

  insertItem = function ( map ) {

    var version = map.version;
    if ( version === 'LM' ) {
      list_lm.add( map );
    }
    else {
      list_es.add( map );
    }

  };

  removeItem = function ( map ) {

    var version = map.version;

    if ( version === 'LM' ) {
      list_lm.remove( map.id );
    }
    else {
      list_es.remove( map.id );
    }

  };

  updateItem = function ( map ) {

    var
      version = map.version
    , target
    ;

    if ( version === 'LM' ) {
      target = list_lm.find({ id : map.id })[0];
    }
    else {
      target = list_es.find({ id : map.id })[0];
    }

    target[map.key] = map.value;

  };

  resetItems = function () {
    list_lm['_cache'] = _.map( _model.find({ 'version' : 'LM' }), _.clone );
    list_es['_cache'] = _.map( _model.find({ 'version' : 'ES' }), _.clone );
  };

  sendServer = function ( version ) {

    var params = {
      'table' : 'servers'
    };

    if ( version === 'LM' ) {
      params.items = _.each( list_lm.getCache(), function (v,k) {
        if ( _.isString(v.id) ) { delete v.id }
      });
    }
    else {
      params.items = _.each( list_es.getCache(), function (v,k) {
        if ( _.isString(v.id) ) { delete v.id }
      });
    }

    console.log(params);

    // cms.db.insert('/master', params, function ( result ) {
    //   console.log(result);
    // });

  };




  /* to public */
  cms.model.servers = {
    initModule : initModule,
    getServers : $.proxy( _model.getCache, _model ),
    find       : $.proxy( _model.find, _model ),
    updateItem : updateItem,
    insertItem : insertItem,
    removeItem : removeItem,
    resetItems : resetItems,
    sendServer : sendServer,
    get        : function () { return [list_lm, list_es]; }
  };


}( jQuery, customer ));