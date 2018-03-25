

const {DbSugar} = require('../mysql/DbSugar');
const u_others = require('../util/u_others');

/**
 * [makeFenicsId description]
 * @param  {{kids_id: String, fenics_key: String}} input_map [description]
 * @return {Promise<String>}           [description]
 *
 * @throws {Promise<Exception>}
 */
async function findNewId({kids_id, fenics_key}={}, is_mobile=false) {
  if (!kids_id || !fenics_key) {
    throw new Error('引数が正しくありません');
  }

  if (is_mobile) {
    return DbSugar.select(kids_id, 'find_last_mobile_fenics_id')
    .then( r => {
      if (r.length === 0) { return fenics_key + '001';}
      return u_others.getNextZeroPadData( r[0].fenics_id );
    });
  }

  return DbSugar.select(kids_id, 'find_last_fenics_id')
  .then( r => {
    if (r.length === 0) { return fenics_key + '01001';}
    return u_others.getNextZeroPadData( r[0].fenics_id );
  });

}

/**
 * [findNextFenicsIp description]
 * @return {Promise<String>} [description]
 */
function findNextFenicsIp() {
  return DbSugar.select(null,'get_new_fenics_ip')
  .then( r => {
    return r[0].next_ip
  })
}

/**
 * [makeUser description]
 * @param  {[type]}  options.kids_id      [description]
 * @param  {Object}  options.fenics_key} [description]
 * @param  {Boolean} is_mobile            [description]
 * @return {[type]}                       [description]
 */
async function makeUser({kids_id,fenics_key}={}, is_mobile=false) {
  const fenics_account = {};

  try {

    let [fenics_id,fenics_ip] = await Promise.all([
      findNewId({kids_id,fenics_key},is_mobile),
      findNextFenicsIp(null)
    ]);

    fenics_account['kids_id']   = kids_id;
    fenics_account['fenics_id'] = fenics_id;
    fenics_account['password']  = fenics_id;
    fenics_account['pc_name']   = is_mobile ? '' : fenics_id.toUpperCase();
    fenics_account['fenics_ip'] = fenics_ip;
    fenics_account['start_on']  = new Date();
    fenics_account['create_on'] = new Date();
    fenics_account['is_mobile'] = is_mobile ? 1 : 0;

    return DbSugar.insert(fenics_account, 'make_fenics_account');

  }catch(e) {
    throw e;
  }

}

async function makeUsers({kids_id,fenics_key}, is_mobile, count) {
  if ( count < 1 ) { throw new Error('ループ回数は1以上指定してください')}
  for (let i = 0; i < count; i += 1) {
    await makeUser({kids_id,fenics_key}, is_mobile);
  }
  return count;
}

module.exports = {
  findNewId,
  makeUser,
  makeUsers
};