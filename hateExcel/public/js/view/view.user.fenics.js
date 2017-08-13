
/**
 * fenics画面
 */

( function ( $, cms ) {

  var
    view
  , elements = {
      'btn' : {
        'edit' : '.fenics-table td.edit'
      },
      'body'  : '.body',
      'check' : '.mdl-checkbox'
    }
  , _openFenicsEditDialog
  , getSelectItem
  , drawTable
  , refresh
  , releaseCheck
  , initModule
  ;

  /**
   * チェックされたユーザを取得する
   */
  getSelectItem = function () {

    var ids = _.map( $('.is-selected', view.top ), function (val,key){
      return { 'fenics_id' : $(val).attr('id') } ;
    });

    return ids;

  };

  _openFenicsEditDialog = function () {

    var
      fenics_id = $(this).parents('tr').attr('id')
    , item = cms.model.userNetwork.find({ 'fenics_id' : fenics_id })[0];
    ;

    cms.view.dialogFenics.open(item);

  };


  drawTable = function ( data ) {

    var
      data     = {
        list      : data,
        clients   : cms.model.clients.find({ is_admin : 0 })
      }
    , tmpl     = customer.db.getHtml('template/mobile.fenics.list.html')
    , complied = _.template( tmpl )
    ;

    view.get('body').empty();
    view.get('body').append( complied(data) );
    componentHandler.upgradeElements( view.wrap );

  };

  refresh = function () {

    var kids_id = cms.model.userBaseInfo.getCache().id;

    // fenics tableの更新
    cms.model.userNetwork.fetch( kids_id )
    .then( function () {
      cms.model.userNetwork.find({'is_mobile' : 0}, drawTable);
    });

  };

  releaseCheck = function () {

    _.each( view.get('checkbox'), function ( val, key ) {
      if ( $(val).hasClass('is-checked') ) {
        $(val).trigger('click');
      }
    });

  };

  initModule = function () {

    view = new Controller('.fenics-section');

    view.initElement(elements);

    view.addListener({
      'click btn__edit' : _openFenicsEditDialog
    });

  };

  cms.view.userFenics = {
    initModule    : initModule,
    show          : function () { view.wrap.removeClass('is-hidden'); },
    hide          : function () { view.wrap.addClass('is-hidden'); },
    drawTable     : drawTable,
    refresh       : refresh,
    getSelectItem : getSelectItem,
    releaseCheck  : releaseCheck
  };

} ( jQuery, customer ))