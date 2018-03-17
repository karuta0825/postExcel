

const {DbSugar} = require('../mysql/DbSugar');
const u_others = require('../util/u_others');
const flow = require('../util/flow');


/**
 * [makeFenicsId description]
 * @param  {{kids_id: String, fenics_key: String}} [description]
 * @return {Promise<String>}           [description]
 *
 * @throws {Promise<Exception>}
 */
function findNewMobileId({kids_id, fenics_key}={}) {
  if (!kids_id || !fenics_key) {
    return Promise.reject(new Error('引数が正しくありません'));
  }

  return DbSugar.select(kids_id, 'find_last_mobile_fenics_id')
  .then( r => {
    if (r.length === 0) {
      return fenics_key + '001';
    }
    else {
      return u_others.getNextZeroPadData( r[0].fenics_id );
    }
  });
}

/**
 * [makeFenicsId description]
 * @param  {{kids_id: String, fenics_key: String}} input_map [description]
 * @return {Promise<String>}           [description]
 *
 * @throws {Promise<Exception>}
 */
function findNewId({kids_id, fenics_key}={}) {
  if (!kids_id || !fenics_key) {
    return Promise.reject(new Error('引数が正しくありません'));
  }

  return DbSugar.select(kids_id, 'find_last_fenics_id')
  .then( r => {
    if (r.length === 0) {
      return fenics_key + '01001';
    }
    else {
      return u_others.getNextZeroPadData( r[0].fenics_id );
    }
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
function makeUser({kids_id,fenics_key}={}, is_mobile=false) {
  let fenics_account = {};

  return Promise.all([
    is_mobile ? findNewMobileId({kids_id,fenics_key}) : findNewId({kids_id,fenics_key}),
    findNextFenicsIp(null)
  ])
  .then( function (results) {
    fenics_account['kids_id']    = kids_id;
    fenics_account['fenics_id']  = results[0];
    fenics_account['password']   = results[0];
    fenics_account['pc_name']    = is_mobile ? '' : results[0].toUpperCase();
    fenics_account['fenics_ip']  = results[1];
    fenics_account['start_on']   = new Date();
    fenics_account['create_on']  = new Date();
    fenics_account['is_mobile']  = is_mobile ? 1 : 0;
  })
  .then( () => {
    return DbSugar.insert(fenics_account, 'make_fenics_account')
  });
}

module.exports = {
  findNewId : findNewId,
  findNewMobileId : findNewMobileId,
  makeUser : makeUser,
  makeUsers : flow.makeSyncLoop(makeUser),
};