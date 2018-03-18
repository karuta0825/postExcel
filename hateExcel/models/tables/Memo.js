
const {DbSugar} = require('../mysql/DbSugar');

function addMemo(input_map) {
  return DbSugar.insert(input_map, 'make_memo')
}

module.exports = {
  addMemo
}