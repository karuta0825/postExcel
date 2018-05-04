
const { DbSugar } = require('../mysql/DbSugar');
const u_others = require('../util/u_others');

// クライアント数と実際の個数があっていないバグを見つけた
// 98399

/**
 * [select description]
 * @param  {[type]} kids_id [description]
 * @return {[type]}         [description]
 */
function select(kids_id) {
  return DbSugar.select(kids_id, 'clients');
}

/**
 * [findNewId description]
 * @param  {[type]} options.kids_id [description]
 * @param  {[type]} options.userkey [description]
 * @return {[type]}                 [description]
 */
async function findNewId({ kids_id, userkey } = {}) {
  if (!kids_id || !userkey) {
    throw new Error('正しい引数を指定してください');
  }

  return DbSugar.select(kids_id, 'find_last_client_id')
    .then((r) => {
      if (r.length === 0) {
        return `${userkey}0001`;
      }
      return u_others.getNextZeroPadData(r[0].client_id);
    });
}

/**
 * [makeId description]
 * @param  {string} options.kids_id          [description]
 * @param  {string} options.userkey          [description]
 * @param  {number} options.create_user_id} [description]
 * @return {Promise<{affectedRows: number}>}
 * TODO: need not userkey because the kids_id should decide this value.
 */
async function makeId({ kids_id, userkey, create_user_id } = {}) {
  if (!kids_id || !userkey || !create_user_id) {
    throw new Error('引数が正しくありません');
  }

  const client = {};
  return findNewId({ kids_id, userkey })
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
 * @param  {string} options.kids_id        [description]
 * @param  {string} options.userkey        [description]
 * @param  {number} options.create_user_id [description]
 * @param  {number} count                  [description]
 * @return {Promise<number>}
 */
async function makeIds({ kids_id, userkey, create_user_id }, count = 0) {
  if (count < 1) {
    throw new Error('1以上を指定してください');
  }
  try {
    for (let i = 0; i < count; i += 1) {
      await makeId({ kids_id, userkey, create_user_id });
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
 * @param  {{client_id: string}} condition
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
};
