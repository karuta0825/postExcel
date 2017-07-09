/**
 *
 */

( function ( $, cms) {

  var
  // member
    view
  , elements = {
      'btn' : {
        'del' : '.btn--del',
        'download' : '.btn--download',
        'save' : '.btn--save',
        'cancel' : '.btn--cancel'
      },
      'wrap'   : '.fenics-wrap',
      'header' : '.fenics-header',
      'action' : '.fenics-action',
      'fenics-list' : '.fenics-list',
      'edit-icon' : 'td.edit',
      'dialog' : {
        'edit' : '#edit-fenics-item'
      }
    }
  // private methos
  , _edit
  , _save
  , _cancel
  // public method
  , drawTable
  , initModule
  ;

  _edit = function () {

    // クリックした要素
    console.log(this);

    // モーダル表示
    view.get('dialog__edit').get(0).showModal();


  };

  _save = function () {

    view.get('dialog__edit').get(0).close();

  };

  _cancel = function () {

    view.get('dialog__edit').get(0).close();

  };

  drawTable = function ( data ) {

    var
      data     = { list : data }
    , tmpl     = customer.db.getHtml('template/fenics.list.html')
    , complied = _.template( tmpl )
    ;

    // 空にして
    view.get('fenics-list').empty();

    // 詰めて
    view.get('fenics-list').append( complied(data) );

    // MDL表示用に更新
    componentHandler.upgradeElement( view.get('fenics-list').find('table').get(0) );

  };

  initModule = function () {

    view = new Controller('.main-contents--view-fenics');

    view.wrap.append( customer.db.getHtml('template/fenics.html'));

    view.initElement( elements );

    cms.db.post('/select', {'table' : 'all_fenics'} )
    .then( function (result) {
      drawTable(result);
    });

    view.addListener({
      'click edit-icon'   : _edit,
      'click btn__save'   : _save,
      'click btn__cancel' : _cancel
    });
  };

  // to public
  cms.view.fenics = {
    initModule : initModule
  };

} ( jQuery, customer ));