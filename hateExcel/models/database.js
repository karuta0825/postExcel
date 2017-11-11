// Copyright (c) 2012, Hiromichi Matsushima <hylom@users.sourceforge.jp>
// All rights reserved.
// This file is released under New BSD License.

var mysql = require('mysql');
var config = require('../config');

// ModelBase: Modelのベースクラス
var Database = function () {};

// データベースの認証情報を格納する
Database.prototype.dbAuth = config.databaseAuth;

// MySQLクライアントオブジェクトを作成する
Database.prototype._getClient = function () {
  if (this.client === undefined) {
    this.client = mysql.createConnection(this.dbAuth);
  }
  return this.client;
};

// クエリを実行する
Database.prototype.query = function (query, params, callback) {
  var client = this._getClient();
  return client.query(query, params, callback);
};

// クエリを終了する
Database.prototype.end = function (callback) {
  if (this.client) {
    this.client.end(callback);
    delete this.client;
  }
};

Database.prototype.transaction = function ( querys, params, callback ) {
  var client = this._getClient();
  var size = querys.length;

  return new Promise( function( resolve, reject ) {

    // 再起処理関数の作成
    function loop (i) {

      return new Promise( function (res, rej) {
        // 非同期処理
        client.query( querys[i], params[i], function (err, result) {
          if (err) { rej(err); }
          res(i+1);
        });
      })
      .then( function (count) {

        if ( count < size ) {
          // 次の処理
          loop(count);
        } else {
          // 終了
          client.commit( function (err) {
            client.end();
            if (err) {reject(err);}
            resolve('ends');
          });
        }

      })
      .catch( function (err) {
        client.rollback( function () {
          reject(err)
        });
      });

    }

    // メインループ処理
    client.beginTransaction( function (err) {
      if( err ) { reject(err) };
      loop(0);
    });

  })
  .then( function (r) {
    callback(null, r);
  })
  .catch( function (err) {
    callback(err, null);
    client.end();
  })
  ;

}


// Databaseクラスのインスタンスを作成する
function createClient() {
  return new Database();
};

exports.createClient = createClient;
