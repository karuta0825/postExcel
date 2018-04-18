/**
 * Cutomersテーブ
 */

const {DbSugar} = require('../mysql/DbSugar');

class Customer extends DbSugar {

  /**
  * [findLastBaseId description]
  * @param  {String} kids_id 
  * @return {Promise<Number>} 
  */
  static findLastBaseId (kids_id) {
    return super.select(kids_id, 'find_last_base_id')
    .then( r => {
      return r[0].base_id;
    });
  }

  /**
   * 拠点追加これは必要だ
   * @param {String} kids_id [description]
   */
  static async addRow(kids_id) {
    if (!kids_id) { throw new Error('引数を指定してください'); }
    return super.insert({kids_id:kids_id}, 'add_base');
  }

}


module.exports = Customer;
