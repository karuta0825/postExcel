
const {DbSugar} = require('../mysql/DbSugar');

class Memo extends DbSugar {

  /**
  * [addMemo description]
  * @param {Number} options.kids_id        [description]
  * @param {String} options.title          [description]
  * @param {String} options.priority_id    [description]
  * @param {String} options.message        [description]
  * @param {Number} options.create_user_id [description]
  * @param {Date}   options.create_on    [description]
  */
  static addRow(input_map) {
    return super.insert(input_map, 'make_memo')
  }

}

module.exports = Memo;