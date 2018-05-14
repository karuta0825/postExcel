
const { DbSugar } = require('../mysql/DbSugar');

function select(some, uid) {
  if (!uid) {
    return DbSugar.selectAll('login_users');
  }
  return DbSugar.select(uid, 'login_user');
}

/**
 * [authenticate description]
 * @param  {{user:String, pass:String}} data
 * @return {Promise<{
 *           id: number,
 *           uid: string,
 *           name: string,
 *           newadd: number,
 *           is_admin: number
 *           }| null>}
 *
 * @throws {Promise<Exception>}
 */
async function authenticate({ user, pass } = {}) {
  if (!user || !pass) {
    throw new Error('引数を指定してください');
  }

  return DbSugar.select([user, pass], 'users')
    .then((r) => {
      if (r && r.length > 0 && r[0].newadd === 0) {
        delete r[0].password;
        return r[0];
      }
      return null;
    });
}

/**
 * [makeLoginAccount description]
 * @param  {Number} options.uid      [description]
 * @param  {String} options.name     [description]
 * @param  {String} options.password [description]
 * @param  {String} options.newadd   [description]
 * @return {Promise<{}>}      [description]
 */
async function addRow({
  uid, name, password, newadd = 1,
} = {}) {
  if (!uid || !name || !password) {
    throw new Error('引数が正しくありません');
  }
  return DbSugar.insert({
    uid, name, password, newadd,
  }, 'make_login_account');
}

function update(input_map, condition) {
  return DbSugar.update(input_map, condition, 'login_user_info');
}

module.exports = {
  select,
  authenticate,
  addRow,
  update,
};
