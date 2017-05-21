/**
 * メモビュー
 */

( function ( $, cms ) {

  var
    memoView
  , elements = {
      'btn' : {
        'save' : '.btn--save',
        'cancel' : '.btn--cancel',
      },
      'memo-priority' : '.memo__priority',
      'choice' : {
        'emergency' : '.emergency',
        'important' : '.important',
        'reminder'  : '.reminder'
      },
      'title'   : '.memo__title .title-value',
      'content' : '.memo__content .content-value'
    }
  , _selectPriority
  , _getViewInfo
  , _clear
  , _save
  , reset
  , makeViewInfo
  , initModule
  ;

  _selectPriority = function ( e ) {

    var list_class = $( e.target ).attr('class').split(' ');

    switch ( list_class[1] ) {
      case 'emergency' :
        memoView.get('choice__emergency').addClass('choice--on');
        memoView.get('choice__important').removeClass('choice--on');
        memoView.get('choice__reminder').removeClass('choice--on');
        break;
      case 'important' :
        memoView.get('choice__emergency').removeClass('choice--on');
        memoView.get('choice__important').addClass('choice--on');
        memoView.get('choice__reminder').removeClass('choice--on');
        break;
      case 'reminder' :
        memoView.get('choice__emergency').removeClass('choice--on');
        memoView.get('choice__important').removeClass('choice--on');
        memoView.get('choice__reminder').addClass('choice--on');
        break;
      default :
        break;
    }

  };

  _getViewInfo = function () {

    var result =  {
      title    : memoView.get('title').val(),
      priority : memoView.get('memo-priority').find('.choice--on').data('priority'),
      message  : memoView.get('content').val()
    };

    return result;

  };

  _clear = function () {

    memoView.get('title').val('');
    memoView.get('content').val('');

    memoView.get('choice__emergency').removeClass('choice--on');
    memoView.get('choice__important').removeClass('choice--on');
    memoView.get('choice__reminder').removeClass('choice--on');

  };

  reset = function () {

    memoView.get('title').val('');
    memoView.get('content').val('');

    memoView.get('choice__emergency').addClass('choice--on');
    memoView.get('choice__important').removeClass('choice--on');
    memoView.get('choice__reminder').removeClass('choice--on');

  };


  /**
   * [_save description]
   * @return {[type]}
   * TODO: validate
   */
  _save = function () {
    var data = _getViewInfo();

    // validate

    cms.model.userMemo.makeMemo( data, function () {
      var kid = cms.model.userBaseInfo.getCache().kid
      cms.model.userMemo.fetch( kid,
        cms.view.editUsrs.makeMemos
      );
    });

    memoView.wrap.get(0).close();

  };

  makeViewInfo = function( data ) {

    _clear();

    data.title   && memoView.get('title').val( data.title );
    data.message && memoView.get('content').val( data.message );

    // 優先度の設定
    data.priority && memoView.get('memo-priority')
      .find('[data-priority=' + data.priority + ']')
      .addClass('choice--on');

  };


  initModule = function () {

    memoView = new Controller('#modal-memo-item');
    memoView.initElement( elements );

    memoView.addListener({
      'click btn__save' : _save,
      'click btn__cancel' : function () { memoView.wrap.get(0).close(); },
      'click memo-priority' : _selectPriority
    });

  };

  // to public
  cms.view.userMemo = {
    initModule : initModule,
    makeViewInfo : makeViewInfo,
    reset        : reset
  };

}( jQuery, customer));