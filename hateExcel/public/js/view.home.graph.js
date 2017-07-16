/**
 * グラフ
 */

( function ( $, cms ) {

  var
  // member
    viewGraph
  , elements = {
      'btn' : {
        'prev' : '.btn--prev',
        'next' : '.btn--next',
        'this-month' : '.btn--this-month',
        'download' : '.btn--download'
      },
      'LM' : '.article__body .lm',
      'ES' : '.article__body .es',
    }
  , timer = false
  , resize_chart = {}
  , resize_options = {}
  , resize_data = {}
  // private method
  , _next
  , _prev
  , _download
  // public method
  , initModule
  , draw
  , redraw
  ;

  _next = function () {
    cms.model.homeGraph.get('next', function () {
      draw('LM');
      draw('ES');
    });
  };

  _prev = function () {
    cms.model.homeGraph.get('prev', function () {
      draw('LM');
      draw('ES');
    });
  };

  _thisMonth = function () {
    cms.model.homeGraph.get('this_month', function () {
      draw('LM');
      draw('ES');
    });
  };

  _download = function () {

    var
      file_name = new moment().format('YYYYMMDD') + '_addInfo.csv'
    , downloadMap
    , csv_header = ['月','ユーザ','クライアント','PC', 'バージョン']
    , blob
    ;

    downloadMap = cms.model.homeGraph.getCache();

    blob = util.convertMap2Blob( downloadMap, csv_header );

    util.downloadFile( this, blob, file_name );

  };

  draw = function (version) {

    var list_data = cms.model.homeGraph.find(version);

    resize_data[version] = google.visualization.arrayToDataTable(list_data);

    resize_options[version] = {
      title: version,
      hAxis: {title: '月'},
      legend:{position:'bottom'},
      colors:['#7575ff','#ff5b94','#ffb600']
    };

    resize_chart[version] = new google.visualization.ColumnChart(viewGraph.get(version).get(0));
    resize_chart[version].draw(resize_data[version], resize_options[version]);

  };

  redraw = function () {
    var model = _.where( customer.db.select('/select',{'table' : 'get_add_info_in_each_month'}), {version:'ES'});

    model = _.map(model, function (v,k) {
      delete v.version;
      return v;
    });

    model = _.map( model, function ( v,k ) {
      return _.values(v);
    });

    draw( model, ['','ユーザ','クライア ント', 'PC']);

  };

  initModule = function () {

    google.charts.load("visualization", "1", {packages:["corechart"]});

    viewGraph = new Controller('.article-graph');

    viewGraph.initElement(elements);

    // draw
    google.charts.setOnLoadCallback( function() {
      draw('LM');
      draw('ES');
    });

    // windowリサイズ時にグラフ長さ調整
    $(window).resize(function() {
        if (timer !== false) {
            clearTimeout(timer);
        }
        timer = setTimeout(function() {
          console.log('resized');
          resize_chart['LM'].draw(resize_data['LM'], resize_options['LM']);
          resize_chart['ES'].draw(resize_data['ES'], resize_options['ES']);
        }, 200);
    });

    viewGraph.addListener({
      'click btn__prev' : _prev,
      'click btn__next' : _next,
      'click btn__this-month' : _thisMonth,
      'click btn__download' : _download
    });

  };


  // to public
  cms.view.homeGraph = {
    initModule : initModule,
    empty : function () { viewGraph.get('lm').empty(); },
    get : function () { resize_chart.draw(resize_data, resize_options); }
  };

}( jQuery, customer ));