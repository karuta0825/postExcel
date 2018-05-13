
// imports
const database = require('./database');
const querys = require('./list_query');

const db = database.createClient();

class DbSugar {
  /**
   * [selectAll description]
   * @param  {String} access [description]
   * @return {Promise<Array>}        [description]
   */
  static selectAll(access) {
    return new Promise((res, rej) => {
      db.query(
        querys.select[access],
        (err, results) => {
          db.end();
          if (err) { rej(err); }
          res(results);
        }
      );
    });
  }

  /**
   * [select description]
   * @param  {*} condition [description]
   * @param  {String} access    [description]
   * @return {Promise<Array<*>>}           [description]
   */
  static select(condition, access) {
    return new Promise((res, rej) => {
      db.query(
        querys.select[access],
        condition,
        (err, results) => {
          db.end();
          if (err) { rej(err); }
          res(results);
        }
      );
    });
  }

  /**
   * [insert description]
   * @param  {*} data   [description]
   * @param  {String} access [description]
   * @return {Promise<Array<*>>}        [description]
   */
  static insert(data, access) {
    return new Promise((res, rej) => {
      db.query(
        querys.insert[access],
        data,
        (err, results) => {
          db.end();
          if (err) { rej(err); }
          res(results);
        }
      );
    });
  }

  /**
   * [delete description]
   * @return {Promise<Array<*>>} [description]
   */
  static delete(condition, access) {
    return new Promise((res, rej) => {
      db.query(
        querys.delete[access],
        condition,
        (err, results) => {
          db.end();
          if (err) { rej(err); }
          res(results);
        }
      );
    });
  }

  /**
   * [update description]
   * @param  {*} data   [description]
   * @param  {String} access [description]
   * @return {Promise<Array<*>>}        [description]
   */
  static update(data, condition, access) {
    return new Promise((res, rej) => {
      db.query(
        querys.update[access],
        [data, condition],
        (err) => {
          db.end();
          if (err) { rej(err); }
          res(null);
        }
      );
    });
  }

  static mkPlan(fn) {
    return function (...params) {
      return function () {
        return fn(...params);
      };
    };
  }
}

// export
module.exports.DbSugar = DbSugar;
