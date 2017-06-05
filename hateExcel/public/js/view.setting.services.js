/**
 * viewController
 * サーバー情報
 */
(function ($, cms) {

  var
  // member
    idx = 0
  , view
  , esView
  , lmView
  , elements = {
      'select' : {
        'version' : '.select-version',
      },
      'common' : {
        'btn' : {
          'add'    : '.btn--add',
          'cancel' : '.btn--cancel',
          'save'   : '.btn--save',
          'del'    : '.btn--del',
        },
        'body'  : '.setting__body',
        'table' : 'table',
      }
    }
  // private method
  , _changeValue
  , _changeVersion
  , _onClickCancel
  , _onClickSave
  , _drawTable
  , _redrawTable
  , _makeRow
  // public method
  , initModule
  ;

  _changeValue = function ( evt ) {

    var
      map_update = {
        id      : $(evt.target).parents('tr').data('id'),
        key     : $(evt.target).parents('td').attr('class'),
        value   : $(evt.target).val(),
        version : $(evt.target).parents('.setting').data('version')
      }
    ;

    cms.model.services.updateItem( map_update );

  };

  _changeVersion = function ( evt ) {

    var version = $(this).val();

    if ( version === 'LM' ) {
      lmView.wrap.removeClass('is-hidden');
      esView.wrap.addClass('is-hidden');
    }
    else {
      lmView.wrap.addClass('is-hidden');
      esView.wrap.removeClass('is-hidden');
    }

  };

  _makeRow = function () {

    // DOM要素生成
    var
      tr              = $('<tr>',     { 'data-id' : 'c' + idx })
    , td_service_id   = $('<td>',     { class : 'service_id'} )
    , td_service_name = $('<td>',     { class : 'service_name' } )
    , td_del          = $('<td>',     { align : 'center', class : 'del' } )
    , input_id        = $('<input>',  { type  : 'text', maxlength : 2 } )
    , input_name      = $('<input>',  { type  : 'text', maxlength : 20 } )
    , button          = $('<button>', { class : 'btn btn--del mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect'} )
    , icon            = $('<i>'     , { class : 'material-icons', text : 'delete_forever'})
    ;

    idx += 1;

    td_service_id.append(   input_id  );
    td_service_name.append( input_name );
    td_del.append( button.append(icon) );

    tr.append(td_service_id)
      .append(td_service_name)
      .append(td_del)
      ;

    return tr;

  };

  _drawTable = function ( data ) {

    var
      version  = data[0].version
    , data     =  { list : data }
    , tmpl     = customer.db.getHtml('template/services.html')
    , complied = _.template( tmpl )
    ;

    if ( version === 'LM' ) {
      lmView.get('body').append( complied(data) );
    }
    else {
      esView.get('body').append( complied(data) );
    }

  };

  _redrawTable = function ( version ) {

    if ( version === 'LM' ) {
      lmView.get('body').empty();
      _drawTable( customer.model.services.find( {'version' : 'LM'} ) );
    }
    else {
      esView.get('body').empty();
      _drawTable( customer.model.services.find( {'version' : 'ES'} ) );
    }

  };

  // Listeners
  _onClickSave = function ( evt ) {

    var version = $(evt.target).parents('.setting').data('version')
    cms.model.services.sendServer(version);

  };

  _onClickCancel = function ( evt ) {
    var version = $(evt.target).parents('.setting').data('version')
    _redrawTable( version );
    cms.model.services.resetItems();
  };

  _onClickAdd = function ( evt ) {

    var
      version = $(evt.target).parents('.setting').data('version')
    , row = _makeRow();

    if ( version === 'LM' ) {
      lmView.get('body').find('table').append(row);
      cms.model.services.insertItem({
        'id'           : row.data('id'),
        'service_id'   : '',
        'service_name' : '',
        'version'      : 'LM'
      });
    }
    else {
      esView.get('body').find('table').append(row);
      cms.model.services.insertItem({
        'id'           : row.data('id'),
        'service_id'   : '',
        'service_name' : '',
        'version'      : 'ES'
      });
    }

  };

  _onClickDel = function ( evt ) {

    var
      tr = $(evt.target).parents('tr')
    , map = {
        id      : tr.data('id'),
        version : $(evt.target).parents('.setting').data('version')
      }
    ;

    tr.remove();

    // モデルに通知
    cms.model.services.removeItem( map );

  };


  initModule = function () {
    // 同期処理させる
    $('.main-contents--settings-services').append( customer.db.getHtml('setting.services.html') );

    view   = new Controller('.main-contents--settings-services');
    lmView = new Controller('.setting--lm-services');
    esView = new Controller('.setting--es-services');

    view.initElement(   elements.select );
    lmView.initElement( elements.common );
    esView.initElement( elements.common );

    _drawTable( customer.model.services.find( {'version' : 'LM'} ) );
    _drawTable( customer.model.services.find( {'version' : 'ES'} ) );

    view.addListener({
      'change version' : _changeVersion
    });

    lmView.addListener({
      'click btn__add'    : _onClickAdd,
      'click btn__save'   : _onClickSave,
      'click btn__cancel' : _onClickCancel,
      'click btn__del'    : _onClickDel,
      'change body'       : _changeValue
    });

    esView.addListener({
      'click btn__add'    : _onClickAdd,
      'click btn__save'   : _onClickSave,
      'click btn__cancel' : _onClickCancel,
      'click btn__del'    : _onClickDel,
      'change body'       : _changeValue
    });

  };

  // to public
  cms.view.services = {
    initModule : initModule
  };

}(jQuery, customer));