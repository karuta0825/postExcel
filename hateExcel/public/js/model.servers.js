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
  , vl = new util.Validate({
      id         : 'noCheck',
      type       : 'noCheck',
      name       : 'isEmpty',
      ip         : 'isIp_f',
      connect_db : 'noCheck',
      version    : 'noCheck',
      capacity   : 'noCheck',
      environment_id : 'noCheck'
    })
  , initModule
  , insertItem
  , removeItem
  , updateItem
  , resetItems
  , sendServer
  , validate
  ;

  /**
   * どんな結果が帰ってくれるとうれしんだ？
   * idea1 [{id:1, key1:'msg', key2:'msg'}, {id:3, key1:'msg', key2:'msg'}]
   * idea2 [[1,key1,key2],[3,key1,key3]]
   * @param  {[type]} version
   * @return {[type]}
   */
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

    cms.db.post('/master', params )
    .then( function () {
      _model.fetch();
      // ユーザ一覧のサーバー選択肢を更新
      cms.view.kids.selectServer('all');
    });

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
    validate   : validate
  };


}( jQuery, customer ));