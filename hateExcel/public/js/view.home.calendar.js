/**
 * ホームのカレンダー・イベント画面
 */

( function ( $, cms ) {

  var
  // member
    view
  , elements = {
      'btn' : {
        'next-month' : '.btn--next',
        'prev-month' : '.btn--prev',
        'make-event' : '.events .btn--make-event',
        'cancel'     : '.btn--cancel',
        'del'        : '.btn--del',
        'save'       : '.btn--save',
        'update'     : '.btn--update'
      },
      'calendar' : {
        'self' : '.calendar',
        'body' : '.calendar .body',
        'month' : '.calendar .header .month'
      },
      'events'   : {
        'self' : '.events',
        'list' : '.events .event-list'
      },
      'dialog' : {
        'event' : '#modal-event-item'
      }
    }
  , m = moment()
  , today = moment()
  // private method
  , _getCalender
  , _drawCalendar
  , _drawEvents
  // public method
  , initModule
  ;

  /**
   *
   * @param  {Number} diff
   * @return {Object}
   */
  _getCalender = function ( diff ) {

    if ( diff && _.isNumber( diff) )  {
      m.add( diff, 'months')
    }

    var
      DAYS = ["日","月","火","水","木","金","土"]
    , year = m.year()
    , month = m.month() + 1
    , today = m.date()
    , day = m.day()
    , firstDay = m.date(1).day()
    , TblLine = Math.ceil( ( firstDay + m.daysInMonth() )/7 )
    , tableData = new Array( 7 * TblLine )
    ;

    for ( var i = 0; i < 7*TblLine; i++ ) {
      tableData[i] = ' ';
    }

    for ( var i = 0; i < m.daysInMonth(); i++ ) {
      // 初日の曜日分格納場所をずらす
      tableData[i+firstDay] = i + 1 ;
    }

    return {
      number_line : TblLine,
      data        : tableData,
      weeks       : DAYS,
      month       : m.format('YYYY年MM月')
    };

  };

  _drawCalendar = function ( diff ) {

    // 初期化
    view.get('calendar__body').empty();

    var tableMap = _getCalender(diff);

    var
      table = $('<table>', { class : 'calendar-table'})
    , weekTr = $('<tr>')
    , td
    ;

    for ( var i = 0; i <7 ; i++ ) {
      weekTr.append( $('<td>', {
        text : tableMap['weeks'][i],
        class : 'table-data-center'
      }));
    }

    table.append(weekTr);

    for ( var i = 0; i < tableMap['number_line']; i++ ) {
      var tr = $('<tr>', { class : 'event-item'});
      for ( var j = 0; j < 7; j++ ) {

        tr.append( $('<td>', {
          'text'    : tableMap['data'][j+(i*7)],
          'class'   : 'table-data-center',
          'data-on' : tableMap['data'][j+(i*7)]
        }));

        table.append(tr);

      }

    }

    view.get('calendar__month').text( tableMap['month'] );
    view.get('calendar__body').append( table );

    // 今日日付に強調デザイン
    if ( tableMap['month'] === today.format('YYYY年MM月') ) {
      view.get('calendar__body').find('[data-on="' + today.date() + '"]').addClass('today');
    }


  };

  _drawEvents = function ( data ) {

    var
      data     = { list : data }
    , tmpl     = customer.db.getHtml('template/home.events.html')
    , complied = _.template( tmpl )
    ;

    view.get('events__list').empty();
    view.get('events__list').append( complied(data) );

  };

  initModule = function () {

    view = new Controller('.article.article-calendar');

    view.initElement(elements);

    _drawCalendar();

    cms.model.homeEvents.fetch( null, _drawEvents );

    view.addListener({
      'click btn__prev-month' : function () { _drawCalendar(-1) },
      'click btn__next-month' : function () { _drawCalendar(1) },
      'click btn__make-event' : function () { view.get('dialog__event').get(0).showModal(); },
      'click btn__cancel' : function () { view.get('dialog__event').get(0).close(); }
    });

  };

  // to public
  cms.view.homeCalendar = {
    initModule : initModule,
    get : _getCalender
  };

} ( jQuery, customer ))