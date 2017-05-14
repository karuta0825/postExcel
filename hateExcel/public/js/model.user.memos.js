/**
 * メモモデル
 */

( function ( $, cms ) {

  var
    _model = new Model({
      'table' : 'memos'
    })
  ;

  // to public
  cms.model.userMemos = {
    fetch : $.proxy( _model.fetch, _model )
  };

} ( jQuery, customer ));