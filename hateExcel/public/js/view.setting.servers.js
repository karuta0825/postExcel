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
        'body'      : '.setting__body',
        'table'     : 'table',
        'select_db' : '.select-db'
      }
    }

  // private method
  , _changeValue
  , _changeVersion
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
      lmView.wrap.removeClass('is-hidden');
      esView.wrap.addClass('is-hidden');
    }
    else {
      lmView.wrap.addClass('is-hidden');
      esView.wrap.removeClass('is-hidden');
    }

  };

  _setSelectValue = function ( version ) {

    var tr, value;

    if ( version === 'LM' ) {
      tr = lmView.get('table').find('tbody tr');
    }
    else {
      tr = esView.get('table').find('tbody tr');
    }

    _.each( tr, function ( el, idx ) {
      value = cms.model.servers.find( { id :$(el).data('id') })[0].connect_db;
      $(el).find('.select-db').val( value );
    });

  };

  _makeSelectBox = function ( version ) {

    var  data = cms.model.servers.find({'version' : version, 'type' : 'DB'});

    if ( version === 'LM') {
      lmView.get('select_db').empty();
      lmView.get('select_db').append( $('<option>'));
      _.each( data, function ( v, k ) {
        option = $('<option>', { 'value' : v['name'], 'text' : v['name'] } );
        lmView.get('select_db').append(option);
      });

    }
    else {
      esView.get('select_db').empty();
      esView.get('select_db').append( $('<option>'));
      _.each( data, function ( v, k ) {
        option = $('<option>', { 'value' : v['name'], 'text' : v['name'] } );
        esView.get('select_db').append(option);
      });
    }

    _setSelectValue( version );

  };


  _makeRow = function () {

    // DOM要素生成
    var
      tr      = $('<tr>',     { 'data-id' : 'c' + idx })
    , td_ver  = $('<td>',     { class : 'version'} )
    , td_type = $('<td>',     { class : 'type'} )
    , td_name = $('<td>',     { class : 'name' } )
    , td_ip   = $('<td>',     { class : 'ip' } )
    , td_del  = $('<td>',     { align : 'center', class : 'del' } )
    , input   = $('<input>',  { type  : 'text' } )
    , select  = $('<select>')
    , opt_es  = $('<option>', { value : 'ES', text : 'ES'} )
    , opt_lm  = $('<option>', { value : 'LM', text : 'LM'} )
    , button  = $('<button>', { class : 'btn btn--del mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect'} )
    , icon    = $('<i>'     , { class : 'material-icons', text : 'delete_forever'})
    ;

    // cidの管理もモデルにやってほしいものだ
    idx += 1;
    select.append( opt_es ).append( opt_lm );

    td_ver.append(select);
    td_name.append( $(input).clone(true) );
    td_ip.append(   $(input).clone(true) );
    td_del.append( button.append(icon) );

    tr.append(td_ver)
      .append(td_name)
      .append(td_ip)
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

    if ( version === 'LM' ) {
      lmView.get('body').append( complied(data) );
      lmView.updateElement({'select_db' : '.select-db'});
      lmView.updateElement({'table' : 'table'});
    }
    else {
      esView.get('body').append( complied(data) );
      esView.updateElement({'select_db' : '.select-db'});
      esView.updateElement({'table' : 'table'});
    }

  };

  _redrawTable = function ( version ) {

    if ( version === 'LM' ) {
      lmView.get('body').empty();
      _drawTable( customer.model.servers.find( {'version' : 'LM'} ) );
    }
    else {
      esView.get('body').empty();
      _drawTable( customer.model.servers.find( {'version' : 'ES'} ) );
    }

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

    if ( version === 'LM' ) {
      lmView.get('body').find('table').append(row);
      cms.model.servers.insertItem({
        'id'           : row.data('id'),
        'type'         : '',
        'name'         : '',
        'ip'           : '',
        'connect_db'   : '',
        'version'      : 'LM'
      });
    }
    else {
      esView.get('body').find('table').append(row);
      cms.model.servers.insertItem({
        'id'           : row.data('id'),
        'type'         : '',
        'name'         : '',
        'ip'           : '',
        'connect_db'   : '',
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
    cms.model.servers.removeItem( map );

  };

  _validate = function () {

  };

  // initialize module
  initModule = function () {
    // 同期処理させる
    $('.main-contents--settings-servers').append( customer.db.getHtml('setting.servers.html') );

    view   = new Controller('.main-contents--settings-servers');
    lmView = new Controller('.setting--lm-servers');
    esView = new Controller('.setting--es-servers');

    view.initElement(   elements.select );
    lmView.initElement( elements.common );
    esView.initElement( elements.common );

    _drawTable( customer.model.servers.find( {'version' : 'LM'} ) );
    _drawTable( customer.model.servers.find( {'version' : 'ES'} ) );

    _makeSelectBox('LM');

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
  cms.view.servers = {
    initModule : initModule,
    redrawTable : redrawTable,
  };

}(jQuery, customer ));