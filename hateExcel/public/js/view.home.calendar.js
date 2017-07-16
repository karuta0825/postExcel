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
      },
      'event-input' : {
        'title' : '#modal-event-item .event__title .title-value',
        'date'  : '#modal-event-item .start-date .input',
        'time'  : '#modal-event-item .start-time .input',
        'msg'   : '#modal-event-item .content-value'
      }
    }
  , m = moment()
  , today = moment()
  // private method
  , _getCalender
  , _drawCalendar
  , _drawEvents
  , _getEventModalInfo
  , _setEventInfo
  , _clearEventView
  , _selectEvent
  , _showError
  , _successSave
  , _save
  , _cancel
  , _update
  , _delete
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

    // データ取得
    var tableMap = _getCalender(diff);

    var
      table = $('<table>', { class : 'calendar-table'})
    , weekTr = $('<tr>')
    , td
    ;

    // 曜日行を作成し、テーブルに追加
    for ( var i = 0; i < 7 ; i++ ) {
      weekTr.append( $('<td>', {
        text : tableMap['weeks'][i],
        class : 'table-data-center'
      }));
    }

    table.append(weekTr);

    // 週ごとのデータを作成し、テーブルに追加
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

    // 表示
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

  _getEventModalInfo = function () {

    var result = {
      'title'      : view.get('event-input__title').val(),
      'start_on'   : view.get('event-input__date').val(),
      'start_time' : view.get('event-input__time').val(),
      'message'    : view.get('event-input__msg').val()
    };

    return result;

  };

  _setEventInfo = function ( data ) {

    data = _.isArray(data) ? data[0] : data;

    view.get('event-input__title').val(data.title);
    view.get('event-input__date').val(data.start_on);
    view.get('event-input__time').val(data.start_time);
    view.get('event-input__msg').val(data.message);

  };

  _selectEvent = function ( e ) {

    var
      item = $(e.target)
    , id
    ;

    if ( item.hasClass('start_on') || item.hasClass('title') ) {
      item = item.parent();
    }

    if ( item.hasClass('event-list') ) {
      return;
    }

    id = Number(item.attr('data-id')) ;

    // 画面追加
    cms.model.homeEvents.find({'id' : id }, _setEventInfo );

    // 表示制御
    view.get('btn__save').addClass('is-hidden');
    view.get('btn__del').removeClass('is-hidden');
    view.get('btn__update').removeClass('is-hidden');

    view.get('dialog__event').get(0).showModal();

  };

  _showError = function ( list ) {

    // 初期化
    _.each( view.get('event-input'), function (val, key){
      val.removeClass('is-error');
    });

    // エラー場所の表示
    _.each( list, function ( v,k ) {
      view.get(v).addClass('is-error');
    });

  };

  _successSave = function ( data ) {

    _drawEvents(data);
    view.get('dialog__event').get(0).close();

  };

  _save   = function () {

    var data = _getEventModalInfo();

    cms.model.homeEvents.insert(
      data,
      _successSave,
      _showError
    );

  };

  _cancel = function () {

    // 入力データを初期化
    view.get('event-input__title').val('');
    view.get('event-input__date').val('');
    view.get('event-input__time').val('');
    view.get('event-input__msg').val('');

    // ダイアログを閉じる
    view.get('dialog__event').get(0).close();

  };

  _update = function () {

    // idとデータを取得
    // cms.model.homeEvents.updaet( data, _drawEvents );
    view.get('dialog__event').get(0).close();

  };

  _delete = function () {

    // idを取得
    // cms.model.homeEvents.remove( id, _drawEvents );
    view.get('dialog__event').get(0).close();

  };

  // initialize method
  initModule = function () {

    view = new Controller('.article.article-calendar');

    view.initElement(elements);

    _drawCalendar();

    cms.model.homeEvents.fetch( null, _drawEvents );

    view.addListener({
      'click btn__prev-month' : function () { _drawCalendar(-1) },
      'click btn__next-month' : function () { _drawCalendar(1) },
      'click btn__make-event' : function () { view.get('dialog__event').get(0).showModal(); },
      'click btn__cancel'     : _cancel,
      'click events__list'    : _selectEvent,
      'click btn__save'       : _save
    });

  };

  // to public
  cms.view.homeCalendar = {
    initModule : initModule,
    get : _getEventModalInfo
  };

} ( jQuery, customer ))