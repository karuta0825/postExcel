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
        'reminder'  : '.reminder',
        'special'   : '.special',
      },
      'input' : {
        'title'         : '.memo__title .title-value',
        'memo-priority' : '.memo__priority',
        'message'       : '.memo__content .content-value'
      },
      'template' : {
        'select' : '.memo__template select',
      },
      'dialog'  : '#modal-delete-memo',
      'alert'   : '#modal-alert-memo'
    }
  , _inputError
  , _selectPriority
  , _selectTemplate
  , _getViewInfo
  , _clear
  , _save
  , _cancel
  , _update
  , _delete
  , changeEditMode
  , makeTemplateOption
  , reset
  , refresh
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
        memoView.get('choice__special').removeClass('choice--on');
        break;
      case 'important' :
        memoView.get('choice__emergency').removeClass('choice--on');
        memoView.get('choice__important').addClass('choice--on');
        memoView.get('choice__reminder').removeClass('choice--on');
        memoView.get('choice__special').removeClass('choice--on');
        break;
      case 'reminder' :
        memoView.get('choice__emergency').removeClass('choice--on');
        memoView.get('choice__important').removeClass('choice--on');
        memoView.get('choice__reminder').addClass('choice--on');
        memoView.get('choice__special').removeClass('choice--on');
        break;
      case 'special' :
        memoView.get('choice__emergency').removeClass('choice--on');
        memoView.get('choice__important').removeClass('choice--on');
        memoView.get('choice__reminder').removeClass('choice--on');
        memoView.get('choice__special').addClass('choice--on');
        break;
      default :
        break;
    }

  };

  _selectTemplate = function () {

    var
      template_id = Number($(this).val())
    , template = cms.model.memoTemplate.find({id : template_id})[0]
    ;

    if ( !template ) { return; }

    memoView.get('input__title').val( template.title );
    memoView.get('input__message').val( template.msg );

  };

  _getViewInfo = function () {

    var result =  {
      title       : memoView.get('input__title').val(),
      priority_id : memoView.get('input__memo-priority').find('.choice--on').data('priority'),
      message     : memoView.get('input__message').val()
    };

    if ( memoView.wrap.attr('data-memo-id') ) {
        result.id      = Number( memoView.wrap.attr('data-memo-id') );
        result.kids_id = cms.model.userBaseInfo.getCache().id;
    };

    return result;

  };


  _clear = function () {

    memoView.get('input__title').val('');
    memoView.get('input__message').val('');

    memoView.get('choice__emergency').removeClass('choice--on');
    memoView.get('choice__important').removeClass('choice--on');
    memoView.get('choice__reminder').removeClass('choice--on');

    memoView.get('template__select').val('');

    changeEditMode(false);

  };

  makeTemplateOption = function ( list ) {

    var option;

    memoView.get('template__select').empty();

    option = $('<option>', { 'value' : '', 'text' : 'なし' });
    memoView.get('template__select').append(option);

    _.each( list, function (item, idx) {

      option = $('<option>', { 'value' : item.id, 'text' : item.title });
      memoView.get('template__select').append(option);

    });

  };

  /**
   * [_save description]
   * @return {[type]}
   * TODO: validate
   */
  _save = function () {
    var
      data = _getViewInfo()
    , kids_id = cms.model.userBaseInfo.getCache().id
    , errors
    ;

    errors = cms.model.userMemo.validate(data);

    _.each( memoView.get('input'), function (val, key){
      val.removeClass('is-error');
    });

    if ( errors.length !== 0 ) {
      _.each( errors, function ( v, k ) {
        memoView.get('input__' + v).addClass('is-error');
      });
      memoView.get('alert').get(0).showModal();
      return;
    };

    cms.model.userMemo.makeMemo( data )
    .then( function () {
      return cms.model.userMemo.fetch( kids_id );
    })
    .then( function (r) {
      cms.view.editUsrs.makeMemos(r);
    })
    // メモのフィルターを初期化
    .then( cms.view.editUsrs.clearMemoFilter )
    // 個別対応の場合、星マークをつける必要あるため
    .then( cms.view.kids.refresh );

    memoView.wrap.get(0).close();

  };

  _cancel = function () {

    // エラー表示解除
    _.each( memoView.get('input'), function (val, key){
      val.removeClass('is-error');
    });

    memoView.wrap.get(0).close();

  };

  _update  = function () {

    var
      data = _getViewInfo()
    , errors
    ;

    errors = cms.model.userMemo.validate(data);

    _.each( memoView.get('input'), function (val, key){
      val.removeClass('is-error');
    });

    if ( errors.length !== 0 ) {
      _.each( errors, function ( v, k ) {
        memoView.get('input__' + v).addClass('is-error');
      });
      memoView.get('alert').get(0).showModal();
      return;
    };

    cms.model.userMemo.update( data )
    .then( function (r) {
      cms.view.editUsrs.makeMemos(r);
    })
    .then( function () {
      cms.view.kids.refresh();
    })
    ;

    memoView.wrap.get(0).close();

  };

  _delete = function () {

    var data = _getViewInfo();

    cms.model.userMemo.remove( data )
    .then( function (r) {
      cms.view.editUsrs.makeMemos(r);
    })
    .then( function () {
      cms.view.kids.refresh();
    });

    memoView.wrap.get(0).close();

  };

  reset = function () {

    memoView.get('input__title').val('');
    memoView.get('input__message').val('');

    memoView.get('choice__emergency').addClass('choice--on');
    memoView.get('choice__important').removeClass('choice--on');
    memoView.get('choice__reminder').removeClass('choice--on');
    memoView.get('choice__special').removeClass('choice--on');

    changeEditMode(false);

  };

  refresh = function () {
    var kids_id = cms.model.userBaseInfo.getCache().id;
    cms.model.userMemo.fetch( kids_id, cms.view.editUsrs.makeMemos );
  };

  makeViewInfo = function( data ) {

    _clear();

    data.id      && memoView.wrap.attr('data-memo-id', data.id );
    data.title   && memoView.get('input__title').val( data.title );
    data.message && memoView.get('input__message').val( data.message );

    // 優先度の設定
    data.priority_id && memoView.get('input__memo-priority')
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

    util.alert({
      selector : memoView.top,
      id       : 'modal-alert-memo',
      msg      : '入力に誤りがあります'
    });

    memoView.initElement( elements );

    memoView.addListener({
      'click btn__save'   : _save,
      'click btn__cancel' : _cancel,
      'click btn__update' : _update,
      'click btn__delete' : function () { memoView.get('dialog').get(0).showModal(); },
      'click input__memo-priority' : _selectPriority,
      'change template__select' : _selectTemplate
    });

  };

  // to public
  cms.view.userMemo = {
    initModule : initModule,
    makeViewInfo : makeViewInfo,
    changeEditMode : changeEditMode,
    reset        : reset,
    makeTemplateOption : makeTemplateOption,
    refresh : refresh
  };

}( jQuery, customer));