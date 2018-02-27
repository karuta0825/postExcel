// import module
const database = require('../mysql/database');
const querys   = require('../mysql/list_query');
const moment   = require('../../public/js/lib/moment.min');
const _        = require('../../public/js/lib/underscore');
const db       = database.createClient();
const Customers = require('../tables/Customer');
const Busivs = require('../tables/Busiv');

function register ( items, callback ) {

  let
    qrys   = []
  , params = []
  , kid    = items.kid.substr(-5,5)
  , condition
  ;

  delete items.kid;
  delete items.clients;
  delete items.mobiles;

  // テーブルごとの個別処理
  // kids
  qrys.push( querys.update['kids'] )
  params.push( _mkParamForKids(kid, items['kids']) );

  // customers;
  qrys.push( querys.update['customers']);
  params.push( _mkParamForCustomers(items['customers']) );

  // licenses;
  qrys.push( querys.update['licenses']);
  params.push( _mkParamForLicenses(items['licenses']) );

  // partners;
  qrys.push( querys.update['partners']);
  params.push( _mkParamForPartners(items['partners']));

  // busivs
  qrys.push( querys.update['busivs']);
  params.push( _mkParamForBusiv(items['busivs']));

  db.transaction( qrys, params, callback );

}

/**
 * KIDテーブル更新に必要なパラメータを生成
 * @return {Array}
 */
function _mkParamForKids ( kid, obj ) {
  let result = {};
  result['kid']                      = kid;
  result['user_name']                = obj.user_name;
  result['kana']                     = obj.kana;
  result['number_pc']                = obj.number_pc;
  result['has_qa']                   = ( obj['has_qa']                   ) ? '1' : '0';
  result['is_new_contract']          = ( obj['is_new_contract']          ) ? '1' : '0';
  result['is_replaced_from_cj']      = ( obj['is_replaced_from_cj']      ) ? '1' : '0';
  result['is_replaced_from_wc']      = ( obj['is_replaced_from_wc']      ) ? '1' : '0';
  result['is_replaced_from_another'] = ( obj['is_replaced_from_another'] ) ? '1' : '0';
  result['register_on'] = moment().format('YYYY-MM-DD');
  result['is_registered'] = 1
  return [ result,  { 'id' : obj.id } ];
}

function _mkParamForCustomers ( obj ) {
  let result = _.clone(obj);
  let condition = obj['kids_id'];
  delete result['kids_id'];
  return [ result, { 'kids_id' : condition }];
}

/**
 * ライセンステーブル更新に必要なパラメータを生成
 * @return {Array}
 */
function _mkParamForLicenses ( obj ) {
  let result = _.clone(obj);
  let condition = obj['kids_id'];
  let license
  delete result['kids_id'];

  // オブジェクトからコロン区切りのライセンス情報を生成
  license = {
    services : _.chain(result)
                .pick( function (v) {return v === '1'} )
                .keys()
                .value()
                .join(':')
  }

  return [ license, { 'kids_id' : condition } ];

}

/**
 * パートナーテーブル更新に必要なパラメータを生成
 * @return {Array}
 */
function _mkParamForPartners ( obj ) {
  let result = _.clone(obj);
  let condition = result['kids_id'];
  delete result['kids_id'];
  return [ result, { 'kids_id' : condition }];
}

/**
 * ビジVテーブル更新に必要なパラメータを生成
 * @return {Array}
 */
function _mkParamForBusiv ( obj ) {
  let result = _.clone(obj);
  let condition = result['kids_id'];
  delete result['kids_id'];
  return [
    {'information' : JSON.stringify(result) },
    { 'kids_id' : condition }
  ];
}

/**
 * [create description]
 * @param  {{}} input_map [description]
 * @return {Promise<>}           [description]
 */
function create(input_map) {
  return Kids.addRow(input_map)
  .then( r => {
    return addBase(r.kids_id);
  })
}

/**
 * 拠点追加
 * @param {String} kids_id [description]
 * @return {Promise<>} [description]
 */
function addBase(kids_id) {
  if (!kids_id) { throw new Error('kids_idを指定してください'); }
  let stock = {kids_id : kids_id};

  return Customers.addRow(kids_id)
  .then( () => {
    return Customers.findLastBaseId(kids_id)
  })
  .then( base_id => {
    stock.base_id = base_id;
    return Busiv.addRow(kids_id, base_id);
  })
  .then( () => {
    return Mobile.findNewFenicsKey()
  })
  .then(mobile_fenicskey => {
    return Mobile.addRow(
      stock.kids_id,
      stock.base_id,
      mobile_fenicskey
    );
  });
}


module.exports = {
  create : create,
  register : register,
  addBase : addBase
};

