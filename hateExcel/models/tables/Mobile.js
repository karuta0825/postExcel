
const {DbSugar} = require('../mysql/DbSugar');
const u_others = require('../util/u_others');

/**
 * [_makeAdminPw description]
 * @param  {[type]} adminId [description]
 * @return {String}         [description]
 */
function _makeAdminPw(adminId) {
  let c = '1234567890';
  let cl = c.length;
  let r = '';

  for(let i=0; i<2; i++){
    r += c[Math.floor(Math.random()*cl)];
  }
  return adminId + r;
}

/**
 * [_makeFenicsKey description]
 * @return {String} [description]
 */
function _makeFenicsKey() {
  var num = Math.floor( Math.random() * 9 + 1);
  return 'm' + num + u_others.makeFenicsKey(3);
};

/**
 * [findNewFenicsKey description]
 * @param  {String} fenicskey [description]
 * @return {Promise<String>}           [description]
 */
function findNewFenicsKey(fenicskey) {
  let newFenicskey = fenicskey || _makeFenicsKey();

  return DbSugar.select(newFenicskey,'is_unique_mobile_fenicskey')
  .then( r => {
    if ( r.length !== 0 ) {
      newFenicskey = _makeFenicsKey();
      return findNewFenicsKey(newFenicskey);
    }
    return Promise.resolve(newFenicskey);
  })
}

/**
 * @param {String} kids_id   [description]
 * @param {Number} base_id   [description]
 * @param {String} fenicskey [description]
 * @return {Promise<>} [description]
 */
function addRow(kids_id, base_id, fenicskey) {
  if (!kids_id || !base_id || !fenicskey) {
    throw new Error('引数が存在してません');
  }

  let params = {
    kids_id : kids_id,
    base_id : base_id,
    admin_id : fenicskey,
    admin_pw : _makeAdminPw(fenicskey)
  };

  return DbSugar.insert(params, 'make_mobiles');
}


module.exports = {
  findNewFenicsKey,
  addRow
};