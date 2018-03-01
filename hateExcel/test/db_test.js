const
  database = require('./database')
, querys   = require('./list_query')
, db = database.createClient()
;

var json = [
  {"ip":"191.12.12.11","name":"APNEW","type":"AP","version":"LM","connect_db":"LDB1-1","domain":"APNEW","capacity":12,"environment_id":4},
  {"ip":"192.158.10.10","name":"LAP1-1","type":"AP","version":"LM","connect_db":"LDB1-1","domain":"WINCARE1","capacity":60,"environment_id":4},
  {"ip":"192.168.200.108","name":"LAP1-2","type":"AP","version":"LM","connect_db":"LDB1-1","domain":"WINCARE1","capacity":40,"environment_id":4, 'add' : 'add'},
  {"ip":"192.168.210.101","name":"LAP1-3","type":"AP","version":"LM","connect_db":"LDB1-1","domain":"WINCARE1","capacity":10,"environment_id":4},
  {"ip":"192.168.210.108","name":"LAP1-4","type":"AP","version":"LM","connect_db":"LDB1-1","domain":"WINCARE1","capacity":40,"environment_id":4},
  {"ip":"192.168.200.112","name":"LAP1-5","type":"AP","version":"LM","connect_db":"LDB1-1","domain":"WINCARE1","capacity":80,"environment_id":4},
  {"ip":"192.168.210.112","name":"LAP2-1","type":"AP","version":"LM","connect_db":"LDB2-1","domain":"WINCARE2","capacity":30,"environment_id":4},
  {"ip":"192.168.200.104","name":"LAP2-2","type":"AP","version":"LM","connect_db":"LDB2-1","domain":"WINCARE2","capacity":80,"environment_id":4},
  {"ip":"192.168.210.104","name":"LAP2-3","type":"AP","version":"LM","connect_db":"LDB2-1","domain":"WINCARE2","capacity":80,"environment_id":4},
  {"ip":"192.168.200.110","name":"LAP2-4","type":"AP","version":"LM","connect_db":"LDB2-1","domain":"WINCARE2","capacity":80,"environment_id":4},
  {"ip":"192.168.210.110","name":"LAP2-5","type":"AP","version":"LM","connect_db":"LDB2-1","domain":"WINCARE2","capacity":80,"environment_id":4},
  {"ip":"192.168.200.103","name":"LAP3-1","type":"AP","version":"LM","connect_db":"LDB3-1","domain":"WINCARE3","capacity":80,"environment_id":4},
  {"ip":"192.168.210.103","name":"LAP3-2","type":"AP","version":"LM","connect_db":"LDB3-1","domain":"WINCARE3","capacity":80,"environment_id":4},
  {"ip":"192.168.200.107","name":"LAP3-3","type":"AP","version":"LM","connect_db":"LDB3-1","domain":"WINCARE3","capacity":80,"environment_id":4},
  {"ip":"192.168.210.107","name":"LAP3-4","type":"AP","version":"LM","connect_db":"LDB3-1","domain":"WINCARE3","capacity":80,"environment_id":4},
  {"ip":"192.168.200.106","name":"LAP3-5","type":"AP","version":"LM","connect_db":"LDB3-1","domain":"WINCARE3","capacity":80,"environment_id":4},
  {"ip":"192.168.210.106","name":"LAP4-1","type":"AP","version":"LM","connect_db":"LDB4-1","domain":"fwaefoi","capacity":80,"environment_id":4}
];

var list = [
  querys.delete.servers,
  querys.insert.servers,
  querys.insert.servers,
  querys.insert.servers,
  querys.insert.servers,
  querys.insert.servers
];

var params = [
  "LM",
  json[0],
  json[1],
  json[2],
  json[3],
  json[4]
];

db.transaction(list, params, function (err, result) {

  console.log('result')
  console.log(err);
  console.log(result);

});

// 引数
// @param  querys: Array<String>
// @param  params: Array<String>
// @return result: Prosmise<String>

// querysのサイズがループ回数
function transaction( querys, params ) {
  var size = querys.length;

  return new Promise( function( resolve, reject ) {

    // 再起処理を利用したループ
    function loop (i) {

      return new Promise( function (res, rej) {
        // 非同期処理
        setTimeout( function () {
          console.log(querys[i]);
          console.log(params[i]);
          if ( params[i] !== null ) {
            rej( new Error('param should be null') );
          }
          res(i+1);
        },1000);
        // query
        // res(i+1)
      })
      .then( function (count) {

        if ( count < size ) {
          // 次の処理
          loop(count);
        } else {
          // 終了
          resolve('ends');
        }

      })
      .catch( function (err) {
        reject(err)
      });

    }

    loop(0);

  })
  .then( function (r) {
    console.log(r);
  })
  .catch( function (err) {
    console.log(err);
  })
  ;

}

// function transaction( querys, params ) {
//   var size = querys.length;

//   return new Promise( function( resolve, reject ) {

//     var client = this._getClient();

//     // 再起処理を利用したループ
//     function loop (i) {

//       return new Promise( function (res, rej) {
//         // 非同期処理
//         client.query( querys[i], params[i], function (err, result) {
//           if (err) { rej(err); }
//           res(i+1);
//         });
//       })
//       .then( function (count) {

//         if ( count < size ) {
//           // 次の処理
//           loop(count);
//         } else {
//           // 終了
//           clients.commit( function (err) {
//             reject(err);
//           });
//           resolve('ends');
//         }

//       })
//       .catch( function (err) {
//         client.rollback( function () {
//           reject(err)
//         });
//       });

//     }

//     client.beginTransaction( function (err) {
//       if( err ) { reject(err) };
//       loop(0);
//     }

//   })
//   .then( function (r) {
//     console.log(r);
//   })
//   .catch( function (err) {
//     console.log(err);
//   })
//   ;

// }

// // 複数のクエリが投げられることが当たり前か
// Database.prototype.transaction = function ( querys, params, callback ) {
//   var client = this._getClient();
//   client.beginTransaction( function (err) {

//     if( err ) { throw err };

//     client.query( querys[0], params[0], function (err, result) {

//       if(err) {
//         client.rollback( function () {
//           throw err;
//         })
//       }

//       client.query( querys[1], params[1], function (err, result) {
//         if (err) {
//           client.rollback( function () {
//             throw err;
//           });
//         }

//         client.commit( function (err) {
//           if (err) {
//             client.rollback(function() {
//               throw err;
//             });
//           }

//           if ( typeof callback === 'function') {
//             client.end();
//             callback(err, result);
//           }

//         });

//       });
//     });
//   });
// };


