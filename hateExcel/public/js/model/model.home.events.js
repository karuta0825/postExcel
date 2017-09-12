/**
 * イベントモデル
 */

( function ( $, cms ) {

  var
    config = {
      'table' : 'events'
    }
  , _model = new Model(config)
  , vl = new util.Validate({
      'title'      : 'isEmpty',
      'start_on'   : 'isEmpty',
      'start_time' : 'noCheck',
      'message'    : 'noCheck',
      'is_finished': 'noCheck'
    })
  , validate
  , insert
  , update
  , remove
  ;

  /**
   * 新規イベントの作成
   * @param  {String} month           - YYYY-MM
   * @param  {Object} data            - 作成イベントオブジェクト
   * @param  {String} data.title      - タイトル
   * @param  {String} data.start_on   - 開始日付
   * @param  {String} data.start_time - 開始時間
   * @param  {String} data.message    - イベント内容
   * @param  {Function} cb_success    - イベント作成完了時コールバック
   * @param  {Function} cb_fail       - イベント作成失敗時コールバック
   */
  insert = function ( month, data, cb_success, cb_fail ) {

    var
      errors = vl.validate( data )
    , params = {
        table : 'events',
        data  : [data]
      }
    ;

    if ( errors.length > 0 ) {
      cb_fail(errors);
      return;
    }

    return cms.db.post('/insert', params )
    .then( function () {
      return _model.fetchAsync( month );
    })
    .then( function (r) {
      cb_success(r);
    });

  };

  /**
   * イベントの更新
   * @param  {String} month           - YYYY-MM
   * @param  {Object} data            - 作成イベントオブジェクト
   * @param  {String} data.title      - タイトル
   * @param  {String} data.start_on   - 開始日付
   * @param  {String} data.start_time - 開始時間
   * @param  {String} data.message    - イベント内容
   * @param  {Function} cb_success    - イベント更新完了時コールバック
   * @param  {Function} cb_fail       - イベント更新失敗時コールバック
   */
  update = function ( month, data, cb_success, cb_fail ) {

    var
      clone = _.clone( data )
    , params
    , errors
    ;

    delete clone.id;

    errors = vl.validate( clone );

    if ( errors.length > 0 ) {
      cb_fail( errors );
      return;
    }

    param = {
      data      : clone,
      condition : { id : data.id },
      table     : 'events'
    };

    return cms.db.post('/update', param )
    .then( function () {
      return _model.fetchAsync( month );
    })
    .then( function (r) {
      cb_success(r);
    });


  };

  /**
   * イベントの削除
   * @param  {String} month      - YYYY-MM
   * @param  {String} id         - イベントID
   * @param  {Function} callback - イベント削除時コールバック
   */
  remove = function ( month, id, callback ) {

    var param = {
      data : [{ id : id }],
      table : 'events'
    };

    return cms.db.post('/delete', param )
    .then( function () {
      return _model.fetchAsync( month );
    })
    .then( function (r) {
      callback(r);
    });

  };



  // to public
  cms.model.homeEvents = {
    fetch    : $.proxy( _model.fetchAsync, _model ),
    getCache : $.proxy( _model.getCache, _model ),
    find     : $.proxy( _model.find, _model ),
    insert   : insert,
    remove   : remove,
    update   : update
  };

} ( jQuery, customer ));