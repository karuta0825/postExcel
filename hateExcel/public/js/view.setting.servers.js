/**
 * viewController
 * サーバー情報
 */
(function ($, cms) {

  var
  // member
    idx = 0
  , view = {}
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
        'body'        : '.setting__body',
        'table'       : 'table',
        'select_db'   : '.select-db',
        'select_type' : '.select-type'
      }
    }

  // private method
  , _changeValue
  , _changeVersion
  , _changeConnetDBVisibilty
  , _makeSelectBox
  , _setSelectValue
  , _onClickAdd
  , _onClickCancel
  , _onClickSave
  , _onClickDel
  , _drawTable
  , _redrawTable
  , _makeRow
  , _validate
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

    cms.model.servers.updateItem( map_update );

  };


  _changeVersion = function ( evt ) {

    var version = $(this).val();

    if ( version === 'LM' ) {
      view['LM'].wrap.removeClass('is-hidden');
      view['ES'].wrap.addClass('is-hidden');
    }
    else {
      view['ES'].wrap.removeClass('is-hidden');
      view['LM'].wrap.addClass('is-hidden');
    }

  };

  _changeConnetDBVisibilty = function ( evt ) {

    var
      type = $(evt.target).val()
    , tr   = $(evt.target).parents('tr')
    ;

    if ( type === 'AP' ) {
      tr.find('.select-db').removeClass('is-hidden');
    }
    else {
      tr.find('.select-db').addClass('is-hidden');
    }

  };

  _setSelectValue = function ( version ) {

    var tr, value;

    tr = view[version].get('table').find('tbody tr');

    _.each( tr, function ( el, idx ) {
      value = cms.model.servers.find( { id :$(el).data('id') })[0].connect_db;
      $(el).find('.select-db').val( value );
    });

  };

  _makeSelectBox = function ( version ) {

    var data = cms.model.servers.find({'version' : version, 'type' : 'DB'});

    view[version].get('select_db').empty();
    view[version].get('select_db').append( $('<option>'));

    _.each( data, function ( v, k ) {
      option = $('<option>', { 'value' : v['name'], 'text' : v['name'] } );
      view[version].get('select_db').append(option);
    });

    _setSelectValue( version );

  };


  _makeRow = function () {

    // DOM要素生成
    var
      tr          = $('<tr>',     { 'data-id' : 'c' + idx })
    , td_type     = $('<td>',     { class : 'type'} )
    , td_name     = $('<td>',     { class : 'name' } )
    , td_ip       = $('<td>',     { class : 'ip' } )
    , td_con_db   = $('<td>',     { class : 'connect_db' } )
    , td_del      = $('<td>',     { align : 'center', class : 'del' } )
    , input       = $('<input>',  { type  : 'text' } )
    , select_type = $('<select>', { class : 'select-type'})
    , select_db   = $('<select>', { class : 'select-db'})
    , opt_ap      = $('<option>', { value : 'AP', text : 'AP'} )
    , opt_db      = $('<option>', { value : 'DB', text : 'DB'} )
    , opt_web     = $('<option>', { value : 'WEB', text : 'WEB'} )
    , button      = $('<button>', { class : 'btn btn--del mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect'} )
    , icon        = $('<i>'     , { class : 'material-icons', text : 'delete_forever'})
    ;

    // cidの管理もモデルにやってほしいものだ
    idx += 1;
    select_type
      .append( opt_ap  )
      .append( opt_db  )
      .append( opt_web )
      ;

    td_type.append(select_type);
    td_name.append( $(input).clone(true) );
    td_ip.append(   $(input).clone(true) );
    td_con_db.append( select_db );
    td_del.append( button.append(icon) );

    tr.append(td_type)
      .append(td_name)
      .append(td_ip)
      .append(td_con_db)
      .append(td_del)
      ;

    return tr;

  };

  _drawTable = function ( data ) {

    var
      version  = data[0].version
    , data     =  { list : data }
    , tmpl     = customer.db.getHtml('template/servers.html')
    , complied = _.template( tmpl )
    ;

    view[version].get('body').append( complied(data) );
    view[version].updateElement({'select_db'   : '.select-db'});
    view[version].updateElement({'select_type' : '.select-type'});
    view[version].updateElement({'table'       : 'table'});

  };

  _redrawTable = function ( version ) {

    view[version].get('body').empty();
    _drawTable( customer.model.servers.find( {'version' : version } ) );

  };


  _onClickSave = function ( evt ) {

    var version = $(evt.target).parents('.setting').data('version')
    cms.model.servers.sendServer(version);

  };

  _onClickCancel = function ( evt ) {
    var version = $(evt.target).parents('.setting').data('version')
    _redrawTable( version );
    cms.model.servers.resetItems();
  };

  _onClickAdd = function ( evt ) {

    var
      version = $(evt.target).parents('.setting').data('version')
    , row = _makeRow();

    view[version].get('body').find('table').append(row);
    cms.model.servers.insertItem({
      'id'           : row.data('id'),
      'type'         : '',
      'name'         : '',
      'ip'           : '',
      'connect_db'   : '',
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
    cms.model.servers.removeItem( map );

  };

  _validate = function () {

  };

  // initialize module
  initModule = function () {
    // 同期処理させる
    $('.main-contents--settings-servers').append( customer.db.getHtml('setting.servers.html') );

    view   = {
      'BASE' : new Controller('.main-contents--settings-servers'),
      'LM'   : new Controller('.setting--lm-servers'),
      'ES'   : new Controller('.setting--es-servers')
    };

    view['BASE'].initElement( elements.select );
    view['LM'].initElement( elements.common );
    view['ES'].initElement( elements.common );

    _drawTable( customer.model.servers.find( {'version' : 'LM'} ) );
    _drawTable( customer.model.servers.find( {'version' : 'ES'} ) );

    _makeSelectBox('LM');
    _makeSelectBox('ES');

    view['BASE'].addListener({
      'change version' : _changeVersion
    });

    view['LM'].addListener({
      'click btn__add'     : _onClickAdd,
      'click btn__save'    : _onClickSave,
      'click btn__cancel'  : _onClickCancel,
      'click btn__del'     : _onClickDel,
      'change body'        : _changeValue,
      'change select_type' : _changeConnetDBVisibilty
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
  cms.view.servers = {
    initModule : initModule,
    redrawTable : redrawTable,
  };

}(jQuery, customer ));