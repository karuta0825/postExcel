
const {DbSugar} = require('../mysql/DbSugar');

/**
 * [authenticate description]
 * @param  {{user:String, pass:String}} data [description]
 * @return {Promise<{id:Number, uid:String, name:String, newadd:Number, is_admin:Number}| null>}      [description]
 */
function authenticate(data) {
  let params = [
    data.user,
    data.pass
  ];
  return DbSugar.select(params, 'users')
  .then( r => {
    if ( r && r.length > 0 && r[0].newadd === 0 ) {
      delete r[0].password;
      return r[0];
    }
    return null;
  });
}

/**
 * [makeLoginAccount description]
 * @param  {{}} data [description]
 * @return {Promise<{}>}      [description]
 */
function makeLoginAccount(data) {
  return DbSugar.insert(data,'make_login_account')
}

module.exports = {
  authenticate,
  makeLoginAccount
};