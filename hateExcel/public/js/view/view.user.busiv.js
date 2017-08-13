
/**
 * busiv画面
 */

( function ( $, cms ) {

  var
    view
  , elements = {
      'input' : {
        'circuit_name'           : '.circuit_name'      ,
        'circuit_service'        : '.circuit_service'   ,
        'open_date'              : '.open_date'         ,
        'w_network'              : '.w_network'         ,
        'w_subnet'               : '.w_subnet'          ,
        'w_router'               : '.w_router'          ,
        'has_sx'                 : '.has_sx'            ,
        'how_to_cooperate'       : '.how_to_cooperate'  ,
        'has_L3'                 : '.has_L3'            ,
        'sx_ip'                  : '.sx_ip'             ,
        'has_carte'              : '.has_carte'         ,
        'carte_system'           : '.carte_system'      ,
        'carte_html_save_ip'     : '.carte_html_save_ip',
        'has_cc'                 : '.has_cc'            ,
        'cc_ip'                  : '.cc_ip'             ,
        'download_server_ip'     : '.download_server_ip',
        'auth_server_ip'         : '.auth_server_ip'
      },
      'alert' : '#modal-userBusiv-alert'
    }
  , _selectChoice
  , showError
  , isHidden
  , goEditMode
  , goViewMode
  , setViewInfo
  , getViewInfo
  , refresh
  , initModule
  ;

  _selectChoice    = function () {
    var
      el_pushed = $(event.target)
    , className = el_pushed.attr('class').split(' ')[0]
    , yes = $( $(this).find('button').get(0) )
    ;

    if ( className === 'choice' && el_pushed.parents('li').hasClass('is-edit') ) {
      yes.toggleClass('choice--on');
    }

  };

  isHidden = function () {
    return view.wrap.hasClass('is-hidden');
  };

  showError = function ( list_key ) {

    _.each( list_key, function ( v,k ) {
      view.get('input__' + v )
      .find('.item-value').addClass('is-error');
    });

    view.get('alert').get(0).showModal();

  };

  goViewMode = function () {

    // エラー外す
    _.each( view.get('input'), function ( v,k ) {
      $(v).find('.item-value').removeClass('is-error');
    });

    _.each( view.get('input'), function (val,key) {
      val.find('.item-value').removeClass('is-edit');
      val.find('.item-value').prop('disabled', true);
    });

    // buisvセレクトボックスの編集不可能
    view.get('input')['has_sx'].removeClass('is-edit');
    view.get('input')['has_L3'].removeClass('is-edit');
    view.get('input')['has_carte'].removeClass('is-edit');
    view.get('input')['has_cc'].removeClass('is-edit');

  };

  goEditMode = function () {

    _.each( view.get('input'), function (val,key) {
      val.find('.item-value').addClass('is-edit');
      val.find('.item-value').prop('disabled', false);
    });

    // buisvセレクトボックスの編集可能
    view.get('input')['has_sx'].addClass('is-edit');
    view.get('input')['has_L3'].addClass('is-edit');
    view.get('input')['has_carte'].addClass('is-edit');
    view.get('input')['has_cc'].addClass('is-edit');

  };

  setViewInfo = function ( data ) {

    var data = _.isArray( data ) ? data[0] : data;

    if ( !data ) {
      return;
    }

    _.each( view.get('input'), function (v,k) {
      v.find('.item-value').val( data[k] );
    });

    // sx連携
    if ( data.has_sx === 1 ) {
      view.get('input__has_sx').find('.yes_sx').addClass('choice--on');
    }
    else {
      view.get('input__has_sx').find('.yes_sx').removeClass('choice--on');
    }

    //　L3有無
    if ( data.has_L3 === 1) {
      view.get('input__has_L3').find('.yes_L3').addClass('choice--on');
    }
    else {
      view.get('input__has_L3').find('.yes_L3').removeClass('choice--on');
    }

    // カルテ連携
    if ( data.has_carte === 1 ) {
      view.get('input__has_carte').find('.yes_carte').addClass('choice--on');
    }
    else {
      view.get('input__has_carte').find('.yes_carte').removeClass('choice--on');
    }

    //　CC連携
    if ( data.has_cc === 1) {
      view.get('input__has_cc').find('.yes_cc').addClass('choice--on');
    }
    else {
      view.get('input__has_cc').find('.yes_cc').removeClass('choice--on');
    }

  };

  getViewInfo = function () {

    var
      result = {}
    , list_choice = ['has_sx', 'has_L3', 'has_carte', 'has_cc']
    ;

    _.each( view.get('input'), function (v,k) {
      result[k] = v.find('.item-value').val();
    });

    // 選択形式の入力の値を取得
    _.each( list_choice, function (v,k) {

      if ( view.get('input')[v].find('.choice').hasClass('choice--on') ) {
        result[v] = 1
      }
      else {
        result[v]= 0
      }
      ;

    });

    return result;

  };

  refresh = function () {
    cms.model.userBusiv.getCache( setViewInfo );
  };

  initModule = function () {

    view = new Controller('.busiv-section');

    util.alert({
      selector : view.top,
      id       : 'modal-userBusiv-alert',
      msg      : '入力に誤りがあります'
    });

    view.initElement( elements );

    view.addListener({
      'click input__has_sx'    : _selectChoice,
      'click input__has_L3'    : _selectChoice,
      'click input__has_carte' : _selectChoice,
      'click input__has_cc'    : _selectChoice,
    });

  };

  cms.view.userBusiv = {
    initModule : initModule,
    show : function () { view.wrap.removeClass('is-hidden');},
    hide : function () { view.wrap.addClass('is-hidden'); },
    setViewInfo : setViewInfo,
    getViewInfo : getViewInfo,
    refresh     : refresh,
    goViewMode  : goViewMode,
    goEditMode  : goEditMode,
    showError   : showError,
    isHidden    : isHidden
  };

} ( jQuery, customer ))