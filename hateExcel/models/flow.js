var
  flow = exports
  ;

/**
 * 順次処理のループ関数を作成
 * @param  {Function} inner_work  - ループ内で処理させたい内容
 * @return {Function}             - ループ実行関数
 */
flow.makeSyncLoop = function ( inner_work ) {
  return function ( map, idx, callback ) {
    new Promise(function(res, rej) {
      // ループ処理（再帰的に呼び出し）
      function loop(i) {
        // 非同期処理なのでPromiseを利用
        return new Promise(function(resolve, reject) {
          // 非同期処理部分
          inner_work(map, i, function () {
            // ループ内処理が終了後,
            // Promiseのステータスを完了に変更し、
            // 順次処理を成す
            // console.log(i);
            resolve(i+1);
          });
        })
        .then(function(count) {
          // ループを抜けるかどうかの判定
          if (count > idx-1 ) {
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
      callback()
      console.log('Finish');
    });
  }
};
