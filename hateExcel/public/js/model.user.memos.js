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

  // to public
  cms.model.userMemo = {
    fetch    : $.proxy( _model.fetch, _model ),
    makeMemo : makeMemo
  };

} ( jQuery, customer ));