/**
 * メモモデル
 */

( function ( $, cms ) {

  var
    _model = new Model({
      'table' : 'memos'
    })
  , vl = new util.Validate({
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

  makeMemo = function ( data, callback ) {

    data['kid'] = cms.model.userBaseInfo.getCache().kid;

    cms.db.insert('/makeMemo', {
      'data'     : data,
    }, callback );

  };

  update = function ( data ) {

    var clone = _.clone( data );

    delete clone.id;
    delete clone.kid;

    var param = {
      data      : clone,
      condition : { id : data.id },
      table     : 'memos'
    };

    cms.db.update('/update', param, function () {
      _model.fetch( data.kid, cms.view.editUsrs.makeMemos );
    });

  };

  remove = function ( data ) {

    var param = {
      data : [{ id : data.id}],
      table : 'memos'
    };

    cms.db.remove('/delete', param, function () {
      _model.fetch( data.kid, cms.view.editUsrs.makeMemos );
    });

  };

  // to public
  cms.model.userMemo = {
    fetch    : $.proxy( _model.fetch, _model ),
    find     : $.proxy( _model.find, _model ),
    validate : validate,
    update   : update,
    remove   : remove,
    makeMemo : makeMemo
  };

} ( jQuery, customer ));