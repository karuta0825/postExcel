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
        'update'     : '.btn--update',
        'is_finished' : '.is_finished .choice'
      },
      'filter' : '.filter',
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
        'event'   : '#modal-event-item',
        'confirm' : '#modal-delete-event',
        'alert'   : '#modal-alert-event'
      },
      'event-input' : {
        'title'    : '#modal-event-item .event__title .title-value',
        'start_on' : '#modal-event-item .start-date .input',
        'time'     : '#modal-event-item .start-time .input',
        'msg'      : '#modal-event-item .content-value'
      }
    }
  , m = moment()
  , today = moment()
  , select_id
  // private method
  , _getCalender
  , _drawCalendar
  , _drawEvents
  , _markCalendar
  , _getEventModalInfo
  , _setEventInfo
  , _clearEventView
  , _moveMonth
  , _toggleFinishStatus
  , _selectEvent
  , _filterEvent
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

  _moveMonth = function ( diff ) {

    _drawCalendar( diff );

    cms.model.homeEvents.fetch( m.format('YYYY-MM'), _drawEvents );

  };

  _toggleFinishStatus = function () {
    view.get('btn__is_finished').toggleClass('choice--on');
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


  _markCalendar = function ( list_event ) {

    // 一度リセット
    _.each( view.get('calendar__body').find('td'), function (v,k) {
      $(v).removeClass('is-event');
    });

    _.each( list_event, function ( v,k ) {
      view.get('calendar__body')
      .find('[data-on="' + v.date + '"]')
      .addClass('is-event');
    });


  };

  _drawEvents = function ( data ) {

    var
      data     = { list : data }
    , tmpl     = customer.db.getHtml('template/home.events.html')
    , complied = _.template( tmpl )
    ;

    view.get('events__list').empty();
    view.get('events__list').append( complied(data) );

    _markCalendar( data['list'] );

  };

  _getEventModalInfo = function () {


    var result = {
      'title'      : view.get('event-input__title').val(),
      'start_on'   : view.get('event-input__start_on').val(),
      'start_time' : view.get('event-input__time').val(),
      'message'    : view.get('event-input__msg').val()
    };

    // 完了フラグ
    if ( view.get('btn__is_finished').hasClass('choice--on') ) {
      result['is_finished'] = 1;
    }
    else {
      result['is_finished'] = 0;
    }

    return result;

  };

  _setEventInfo = function ( data ) {

    data = _.isArray(data) ? data[0] : data;

    view.get('event-input__title').val(data.title);
    view.get('event-input__start_on').val(data.start_on);
    view.get('event-input__time').val(data.start_time);
    view.get('event-input__msg').val(data.message);

    if ( data.is_finished === 1 ) {
      view.get('btn__is_finished').addClass('choice--on');
    }

  };

  _selectEvent = function ( e ) {

    var item = $(e.target);

    if ( item.hasClass('start_on') || item.hasClass('title') ) {
      item = item.parent();
    }

    if ( item.hasClass('event-list') ) {
      return;
    }

    select_id = Number(item.attr('data-id')) ;

    // 画面追加
    cms.model.homeEvents.find({'id' : select_id }, _setEventInfo );

    // 表示制御
    view.get('btn__save').addClass('is-hidden');
    view.get('btn__del').removeClass('is-hidden');
    view.get('btn__update').removeClass('is-hidden');

    view.get('dialog__event').get(0).showModal();

  };

  _filterEvent = function () {

    var filter = $(this).val();

    if ( filter === '1' || filter === '0' ) {
      filter = Number(filter);
    }

    cms.model.homeEvents.find({ is_finished : filter }, _drawEvents );

  };

  _showError = function ( list ) {

    // 初期化
    _.each( view.get('event-input'), function (val, key){
      val.removeClass('is-error');
    });

    // エラー場所の表示
    _.each( list, function ( v,k ) {
      view.get( 'event-input__' + v ).addClass('is-error');
    });

    // ダイアログの表示
    view.get('dialog__alert').get(0).showModal();

  };

  /**
   * 更新成功時に未完了状態を表示
   */
  _successSave = function () {

    cms.model.homeEvents.find({ 'is_finished' : 0 }, _drawEvents );

    view.get('filter').val('0');

    _cancel();

  };

  _save   = function () {

    cms.model.homeEvents.insert(
      m.format('YYYY-MM'),
      _getEventModalInfo(),
      _successSave,
      _showError
    );

  };

  _cancel = function () {

    // 入力データを初期化
    view.get('event-input__title').val('');
    view.get('event-input__start_on').val('');
    view.get('event-input__time').val('');
    view.get('event-input__msg').val('');

    // エラー状態の初期化
    _.each( view.get('event-input'), function (val, key){
      val.removeClass('is-error');
    });

    // 表示制御
    view.get('btn__save').removeClass('is-hidden');
    view.get('btn__del').addClass('is-hidden');
    view.get('btn__update').addClass('is-hidden');

    // 完了フラグを外す
    view.get('btn__is_finished').removeClass('choice--on');

    // ダイアログを閉じる
    view.get('dialog__event').get(0).close();

  };

  _update = function () {

    // idとデータを取得
    var data = _getEventModalInfo();

    data['id'] = select_id;

    cms.model.homeEvents.update( m.format('YYYY-MM'), data, _successSave, _showError );

  };

  _delete = function () {

    cms.model.homeEvents.remove( m.format('YYYY-MM'), select_id, _successSave );

  };

  // initialize method
  initModule = function () {

    view = new Controller('.article.article-calendar');

    util.confirm({
      selector : view.top,
      id       : 'modal-delete-event',
      msg      : 'イベントを削除しますか？',
      yes      : _delete
    });

    util.alert({
      selector : view.top,
      id       : 'modal-alert-event',
      msg      : '入力に誤りがあります'
    });

    view.initElement(elements);

    _drawCalendar();

    cms.model.homeEvents.fetch( m.format('YYYY-MM'), function () {
      cms.model.homeEvents.find({ 'is_finished' : 0 }, _drawEvents );
    });

    view.addListener({
      'click btn__prev-month' : function () { _moveMonth(-1) },
      'click btn__next-month' : function () { _moveMonth(1) },
      'click btn__make-event' : function () { view.get('dialog__event').get(0).showModal(); },
      'click btn__del'        : function () { view.get('dialog__confirm').get(0).showModal(); },
      'click btn__cancel'     : _cancel,
      'click events__list'    : _selectEvent,
      'click btn__save'       : _save,
      'click btn__update'     : _update,
      'click btn__is_finished' : _toggleFinishStatus,
      'change filter'          : _filterEvent
    });

  };

  // to public
  cms.view.homeCalendar = {
    initModule : initModule,
    get : _getEventModalInfo
  };

} ( jQuery, customer ))