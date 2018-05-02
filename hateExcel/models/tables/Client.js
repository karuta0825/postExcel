
const { DbSugar } = require('../mysql/DbSugar');
const u_others = require('../util/u_others');
const flow = require('../util/flow');


// クライアント数と実際の個数があっていないバグを見つけた
// 98399


/**
 * [makeId description]
 * @param  {[type]} options.kids_id          [description]
 * @param  {[type]} options.userkey          [description]
 * @param  {Object} options.create_user_id} [description]
 * @return {[type]}                          [description]
 */
async function makeId({ kids_id, userkey, create_user_id } = {}) {
  if (!kids_id || !userkey || !create_user_id) {
    throw new Erorr('引数が正しくありません');
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
 * [makeIds description]
 * @param  {[type]} options.kids_id        [description]
 * @param  {[type]} options.userkey        [description]
 * @param  {[type]} options.create_user_id [description]
 * @param  {[type]} count                  [description]
 * @return {[type]}                        [description]
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

module.exports = {
  findNewId,
  makeId,
  makeIds,
};
