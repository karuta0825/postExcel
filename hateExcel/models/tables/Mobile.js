
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

  for (let i = 0; i < 2; i += 1) {
    r += c[Math.floor(Math.random() * cl)];
  }
  return adminId + r;
}

/**
 * [_makeFenicsKey description]
 * @return {String} [description]
 */
function _makeFenicsKey() {
  const num = Math.floor((Math.random() * 9) + 1);
  return `m${num}${u_others.makeFenicsKey(3)}`;
}

function findNewFenicsKey(fenicskey) {
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
async function addRow(kids_id, base_id, fenics_key) {
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

/**
 * @param  {{
 *           fenics_key?: string,
 *           admin_id?: string,
 *           admin_pw?: string,
 *           city_cd?: string,
 *           office_cd?: string,
 *           disk_name?: string,
 *           disk_size?: string,
 *         }} input_map
 * @param  {{base_id: string}} condition
 * @return {Promise<null>}
 */
function update(input_map, condition) {
  return DbSugar.update(input_map, condition, 'mobiles');
}

/**
 * [select description]
 * @param  {string} kids_id
 * @return {Promise<[{
 *           kids_id: string,
 *           base_id: number,
 *           fenics_key: string,
 *           client_number: number,
 *           admin_id: string,
 *           admin_pw: string,
 *           city_cd: srting,
 *           office_cd: string,
 *           disk_name: string,
 *           disk_size: string
 *         }]>}
 */
function select(kids_id) {
  return DbSugar.select(kids_id, 'mobiles');
}

async function findFenicsKey(kids_id) {
  const mobileInfo = await select(kids_id);
  if (mobileInfo.length > 0) {
    return mobileInfo[0].fenics_key;
  }
  return null;
}

function remove(condition) {
  return DbSugar.delete(condition, 'mobiles');
}

async function isUniqueFenicskey(fenicskey, kids_id) {
  if (!fenicskey || !kids_id) {
    throw new Error('引数が正しくありません');
  }
  return DbSugar.select([fenicskey, kids_id], 'is_unique_mobile_fenicskey_for_update')
    .then(({ length }) => length > 0);
}

module.exports = {
  findFenicsKey,
  findNewFenicsKey,
  isUniqueFenicskey,
  addRow,
  update,
  select,
  remove,
};
