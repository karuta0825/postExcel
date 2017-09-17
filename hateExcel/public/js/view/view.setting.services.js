/**
 * viewController
 * サーバー情報
 */
(function ($, cms) {

  var
  // member
    idx = 0
  , view = {}
  , elements = {
      'select' : {
        'version' : '.select-version',
        'alert'   : '#modal-services-alert',
      },
      'common' : {
        'btn' : {
          'add'    : '.btn--add',
          'cancel' : '.btn--cancel',
          'save'   : '.btn--save',
          'del'    : '.btn--del',
        },
        'body'  : '.setting__body',
        'table' : '.mdl-data-table'
      }
    }
  // private method
  , _changeValue
  , _changeVersion
  , _onClickCancel
  , _onClickSave
  , _drawTable
  , _makeRow
  , _validate
  // public method
  , initModule
  , redrawTable
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
      view['LM'].wrap.removeClass('is-hidden');
      view['ES'].wrap.addClass('is-hidden');
    }
    else {
      view['LM'].wrap.addClass('is-hidden');
      view['ES'].wrap.removeClass('is-hidden');
    }

  };

  _makeRow = function () {

    // DOM要素生成
    var
      tr              = $('<tr>',     { 'data-id' : 'c' + idx })
    , td_service_id   = $('<td>',     { class : 'service_id'} )
    , td_service_name = $('<td>',     { class : 'service_name' } )
    , td_sales_id     = $('<td>',     { class : 'sales_id' } )
    , td_del          = $('<td>',     { align : 'center', class : 'del' } )
    , input_id        = $('<input>',  { type  : 'text', maxlength : 2 } )
    , input_name      = $('<input>',  { type  : 'text', maxlength : 20 } )
    , input_sales_id  = $('<input>',  { type  : 'text', maxlength : 20 } )
    , button          = $('<button>', { class : 'btn btn--del mdl-button mdl-js-button mdl-button--icon'} )
    , icon            = $('<i>'     , { class : 'material-icons', text : 'delete_forever'})
    ;

    idx += 1;

    td_service_id.append(   input_id  );
    td_service_name.append( input_name );
    td_sales_id.append( input_sales_id );
    td_del.append( button.append(icon) );

    tr.append(td_service_id)
      .append(td_service_name)
      .append(td_sales_id)
      .append(td_del)
      ;

    return tr;

  };

  _validate = function ( list, version ) {

    var id, tr;

    // 初期化
    view[version].wrap.find('.service_id input').removeClass('is-error');
    view[version].wrap.find('.service_name input').removeClass('is-error');


    if ( list.length !== 0 ) {
      _.each( list, function (item,idx) {

        id = item.shift();

        tr = view[version].wrap.find('[data-id=' + id + ']');

        _.each( item, function (v,k) {
          tr.find('.' + v).find('input').addClass('is-error');
        });

      });

      return false;
    }

    return true;


  };

  _drawTable = function ( data ) {

    var
      version  = data[0].version
    , data     =  { list : data }
    , tmpl     = customer.db.getHtml('template/services.html')
    , complied = _.template( tmpl )
    ;

    view[version].get('body').append( complied(data) );
    view[version].updateElement({'table': 'table'});

  };


  // Listeners
  _onClickSave = function ( evt ) {

    var version = $(evt.target).parents('.setting').data('version')
    var list = customer.model.services.validate(version);

    // 処理完了まで連続クリックを防止
    view[version].get('btn__save').prop('disabled', true);

    if ( !_validate(list,version) ) {
      view['BASE'].get('alert').get(0).showModal();
      return;
    }

    cms.model.services.sendServer(version)
    .then(function() {
      view[version].get('btn__save').prop('disabled', false);
    });

  };

  _onClickCancel = function ( evt ) {
    var version = $(evt.target).parents('.setting').data('version')
    redrawTable( version );
    cms.model.services.resetItems();
  };

  _onClickAdd = function ( evt ) {

    var
      version = $(evt.target).parents('.setting').data('version')
    , row = _makeRow();

    view[version].get('body').find('table').append(row);
    cms.model.services.insertItem({
      'id'           : row.data('id'),
      'service_id'   : '',
      'service_name' : '',
      'version'      : version
    });

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

  redrawTable = function ( version ) {

    view[version].get('body').empty();
    _drawTable( customer.model.services.find( {'version' : version, 'is_setup_info' : 0} ) );

  };

  initModule = function () {
    // 同期処理させる
    $('.main-contents--settings-services').append( customer.db.getHtml('html/setting.services.html') );

    view['BASE'] = new Controller('.main-contents--settings-services');
    view['LM']   = new Controller('.setting--lm-services');
    view['ES']   = new Controller('.setting--es-services');

    util.alert({
      selector : view['BASE'].top,
      id       : 'modal-services-alert',
      msg      : '入力に誤りがあります'
    });

    view['BASE'].initElement( elements.select );
    view['LM'].initElement( elements.common );
    view['ES'].initElement( elements.common );

    _drawTable( customer.model.services.find( {'version' : 'LM', 'is_setup_info' : 0 } ) );
    _drawTable( customer.model.services.find( {'version' : 'ES', 'is_setup_info' : 0 } ) );


    view['BASE'].addListener({
      'change version' : _changeVersion
    });

    view['LM'].addListener({
      'click btn__add'    : _onClickAdd,
      'click btn__save'   : _onClickSave,
      'click btn__cancel' : _onClickCancel,
      'click btn__del'    : _onClickDel,
      'change body'       : _changeValue
    });

    view['ES'].addListener({
      'click btn__add'    : _onClickAdd,
      'click btn__save'   : _onClickSave,
      'click btn__cancel' : _onClickCancel,
      'click btn__del'    : _onClickDel,
      'change body'       : _changeValue
    });

  };

  // to public
  cms.view.services = {
    initModule : initModule,
    redrawTable : redrawTable
  };

}(jQuery, customer));