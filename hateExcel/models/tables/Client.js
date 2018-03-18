
const {DbSugar} = require('../mysql/DbSugar')
const u_others = require('../util/u_others');
const flow = require('../util/flow');


// クライアント数と実際の個数があっていないバグを見つけた
// 98399


/**
 * [makeId description]
 * @param  {{kids_id:String, userkey:String, create_user_id:Number}} input_map [description]
 * @return {[type]}           [description]
 */
function makeId({kids_id, userkey, create_user_id}) {
  let client = {};
  return findNewId({kids_id,userkey})
  .then( client_id => {
    client['kids_id']        = kids_id
    client['client_id']      = client_id;
    client['client_pass']    = client_id;
    client['create_on']      = new Date();
    client['create_user_id'] = create_user_id;
    client['is_admin']       = 0;
  })
  .then( () => {
    return DbSugar.insert(client, 'make_client');
  })
}

/**
 * [findNewId description]
 * @param  {[type]} options.kids_id [description]
 * @param  {[type]} options.userkey [description]
 * @return {[type]}                 [description]
 */
function findNewId({kids_id, userkey}) {

  if (!kids_id || !userkey) {
    return Promise.reject('正しい引数を指定してください');
  }

  return DbSugar.select(kids_id,'find_last_client_id')
  .then( r => {
    if ( r.length === 0 ) {
      return userkey + '0001';
    }
    return u_others.getNextZeroPadData(r[0].client_id);
  })

}

module.exports = {
  findNewId,
  makeId,
  makeIds : flow.makeSyncLoop(makeId)
};
