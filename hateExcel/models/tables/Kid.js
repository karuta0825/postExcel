/**
 * Kidsテーブルに関する操作
 */

const {DbSugar} = require('../mysql/DbSugar')
const u_others = require('../util/u_others');

/**
 * [findNewKid description]
 * @param  {String} environment_id [description]
 * @return {Promise<{kid:Number}>}                [description]
 */
function findNewKid (environment_id) {

  return DbSugar.select(environment_id, 'find_new_kid')
  .then( (result) => {
    if ( result.length === 0 ) {
      return DbSugar.select(environment_id, 'find_initial_kid');
    }
    return Promise.resolve([{ kid : Number(result[0].kid) + 1}]);
  })
  ;

};


/**
 * [findNewUserKey description]
 * @param  {String} userkey [description]
 * @return {Promise<String>}         [description]
 */
function findNewUserKey(userkey) {
  let newUserKey;
  if ( !userkey ) { userkey = u_others.makeUserKey(6); }

  return DbSugar.select( userkey, 'find_new_userkey')
  .then( (result) => {
    if ( result.length !== 0 ) {
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
function findNewFenicsKey (fenicsKey) {
  let newFenicsKey;
  if ( !fenicsKey ) { fenicsKey = u_others.makeFenicsKey(4) }

  return DbSugar.select( fenicsKey, 'is_unique_fenicskey')
  .then( (result) => {
    if ( result.length !== 0 ) {
      newFenicsKey = u_others.makeFenicsKey(4);
      return findNewFenicsKey( newFenicsKey );
    }
    return Promise.resolve(fenicsKey);
  });
}

/**
 * @param  {String} userkey [description]
 * @return {String}         [description]
 */
function findNewDbPass (userkey) {
  var convert = userkey.replace(/A/g,"4")
                       .replace(/B/g,"8")
                       .replace(/E/g,"3")
                       .replace(/G/g,"6")
                       .replace(/I/g,"1")
                       .replace(/O/g,"0")
                       .replace(/S/g,"5")
                       .replace(/T/g,"7")
                       .replace(/Z/g,"2")
                       ;
  return 'U53R' + convert;
}

/**
 * add one row to kids table.
 * @param  {{kid:String, system_type:String, version:String, environemnt_id:String, server:String}} input_map parameter object for make user.
 * @return {Promise<{}>}           [description]
 */
function addRow(input_map) {
  let set = {};

  return findNewKid(input_map.environment_id)
  .then( r => {
    set.kid = input_map.kid || r[0].kid;
  })
  .then( () => {
    return findNewUserKey();
  })
  .then( r => {
    set.userkey = r;
    set['db_password']    = findNewDbPass( set.userkey );
    set['fenics_key']     = set.userkey.substr(0,4).toLowerCase();
    set['server']         = input_map['server'];
    set['environment_id'] = input_map['environment_id'];
    set['create_user_id'] = input_map['create_user_id'];
    set['create_on']      = new Date();
    // ドコモユーザーのとき
    if ( input_map.system_type === 'docomo' ) {
      set['is_replaced_from_another'] = 1;
    }
  })
  .then( () => {
    return DbSugar.insert(set, 'make_user')
  })
  .then( r => {
    set.kids_id = r.insertId;
    return set;
  })
  .catch( err => {
    if (err.errno === 1062) {
      throw new Error('指定システム環境で作成できるKID上限数を超えましたので、作成できませんでした');
    }
    throw err;
  });
}

// exports
module.exports = {
  findNewKid : findNewKid,
  findNewUserKey : findNewUserKey,
  findNewFenicsKey : findNewFenicsKey,
  findNewDbPass : findNewDbPass,
  addRow : addRow
};
