const { DbSugar } = require('../mysql/DbSugar');
const moment = require('../../public/js/lib/moment.min');

function select(month) {
  const index_month = moment(month);
  const pre = index_month.add(-1, 'months').format('YYYY/MM');
  const prepre = index_month.add(-1, 'months').format('YYYY/MM');

  const list = [month, month, pre, pre, prepre, prepre];
  return DbSugar.select(list, 'get_add_info_in_three_month');
}

module.exports = {
  select,
};
