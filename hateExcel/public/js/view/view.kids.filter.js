/**
 * kids フィルター
 */

(function ( $, cms ) {

  var
    view
  , elements = {
      'search' : '.search',
      'system' : {
        'wrap'  : '.system .filter-item__body',
        'onpre' : '.btn--onpre',
        'cloud' : '.btn--cloud',
        'both'  : '.btn--onpre-cloud'
      },
      'version' : {
        'wrap' : '.version .filter-item__body',
        'LM'   : '.btn--LM',
        'ES'   : '.btn--ES',
        'both' : '.btn--ESLM'
      },
      'server' : '.select-servers',
      'network' : {
        'wrap'  : '.network .filter-item__body',
        'busiv' : '.btn--busiv',
        'univ'  : '.btn--univ',
        'both'  : '.btn--busivUniv'
      },
      'mobile' : {
        'wrap' : '.mobile .filter-item__body',
        'on'   : '.btn--mon',
        'off'  : '.btn--moff',
        'both' : '.btn--mon-off'
      }
    }
  , _search
  , _selectSystem
  , _selectVertion
  , _selectNetwork
  , _selectMobileAvailable
  , _selectServer
  , initModule
  ;


  _search = function () {

    var keyword = $(this).val();
    cms.model.kids.search( keyword, cms.view.kids.drawTable );

  };

  _selectSystem = function ( event ) {

    var list_class = $( event.target ).attr('class').split(' ');

    switch ( list_class[1] ) {
      case 'btn--onpre' :
        view.get('system__onpre').addClass('btn--on');
        view.get('system__cloud').removeClass('btn--on');
        view.get('system__both' ).removeClass('btn--on');
        customer.model.kids.setCondition( { 'system_type' : 'onpre' }, cms.view.kids.drawTable );
        break;
      case 'btn--cloud' :
        view.get('system__onpre').removeClass('btn--on');
        view.get('system__cloud').addClass('btn--on');
        view.get('system__both' ).removeClass('btn--on');
        customer.model.kids.setCondition( { 'system_type' : 'cloud' }, cms.view.kids.drawTable );
        break;
      case 'btn--onpre-cloud' :
        view.get('system__onpre').removeClass('btn--on');
        view.get('system__cloud').removeClass('btn--on');
        view.get('system__both' ).addClass('btn--on');
        customer.model.kids.setCondition( { 'system_type' : 'all'}, cms.view.kids.drawTable );
        break;
      default:
        break;
    }

  };

  /**
   * クラス化できるメソッドですね
   */
  _selectVertion = function ( event ) {

    var list_class = $( event.target ).attr('class').split(' ');

    switch ( list_class[1] ) {
      case 'btn--ES' :
        view.get('version__ES').addClass('btn--on');
        view.get('version__LM').removeClass('btn--on');
        view.get('version__both').removeClass('btn--on');
        customer.model.kids.setCondition( {'version' : 'ES', 'server' : 'all' }, cms.view.kids.drawTable );
        // 選択サーバ変更
        updateServerOption('ES');
        break;
      case 'btn--LM' :
        view.get('version__ES').removeClass('btn--on');
        view.get('version__LM').addClass('btn--on');
        view.get('version__both').removeClass('btn--on');
        customer.model.kids.setCondition( { 'version' : 'LM', 'server' : 'all' }, cms.view.kids.drawTable );
        // 選択サーバ変更
        updateServerOption('LM');
        break;
      case 'btn--ESLM' :
        view.get('version__ES').removeClass('btn--on');
        view.get('version__LM').removeClass('btn--on');
        view.get('version__both').addClass('btn--on');
        customer.model.kids.setCondition( { 'version' : 'all', 'server' : 'all'}, cms.view.kids.drawTable );
        //
        updateServerOption('all');
        break;
      default:
        break;
    }

  };

  _selectMobileAvailable = function ( event ) {

    var list_class = $(event.target).attr('class').split(' ');

    switch ( list_class[1] ) {
      case 'btn--mon' :
        view.get('mobile__on').addClass('btn--on');
        view.get('mobile__off').removeClass('btn--on');
        view.get('mobile__both').removeClass('btn--on');
        customer.model.kids.setCondition( {'has_mobile' : 1 }, cms.view.kids.drawTable );
        break;
      case 'btn--moff' :
        view.get('mobile__on').removeClass('btn--on');
        view.get('mobile__off').addClass('btn--on');
        view.get('mobile__both').removeClass('btn--on');
        customer.model.kids.setCondition( { 'has_mobile' : 0 }, cms.view.kids.drawTable );
        break;
      case 'btn--mon-off' :
        view.get('mobile__on').removeClass('btn--on');
        view.get('mobile__off').removeClass('btn--on');
        view.get('mobile__both').addClass('btn--on');
        customer.model.kids.setCondition( { 'has_mobile' : 'all' }, cms.view.kids.drawTable );
        break;
      default:
        break;
    }

  };

  /**
   * ネットワークのフィルター
   * @param  {Event} event
   * TODO: viewに仕事させすぎなのでモデルでできないか！
   */
  _selectNetwork = function ( event ) {

    var list_class = $( event.target ).attr('class').split(' ');

    switch ( list_class[1] ) {
      case 'btn--busiv' :

        view.get('network__busiv').toggleClass('btn--on');
        view.get('network__both').removeClass('btn--on');

        if ( view.get('network__busiv').hasClass('btn--on') ) {
          cms.model.kids.setCondition( { 'has_busiv' : 1 } );
        }
        else {
          cms.model.kids.setCondition( { 'has_busiv' : 0 } );
        }

        if ( view.get('network__univ').hasClass('btn--on') ) {
          cms.model.kids.setCondition( { 'has_fenics' : 1 } );
        }
        else {
          cms.model.kids.setCondition( { 'has_fenics' : 0 } );
        }

        cms.model.kids.getCondition( cms.view.kids.drawTable );

        break;
      case 'btn--univ' :
        view.get('network__univ').toggleClass('btn--on');
        view.get('network__both').removeClass('btn--on');

        if ( view.get('network__busiv').hasClass('btn--on') ) {
          cms.model.kids.setCondition( { 'has_busiv' : 1 } );
        }
        else {
          cms.model.kids.setCondition( { 'has_busiv' : 0 } );
        }

        if ( view.get('network__univ').hasClass('btn--on') ) {
          cms.model.kids.setCondition( { 'has_fenics' : 1 } );
        }
        else {
          cms.model.kids.setCondition( { 'has_fenics' : 0 } );
        }

        cms.model.kids.getCondition( cms.view.kids.drawTable );

        break;
      case 'btn--busivUniv' :

        if ( view.get('network__both').hasClass('btn--on') ) {

          view.get('network__both').removeClass('btn--on');

          if ( view.get('network__busiv').hasClass('btn--on') ) {
            cms.model.kids.setCondition( { 'has_busiv' : 1 } );
          }
          else {
            cms.model.kids.setCondition( { 'has_busiv' : 0 } );
          }

          if ( view.get('network__univ').hasClass('btn--on') ) {
            cms.model.kids.setCondition( { 'has_fenics' : 1 } );
          }
          else {
            cms.model.kids.setCondition( { 'has_fenics' : 0 } );
          }

          cms.model.kids.getCondition( cms.view.kids.drawTable );

        }
        else {
          view.get('network__both').addClass('btn--on');
          cms.model.kids.setCondition( { 'has_fenics' : 'all', 'has_busiv' : 'all' }, cms.view.kids.drawTable );
        }
        break
      default:
        break;
    }

  };

  _selectServer = function () {
    customer.model.kids.setCondition(
      { server : $(this).val() },
      cms.view.kids.drawTable
    );
  };

  /**
   * バージョンによってサーバーセレクトボックスのオプション内容を変更する
   * @param  {String} version
   */
  updateServerOption = function ( version ) {

    var filtered = customer.model.servers.find({ 'version' : version, type : 'AP' });
    var select =  util.addOption( filtered, $('.select-servers') );
    $('.filter-item.servers .filter-item__body').append( select );

  };

  initModule = function () {

    view = new Controller('.main-contents--view-usr');

    view.initElement( elements );

    // サーバー選択肢作成
    updateServerOption( 'all' );

    view.addListener({
      'change server'       : _selectServer,
      'keyup search'       : _search,
      'click system__wrap'  : _selectSystem,
      'click version__wrap' : _selectVertion,
      'click network__wrap' : _selectNetwork,
      'click mobile__wrap'  : _selectMobileAvailable
    });

  };

  cms.view.kidsFilter = {
    initModule : initModule,
    updateServerOption : updateServerOption
  };


}( jQuery, customer ));