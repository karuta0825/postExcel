/**
 * メモモデル
 */

( function ( $, cms ) {

  var
    _model = new Model({
      'table' : 'memos'
    })
  , makeMemo
  ;


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
    update   : update,
    remove   : remove,
    makeMemo : makeMemo
  };

} ( jQuery, customer ));