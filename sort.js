  // テーブルデータ
  var data = [
    { name : 1,  age : 19, sex : 'm', check : 'true'  },
    { name : 43, age : 15, sex : 'm', check : 'false' },
    { name : 12, age : 8,  sex : 'f', check : 'true'  },
    { name : 7,  age : 29, sex : 'f', check : 'true'  },
    { name : 3,  age : 12, sex : 'm', check : 'true'  },
    { name : 13, age : 17, sex : 'f', check : 'true'  },
    { name : 8,  age : 23, sex : 'm', check : 'true'  },
    { name : 20, age : 11, sex : 'f', check : 'true'  },
    { name : 15, age : 9,  sex : 'f', check : 'true'  }
  ];

$(function(){

  // html内のtemplateをロード
  var tmpl = $('#template').html();

  // ロードテンプレートに実データを組み込む
  var rows = _.template( tmpl, data );

  // コンパイル済みのレコードをhtmlに挿入
  $('.table').append( rows );


  // sort method
  var sortOrder = 1;

  // 行単位での並び替え
  // 必要な引数
  // 配列データ、どこのデータかという位置情報(class指定)、何でソートするのかというキー
  var rowsort = function ( datas, place, key ) {
    var rows = $( '.' + place );

    datas.sort( function ( item1, item2 ){
      item1 = _.isString(item1[key]) && item1[key].toString().toLowerCase() || item1[key];
      item2 = _.isString(item2[key]) && item2[key].toString().toLowerCase() || item2[key];
      if( item1 < item2 ){
        return -1 * sortOrder;
      }else if(item1 > item2){
          return 1 * sortOrder;
      }
      return 0;
    });

    sortOrder *= -1;


    rows.each( function (key, val) {
      $(val).find('.name').empty();
      $(val).find('.age').empty();
      $(val).find('.sex').empty();
      $(val).find('.check').empty();
    });

    rows.each( function ( key, val ) {
      var row = $(val);
      row.find('.name').append(  data[key].name  );
      row.find('.age').append(   data[key].age   );
      row.find('.sex').append(   data[key].sex   );
      row.find('.check').append( data[key].check );
    });

  };


  $('.theader .name').on( 'click', function () {
    console.log( $(this).attr('class'));
    rowsort( data, 'row', 'name' );
  });

  $('.theader .age').on( 'click', function (){
    rowsort( data, 'row', 'age' );
  });

  $('.theader .sex').on( 'click', function (){
    rowsort( data, 'row', 'sex' );
  });




});