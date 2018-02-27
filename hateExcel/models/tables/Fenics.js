

const {DbSugar} = require('../mysql/DbSugar');
const u_others = require('../util/u_others');
const flow = require('../util/flow');


/**
 * [makeFenicsId description]
 * @param  {{kids_id: String, fenics_key: String}} input_map [description]
 * @return {Promise<String>}           [description]
 *
 * @throws {Promise<Exception>}
 */
function findNewMobileId(input_map) {
  if (!input_map.kids_id || !input_map.fenics_key) {
    return Promise.reject(new Error('引数が正しくありません'));
  }

  return DbSugar.select(input_map.kids_id, 'find_last_mobile_fenics_id')
  .then( r => {
    if (r.length === 0) {
      return input_map.fenics_key + '001';
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
function findNewId(input_map) {
  if (!input_map.kids_id || !input_map.fenics_key) {
    return Promise.reject(new Error('引数が正しくありません'));
  }

  return DbSugar.select(input_map.kids_id, 'find_last_fenics_id')
  .then( r => {
    if (r.length === 0) {
      return input_map.fenics_key + '01001';
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
 * [makeMobileUser description]
 * @param  {[type]} input_map  [description]
 * @param  {[type]} idx        [description]
 * @param  {[type]} cb_resolve [description]
 * @return {[type]}            [description]
 */
function makeMobileUser(input_map, idx, cb_resolve) {
  var fenics_account = {};

  Promise.all([
    findNewMobileId(input_map),
    findNextFenicsIp(null)
  ])
  .then( function (results) {
    fenics_account['kids_id']    = input_map.kids_id;
    fenics_account['fenics_id']  = results[0];
    fenics_account['password']   = results[0];
    fenics_account['fenics_ip']  = results[1];
    fenics_account['start_on']   = new Date();
    fenics_account['create_on']  = new Date();
    fenics_account['is_mobile']  = 1;
  })
  .then( () => {
    return DbSugar.insert(fenics_account, 'make_fenics_account')
    .then( r => {
      cb_resolve(null);
    })
  });

}

function makeUser(input_map, idx) {
  let fenics_account = {};

  Promise.all([
    findNewMobileId(input_map),
    findNextFenicsIp(null)
  ])
  .then( function (results) {
    fenics_account['kids_id']    = input_map.kids_id;
    fenics_account['fenics_id']  = results[0];
    fenics_account['password']   = results[0];
    fenics_account['pc_name']    = results[0].toUpperCase();
    fenics_account['fenics_ip']  = results[1];
    fenics_account['start_on']   = new Date();
    fenics_account['create_on']  = new Date();
    fenics_account['is_mobile']  = 0;
  })
  .then( () => {
    return DbSugar.insert(fenics_account, 'make_fenics_account')
    .then( r => {
      cb_resolve(null);
    })
  });
}

module.exports = {
  findNewId : findNewId,
  findNewMobileId : findNewMobileId,
  makeUser : makeUser,
  makeMobileUser : makeMobileUser,
  makeUsers : flow.makeSyncLoop(makeUser),
  makeMobileUsers : flow.makeSyncLoop(makeMobileUser)
};