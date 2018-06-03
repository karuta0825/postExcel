// Copyright (c) 2012, Hiromichi Matsushima <hylom@users.sourceforge.jp>
// All rights reserved.
// This file is released under New BSD License.

const mysql = require('mysql');
const config = require('../../config/mysql');

class Database {
  constructor() {
    this.dbAuth = config.databaseAuth;
  }

  _getClient() {
    if (this.client === undefined) {
      this.client = mysql.createConnection(this.dbAuth);
    }
    return this.client;
  }

  query(query, params, callback) {
    const client = this._getClient();
    return client.query(query, params, callback);
  }

  end(callback) {
    if (this.client) {
      this.client.end(callback);
      delete this.client;
    }
  }

  transaction(plans) {
    const client = this._getClient();
    const { length } = plans;

    return new Promise((resolve, reject) => {
      // 再起処理関数の作成
      function loop(i) {
        return plans[i]()
          .then(() => {
            const count = i + 1;
            if (count < length) {
              // 次の処理
              loop(count);
            } else {
              // 終了
              client.commit((err) => {
                if (err) { reject(err); }
                resolve('end');
              });
            }
          })
          .catch((err) => {
            client.rollback(() => {
              reject(err);
            });
          });
      }

      // メインループ処理
      client.beginTransaction((err) => {
        if (err) { reject(err); }
        loop(0);
      });
    });
  }
}

// Databaseクラスのインスタンスを作成する
function createClient() {
  return new Database();
}

exports.createClient = createClient;
