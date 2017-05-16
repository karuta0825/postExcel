
var hoge = function ( ) {
  return Math.random() * 10;
};

var promise = new Promise(function(resolve, reject){
  // 非同期処理
  setTimeout(function(){
    try {
      var result = hoge();
      resolve(result);
    } catch(err) {
      reject(err);
    }
  }, 1000);
});

// コールバックに相当する部分
// thenはチェインできるので、上記にそのまま .then で繋げてもOK
promise
  .then(function(result){
    //引数はresolveの引数がそのまま渡されてくる
    console.log('one: ' + result);
    // returnで次のthenのresultになる
    // return result * 100;
    return 'after one;'
  })
  .then(function(result){
    console.log('two: ' + result)
  });

// reject または エラーが throw された場合に呼ばれる部分
// promise.catch(function(err){
//   console.log(err);
// });

var makePromise = function (idx) {
  return function () {
      new Promise(function(resolve, reject){
      // 非同期処理
      setTimeout(function(){
        try {
          var result = hoge();
          resolve(result);
          console.log('idx:' + idx + ' ;' + result);
        } catch(err) {
          reject(err);
        }
      }, 1000);
    });
  }
};

// example3
// endが最後に呼ばれない
p =  new Promise(function(res) { res(); });;

// console.log('loop');
for ( var i = 0; i < 10; i += 1 ) {
  p = p.then( makePromise(i) );
}

p.then(function () {
  console.log('end');
});

// example1
/**
new Promise(function(res, rej) {
  // ループ処理（再帰的に呼び出し）
  function loop(i) {
    // 非同期処理なのでPromiseを利用
    return new Promise(function(resolve, reject) {
      // 非同期処理部分
      setTimeout(function() {
        console.log(i);
        // resolveを呼び出し
        resolve(i+1);
      }, 100);
    })
    .then(function(count) {
      // ループを抜けるかどうかの判定
      if (count > 10) {
        // 抜ける（外側のPromiseのresolve判定を実行）
        res();
      } else {
        // 再帰的に実行
        loop(count);
      }
    });
  }
  // 初回実行
  loop(0);
}).then(function() {
  // ループ処理が終わったらここにくる
  console.log('Finish');
})
*/

// example2
var test = function ( callback ) {
 datas.select(
    [],
    'get_new_fenics_ip',
    function ( result ) {
      console.log( result[0].next_ip );
      callback( result );
    }
  );
}


new Promise( function (res, rej) {
  test( res );
})
  .then( function ( result ) {
    console.log( 'one: ' + result[0].next_ip );
    test( res )
    return result.two = 'two';
  })
  .then ( function ( result ) {
    console.log( 'two: ' + result );
  });
