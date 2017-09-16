/**
 * メモモデル
 */

( function ( $, cms ) {

  var
    _model = new Model({
      'table' : 'memos'
    })
  , vl = new util.Validate({
      'id'          : 'noCheck',
      'kids_id'     : 'noCheck',
      'priority_id' : 'noCheck',
      'title'       : 'isEmpty',
      'message'     : 'isEmpty'
    })
  , validate
  , makeMemo
  , update
  , remove
  ;

  /**
   * 入力チェック
   * @param  {Object} view_data - 画面の入力データ
   * @return {Array}            - 入力エラーのkey
   */
  validate = function ( view_data ) {
    return vl.validate( view_data );
  };

  /**
   * メモを作成する
   * @param  {Object}   data
   * @param  {String}   data.title
   * @param  {Number}   data.priority_id
   * @param  {String}   data.message
   * @param  {Function} callback
   * @return {Promise}
   */
  makeMemo = function ( data, callback ) {

    data['kids_id'] = cms.model.userBaseInfo.getCache().id;

    return cms.db.post('/makeMemo', {
      'data'     : data,
    })
    .then( function () {
      callback();
    })
    .then( function () {
      // 個別対応の場合、星マークをつける必要あるため
      cms.view.kids.refresh();
    })
    ;


  };

  /**
   * メモを更新する
   * @param  {Object}   data
   * @param  {String}   data.id          - メモID
   * @param  {String}   data.title       - メモタイトル
   * @param  {Number}   data.priority_id - 優先度ID
   * @param  {String}   data.message     - メモ内容
   * @return {Promise}
   */
  update = function ( data ) {

    var clone = _.clone( data );

    delete clone.id;
    delete clone.kids_id;

    var param = {
      data      : clone,
      condition : { id : data.id },
      table     : 'memos'
    };

    return cms.db.post('/update', param )
    .then( function () {
      return _model.fetchAsync( data.kids_id );
    })
    .then( function (r) {
      cms.view.editUsrs.makeMemos(r);
    })
    .then( function () {
      cms.view.kids.refresh();
    });

  };

  /**
   * メモを削除する
   * @param  {Object}   data
   * @param  {String}   data.id          - メモID
   * @param  {String}   data.title       - メモタイトル
   * @param  {Number}   data.priority_id - 優先度ID
   * @param  {String}   data.message     - メモ内容
   * @return {Promise}
   */
  remove = function ( data ) {

    var param = {
      data : [{ id : data.id}],
      table : 'memos'
    };

    return cms.db.post('/delete', param )
    .then( function () {
      return _model.fetchAsync( data.kids_id );
    })
    .then( function (r) {
      cms.view.editUsrs.makeMemos(r);
    })
    .then( function () {
      cms.view.kids.refresh();
    });

  };

  // to public
  cms.model.userMemo = {
    fetch    : $.proxy( _model.fetchAsync, _model ),
    find     : $.proxy( _model.find, _model ),
    validate : validate,
    update   : update,
    remove   : remove,
    makeMemo : makeMemo
  };

} ( jQuery, customer ));