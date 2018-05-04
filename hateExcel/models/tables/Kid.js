/**
 * Kidsテーブルに関する操作
 */

const { DbSugar } = require('../mysql/DbSugar');
const u_others = require('../util/u_others');
const Environment = require('./Environment');

function select(kids_id) {
  if (!kids_id) { throw new Error('引数を指定してください'); }
  return DbSugar.select(kids_id, 'kid');
}

/**
 * [findNewKid description]
 * @param  {String} environment_id [description]
 * @return {Promise<{kid:Number}>}                [description]
 */
function findNewKid(environment_id) {
  return DbSugar.select(environment_id, 'find_new_kid')
    .then((result) => {
      if (result.length === 0) {
        return DbSugar.select(environment_id, 'find_initial_kid')
          .then((r) => {
            if (r[0]) { return r[0].kid; }
            return null;
          });
      }
      return Promise.resolve(Number(result[0].kid) + 1);
    });
}

async function findFenicsKey(kids_id) {
  const kidsInfo = await select(kids_id);
  if (kidsInfo.length > 0) {
    return kidsInfo[0].fenics_key;
  }
  return null;
}

/**
 * [findNewUserKey description]
 * @param  {String} userkey [description]
 * @return {Promise<String>}         [description]
 */
function findNewUserKey(userkey) {
  let newUserKey;
  if (!userkey) { userkey = u_others.makeUserKey(6); }

  return DbSugar.select(userkey, 'find_new_userkey')
    .then((result) => {
      if (result.length !== 0) {
        newUserKey = u_others.makeUserKey(6);
        return findNewUserKey(newUserKey);
      }
      return Promise.resolve(userkey);
    });
}

/**
 * [findNewFenicsKey description]
 * @param  {Stirng} fenicsKey [description]
 * @return {Promise<String>}           [description]
 */
function findNewFenicsKey(fenicsKey) {
  let newFenicsKey;
  if (!fenicsKey) { fenicsKey = u_others.makeFenicsKey(4); }

  return DbSugar.select(fenicsKey, 'is_unique_fenicskey')
    .then((result) => {
      if (result.length !== 0) {
        newFenicsKey = u_others.makeFenicsKey(4);
        return findNewFenicsKey(newFenicsKey);
      }
      return Promise.resolve(fenicsKey);
    });
}

/**
 * @param  {String} userkey [description]
 * @return {String}         [description]
 */
function findNewDbPass(userkey) {
  const convert = userkey.replace(/A/g, '4')
    .replace(/B/g, '8')
    .replace(/E/g, '3')
    .replace(/G/g, '6')
    .replace(/I/g, '1')
    .replace(/O/g, '0')
    .replace(/S/g, '5')
    .replace(/T/g, '7')
    .replace(/Z/g, '2');
  return `U53R${convert}`;
}

/**
 * add one row to kids table.
 * @param  {{
 *           kid:string,
 *           environemnt_id:string,
 *           server:String
 *         }} input_map parameter object for make user.
 * @return {Promise<{affectedRows: number}>}
 */
async function addRow({
  kid, environment_id, server, create_user_id,
} = {}) {
  const set = {};

  try {
    const new_kid = await findNewKid(environment_id);
    const userkey = await findNewUserKey();
    const { system_type } = await Environment.findById(environment_id);

    set.kid = kid || new_kid;
    set.userkey = userkey;
    set.db_password = findNewDbPass(userkey);
    set.fenics_key = userkey.substr(0, 4).toLowerCase();
    set.server = server;
    set.environment_id = environment_id;
    set.create_user_id = create_user_id;
    set.create_on = new Date();

    if (system_type === 'docomo') {
      set.is_replaced_from_another = 1;
    }

    const record = await DbSugar.insert(set, 'make_user');
    set.kids_id = record.insertId;
    return set;
  } catch (err) {
    if (err.errno === 1062) {
      throw new Error('指定システム環境で作成できるKID上限数を超えましたので、作成できませんでした');
    }
    throw err;
  }
}

function remove(condition) {
  return DbSugar.delete(condition, 'kids');
}

function update(input_map, condition) {
  return DbSugar.update(input_map, condition, 'kids');
}

// exports
module.exports = {
  select,
  findFenicsKey,
  findNewKid,
  findNewUserKey,
  findNewFenicsKey,
  findNewDbPass,
  addRow,
  remove,
  update,
};
