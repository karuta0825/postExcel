/**
 * メモビュー
 */

( function ( $, cms ) {

  var
    memoView
  , elements = {
      'btn' : {
        'save'   : '.btn--save',
        'cancel' : '.btn--cancel',
        'update' : '.btn--update',
        'delete' : '.btn--del'
      },
      'choice' : {
        'emergency' : '.emergency',
        'important' : '.important',
        'reminder'  : '.reminder'
      },
      'title'   : '.memo__title .title-value',
      'memo-priority' : '.memo__priority',
      'content' : '.memo__content .content-value',
      'dialog'  : '#modal-delete-memo'
    }
  , _selectPriority
  , _getViewInfo
  , _clear
  , _save
  , _update
  , _delete
  , changeEditMode
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
      title       : memoView.get('title').val(),
      priority_id : memoView.get('memo-priority').find('.choice--on').data('priority'),
      message     : memoView.get('content').val()
    };

    if ( memoView.wrap.attr('data-memo-id') ) {
        result.id = Number( memoView.wrap.attr('data-memo-id') );
        result.kid = cms.model.userBaseInfo.getCache().kid;
    };

    return result;

  };

  _clear = function () {

    memoView.get('title').val('');
    memoView.get('content').val('');

    memoView.get('choice__emergency').removeClass('choice--on');
    memoView.get('choice__important').removeClass('choice--on');
    memoView.get('choice__reminder').removeClass('choice--on');

    changeEditMode(false);

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
      cms.view.editUsrs.clearFilter();
    });

    memoView.wrap.get(0).close();

  };

  _update  = function () {

    var data = _getViewInfo();

    cms.model.userMemo.update( data );

    memoView.wrap.get(0).close();

  };

  _delete = function () {

    var data = _getViewInfo();

    cms.model.userMemo.remove( data );

    memoView.wrap.get(0).close();

  };

  reset = function () {

    memoView.get('title').val('');
    memoView.get('content').val('');

    memoView.get('choice__emergency').addClass('choice--on');
    memoView.get('choice__important').removeClass('choice--on');
    memoView.get('choice__reminder').removeClass('choice--on');

    changeEditMode(false);

  };

  makeViewInfo = function( data ) {

    _clear();

    data.id      && memoView.wrap.attr('data-memo-id', data.id );
    data.title   && memoView.get('title').val( data.title );
    data.message && memoView.get('content').val( data.message );

    // 優先度の設定
    data.priority_id && memoView.get('memo-priority')
      .find('[data-priority=' + data.priority_id + ']')
      .addClass('choice--on');

  };

  changeEditMode = function ( is_edit ) {
    if ( is_edit ) {
      memoView.get('btn__update').removeClass('is-hidden');
      memoView.get('btn__delete').removeClass('is-hidden');
      memoView.get('btn__save').addClass('is-hidden');
    }
    else {
      memoView.get('btn__update').addClass('is-hidden');
      memoView.get('btn__delete').addClass('is-hidden');
      memoView.get('btn__save').removeClass('is-hidden');
      memoView.wrap.removeAttr('data-memo-id');
    }
  };


  initModule = function () {

    memoView = new Controller('#modal-memo-item');

    util.confirm({
      selector : memoView.top,
      id       : 'modal-delete-memo',
      msg      : 'メモを削除しますか？',
      yes      : _delete
    });

    memoView.initElement( elements );

    memoView.addListener({
      'click btn__save' : _save,
      'click btn__cancel' : function () { memoView.wrap.get(0).close(); },
      'click btn__update' : _update,
      'click btn__delete' : function () { memoView.get('dialog').get(0).showModal(); },
      'click memo-priority' : _selectPriority
    });

  };

  // to public
  cms.view.userMemo = {
    initModule : initModule,
    makeViewInfo : makeViewInfo,
    changeEditMode : changeEditMode,
    reset        : reset,
    tmp : _getViewInfo
  };

}( jQuery, customer));