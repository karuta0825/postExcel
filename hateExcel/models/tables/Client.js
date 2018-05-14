
const { DbSugar } = require('../mysql/DbSugar');
const u_others = require('../util/u_others');
const Kid = require('./Kid');

// クライアント数と実際の個数があっていないバグを見つけた
// 98399

/**
 * @param  {string} kids_id
 * @return {Promise<[{
 *           kids_id: string,
 *           client_id: string,
 *           client_pass: string,
 *           create_on: string,
 *           create_user_id: string,
 *           fenics_id: string,
 *           is_admin: number,
 *           end_on: string,
 *         }]>}
 */
function select(kids_id) {
  return DbSugar.select(kids_id, 'clients');
}

/**
 * [findNewId description]
 * @param  {string} kids_id
 * @return {Promise<string>}
 */
async function findNewId(kids_id) {
  if (!kids_id) {
    throw new Error('正しい引数を指定してください');
  }

  const userkey = await Kid.findUserkey(kids_id);
  if (!userkey) { throw new Error('ユーザーキーが設定されていません'); }

  return DbSugar.select(kids_id, 'find_last_client_id')
    .then((r) => {
      if (r.length === 0) {
        return `${userkey}0001`;
      }
      return u_others.getNextZeroPadData(r[0].client_id);
    });
}

/**
 * @param  {string} kids_id
 * @param  {number} create_user_id
 * @return {Promise<{affectedRows: number}>}
 */
async function makeId(kids_id, create_user_id) {
  if (!kids_id || !create_user_id) {
    throw new Error('引数が正しくありません');
  }

  const client = {};
  return findNewId(kids_id)
    .then((client_id) => {
      client.kids_id = kids_id;
      client.client_id = client_id;
      client.client_pass = client_id;
      client.create_on = new Date();
      client.create_user_id = create_user_id;
      client.is_admin = 0;
    })
    .then(() => DbSugar.insert(client, 'make_client'));
}

/**
 * [makeIds description]
 * @param  {string} kids_id
 * @param  {number} create_user_id
 * @param  {number} count
 * @return {Promise<number>}
 */
async function makeIds(kids_id, create_user_id, count = 1) {
  if (count < 1) {
    throw new Error('1以上を指定してください');
  }
  try {
    for (let i = 0; i < count; i += 1) {
      await makeId(kids_id, create_user_id);
    }
    return count;
  } catch (e) {
    throw e;
  }
}

/**
 * @param  {{fenics_id: string, end_on: Datetime}} input_map
 * @param  {strint} client_id
 * @return {Promise<null>}
 */
function update(input_map, client_id) {
  return DbSugar.update(input_map, client_id, 'clients');
}

/**
 * @param  {{client_id: string} || {kids_id: string}} condition
 * @return {Promise<{affectedRows: number}>}
 */
function remove(condition) {
  return DbSugar.delete(condition, 'clients');
}

module.exports = {
  select,
  findNewId,
  makeId,
  makeIds,
  update,
  remove,
  planMakeId: DbSugar.mkPlan(makeId),
};
