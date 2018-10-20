const { DbSugar } = require('../mysql/DbSugar');
const u_others = require('../util/u_others');
const Kid = require('./Kid');
const Mobile = require('./Mobile');

/**
 * @param  {string} kids_id
 * @return {Promise<[{
 *           kids_id: string,
 *           fenics_id: string,
 *           password: string,
 *           fenics_ip: string,
 *           pc_name: string,
 *           create_on: string,
 *           end_on: string,
 *           category: string,
 *           is_mobile: number
 *         }]>}
 */
function select(kids_id) {
  if (!kids_id) {
    return DbSugar.selectAll('all_fenics');
  }
  return DbSugar.select(kids_id, 'fenics');
}

function isUniqueIp(ip) {
  return DbSugar.select(ip, 'is_unique_fenics_ip')
    .then(r => !(r.length > 0));
}

/**
 * [makeFenicsId description]
 * @param  {{kids_id: String, fenics_key: String}} input_map [description]
 * @return {Promise<String>}           [description]
 *
 * @throws {Promise<Exception>}
 */
async function findNewId(kids_id, is_mobile = false) {
  if (!kids_id) {
    throw new Error('引数が正しくありません');
  }

  const fenics_key = (is_mobile)
    ? await Mobile.findFenicsKey(kids_id)
    : await Kid.findFenicsKey(kids_id);

  if (!fenics_key) {
    throw new Error('ユーザーを作成してください');
  }

  if (is_mobile) {
    return DbSugar.select(kids_id, 'find_last_mobile_fenics_id')
      .then((r) => {
        if (r.length === 0) { return `${fenics_key}001`; }
        return u_others.getNextZeroPadData(r[0].fenics_id);
      });
  }

  return DbSugar.select(kids_id, 'find_last_fenics_id')
    .then((r) => {
      if (r.length === 0) { return `${fenics_key}01001`; }
      return u_others.getNextZeroPadData(r[0].fenics_id);
    });
}

/**
 * [findNextFenicsIp description]
 * @return {Promise<String>} [description]
 */
function findNextFenicsIp() {
  return DbSugar.select(null, 'get_new_fenics_ip')
    .then(r => r[0].next_ip);
}

/**
 * [makeUser description]
 * @param  {[type]}  options.kids_id      [description]
 * @param  {Object}  options.fenics_key} [description]
 * @param  {Boolean} is_mobile            [description]
 * @return {[type]}                       [description]
 */
async function makeUser(kids_id, is_mobile = false) {
  const fenics_account = {};

  const [fenics_id, fenics_ip] = await Promise.all([
    findNewId(kids_id, is_mobile),
    findNextFenicsIp(),
  ]);

  fenics_account.kids_id = kids_id;
  fenics_account.fenics_id = fenics_id;
  fenics_account.password = fenics_id;
  fenics_account.pc_name = is_mobile ? '' : fenics_id.toUpperCase();
  fenics_account.fenics_ip = fenics_ip;
  fenics_account.start_on = new Date();
  fenics_account.create_on = new Date();
  fenics_account.is_mobile = is_mobile ? 1 : 0;

  return DbSugar.insert(fenics_account, 'make_fenics_account');
}

async function makeUsers(kids_id, is_mobile, count) {
  if (count < 1) { throw new Error('ループ回数は1以上指定してください'); }
  for (let i = 0; i < count; i += 1) {
    await makeUser(kids_id, is_mobile);
  }
  return count;
}

/**
 * [update description]
 * @param  {Object} input_map
 * @param  {string} fenics_id
 * @return {Promise<>} result
 */
function update(input_map, fenics_id) {
  return DbSugar.update(input_map, fenics_id, 'fenics');
}

/**
 * [remove description]
 * @param  {Object} condition
 *         {string} fenics_id
 * @return {Promise<>}
 */
function remove(condition) {
  return DbSugar.delete(condition, 'fenics');
}


module.exports = {
  select,
  isUniqueIp,
  findNewId,
  makeUser,
  makeUsers,
  update,
  remove,
  planMakeIds: DbSugar.mkPlan(makeUsers),
};
