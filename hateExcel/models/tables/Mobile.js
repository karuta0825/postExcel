
const { DbSugar } = require('../mysql/DbSugar');
const u_others = require('../util/u_others');

/**
 * [_makeAdminPw description]
 * @param  {[type]} adminId [description]
 * @return {String}         [description]
 */
function _makeAdminPw(adminId) {
  const c = '1234567890';
  const cl = c.length;
  let r = '';

  for (let i = 0; i < 2; i++) {
    r += c[Math.floor(Math.random() * cl)];
  }
  return adminId + r;
}

/**
 * [_makeFenicsKey description]
 * @return {String} [description]
 */
function _makeFenicsKey() {
  const num = Math.floor(Math.random() * 9 + 1);
  return `m${num}${u_others.makeFenicsKey(3)}`;
}

class Mobile extends DbSugar {
  /**
   * [findNewFenicsKey description]
   * @param  {String} fenicskey [description]
   * @return {Promise<String>}           [description]
   */
  static findNewFenicsKey(fenicskey) {
    let newFenicskey = fenicskey || _makeFenicsKey();

    return DbSugar.select(newFenicskey, 'is_unique_mobile_fenicskey')
      .then((r) => {
        if (r.length !== 0) {
          newFenicskey = _makeFenicsKey();
          return this.findNewFenicsKey(newFenicskey);
        }
        return Promise.resolve(newFenicskey);
      });
  }

  /**
   * @param {String} kids_id   [description]
   * @param {Number} base_id   [description]
   * @param {String} fenicskey [description]
   * @return {Promise<>} [description]
   */
  static async addRow(kids_id, base_id, fenics_key) {
    if (!kids_id || !base_id || !fenics_key) {
      throw new Error('引数が存在してません');
    }

    const params = {
      kids_id,
      base_id,
      fenics_key,
      admin_id: fenics_key,
      admin_pw: _makeAdminPw(fenics_key),
    };

    return DbSugar.insert(params, 'make_mobiles');
  }
}


module.exports = Mobile;

// module.exports = {
//   findNewFenicsKey,
//   addRow
// };
