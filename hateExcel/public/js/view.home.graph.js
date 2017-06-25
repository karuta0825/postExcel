/**
 * グラフ
 */

( function ( $, cms ) {

  var
  // member
    viewGraph
  , elements = {
      'lm' : '.article__body .lm',
      'es' : '.article__body .es'
    }
  , timer = false
  , resize_chart
  , resize_options
  , resize_data
  , resize_chart_es
  , resize_options_es
  , resize_data_es
  // public method
  , initModule
  , draw
  ;

  draw = function ( list_data, list_header ) {

    list_data.unshift(list_header);

    google.charts.setOnLoadCallback(
      function() {

        // LM
        resize_data = google.visualization.arrayToDataTable(list_data);

        resize_options = {
          title: 'LM',
          hAxis: {title: '月'},
          legend:{position:'bottom'}
        };

        resize_chart = new google.visualization.ColumnChart(viewGraph.get('lm').get(0));
        resize_chart.draw(resize_data, resize_options);

        // ES
        resize_data_es = google.visualization.arrayToDataTable(list_data);

        resize_options_es = {
          title: 'ES',
          hAxis: {title: '月'},
          legend:{position:'bottom'}
        };

        resize_chart_es = new google.visualization.ColumnChart(viewGraph.get('es').get(0));
        resize_chart_es.draw(resize_data_es, resize_options_es);


      }
    );

  };


  initModule = function () {

    google.charts.load("visualization", "1", {packages:["corechart"]});

    viewGraph = new Controller('.article-graph');

    viewGraph.initElement(elements);

    var model = _.where( customer.db.select('/select',{'table' : 'get_add_info_in_each_month'}), {version:'LM'});

    model = _.map(model, function (v,k) {
      delete v.version;
      return v;
    });

    model = _.map( model, function ( v,k ) {
      return _.values(v);
    });

    draw( model, ['','ユーザ','クライア ント', 'PC']);

    // windowリサイズ時にグラフ長さ調整
    $(window).resize(function() {
        if (timer !== false) {
            clearTimeout(timer);
        }
        timer = setTimeout(function() {
            console.log('resized');
            resize_chart.draw( resize_data, resize_options )
        }, 200);
    });

  };


  // to public
  cms.view.homeGraph = {
    initModule : initModule
  };

}( jQuery, customer ));