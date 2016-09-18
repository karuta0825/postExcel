  // テーブルデータ
  var data = [
    { id : 'item1', name : 1,  age : 19, sex : 'm', check : 'true'  },
    { id : 'item2', name : 43, age : 15, sex : 'm', check : 'false' },
    { id : 'item3', name : 12, age : 8,  sex : 'f', check : 'true'  },
    { id : 'item4', name : 7,  age : 29, sex : 'f', check : 'true'  },
    { id : 'item5', name : 3,  age : 12, sex : 'm', check : 'true'  },
    { id : 'item6', name : 13, age : 17, sex : 'f', check : 'true'  },
    { id : 'item7', name : 8,  age : 23, sex : 'm', check : 'false'  },
    { id : 'item8', name : 20, age : 11, sex : 'f', check : 'false'  },
    { id : 'item9', name : 15, age : 9,  sex : 'f', check : 'true'  }
  ];

  var view = {
    name  : true,
    age   : true,
    sex   : true,
    check : true
  };

$(function(){

  // html内のtemplateをロード
  var tmpl = $('#template').html();

  // ロードテンプレートに実データを組み込む
  var rows = _.template( tmpl, data );

  // コンパイル済みのレコードをhtmlに挿入
  $('.table').append( rows );

  var colTmpl = $('#view-config').html();
  console.log(colTmpl);
  var cols = _.template( colTmpl, view );
  $('#config').append( cols );


  // sort method
  var sortOrder = 1;

  // データのid検索
  var findById = function ( data, id ) {
    return $.grep( data, function (val) {
             return id === val.id;
           })[0]; 
  };

  /**
   * 選択した列を表示・日表示する機能
   * @param {String} key - 対象列のキー
   */
  var viewCol = function ( key ) {
    if ( view[key] === true ) {
      $( '.' + key ).hide();
      view[key] = false;
    }
    else {
      $( '.' + key ).show();
      view[key] = true;
    }
  };

  /**
   * データの並び替えと表示
   * @param {Array}  datas - テーブルに表示するデータ
   * @param {String} place - htmlの表示場所を指定(class name)
   * @param {String} key   - 並び替え対象のkeyを指定
   */
  var rowsort = function ( datas, place, key ) {
    var rows = $( '.' + place );

    // データソート
    datas.sort( function ( item1, item2 ){
      // 文字列の場合の対応
      item1 = _.isString(item1[key]) && item1[key].toString().toLowerCase() || item1[key];
      item2 = _.isString(item2[key]) && item2[key].toString().toLowerCase() || item2[key];
      if( item1 < item2 ){
        return -1 * sortOrder;
      }else if(item1 > item2){
          return 1 * sortOrder;
      }
      return 0;
    });

    // 降順・昇順入れ替え
    sortOrder *= -1;

    // 表示データを削除
    rows.each( function (key, val) {
      $(val).find('.name').empty();
      $(val).find('.age').empty();
      $(val).find('.sex').empty();
      $(val).find('.check').empty();
    });

    // ソート後のデータを表示
    rows.each( function ( key, val ) {
      var row = $(val);
      row.find('.name').append(  data[key].name  );
      row.find('.age').append(   data[key].age   );
      row.find('.sex').append(   data[key].sex   );
      row.find('.check').append( data[key].check );
    });

  };


  $('.theader .name').on( 'click', function () {
    rowsort( data, 'row', 'name' );
  });

  $('.theader .age').on( 'click', function (){
    rowsort( data, 'row', 'age' );
  });

  $('.theader .sex').on( 'click', function (){
    rowsort( data, 'row', 'sex' );
  });

  $('.theader .check').on( 'click', function (){
    rowsort( data, 'row', 'check' );
  });

  // $('#name').on( 'click', function () {
  //   viewCol('name');
  // });

  _.each( view, function ( val, key ) {
    console.log(key);
    $('#' + key).on( 'click', function (){
      viewCol(key);
    });
  });

});