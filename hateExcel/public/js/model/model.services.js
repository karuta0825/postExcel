/**
 * サービスマスタ+ユーザライセンスモデル
 *
 */
( function ( $, cms ) {

  /*member*/
  var
    _model = new Model({ table : 'services' })
  , list_es = new Model()
  , list_lm = new Model()
  , vl = new util.Validate({
      'id'            : 'noCheck',
      'sales_id'      : 'noCheck',
      'service_id'    : 'isEmpty',
      'service_name'  : 'isEmpty',
      'version'       : 'noCheck',
      'is_setup_info' : 'noCheck'
    })
  , validate
  , initModule
  , insertItem
  , removeItem
  , updateItem
  , resetItems
  , sendServer
  ;

  validate = function ( version, callback ) {

    var
      list
    , id
    , err
    , errs = []
    ;

    if ( version === 'LM' ) {
      list = list_lm.getCache();
    }
    else {
      list = list_es.getCache();
    }

    _.each( list, function (v,k) {

      id = v.id;
      err = vl.validate(v);

      if ( err.length !== 0 ) {
        err.unshift(id);
        errs.push(err);
      }

    });

    if ( typeof callback === 'function') {
      callback(errs, version);
    }
    else {
      return errs;
    }

  };


  initModule = function () {
    _model.fetch();
    // クローンを作成する
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

    var params = {};

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

    return cms.db.post('/master/services', params )
    .then(function (){
      initModule();
      cms.view.services.redrawTable(version);
    });

  };

  // to public
  cms.model.services =  {
    initModule : initModule,
    fetch      : $.proxy( _model.fetch, _model ),
    getCache   : $.proxy( _model.getCache, _model ),
    find       : $.proxy( _model.find, _model ),
    updateItem : updateItem,
    insertItem : insertItem,
    removeItem : removeItem,
    resetItems : resetItems,
    sendServer : sendServer,
    validate   : validate
  };

}( jQuery, customer ));