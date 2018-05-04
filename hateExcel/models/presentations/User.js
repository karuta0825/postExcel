// import module
const database = require('../mysql/database');
const querys = require('../mysql/list_query');
const moment = require('../../public/js/lib/moment.min');
const _ = require('../../public/js/lib/underscore');

const db = database.createClient();
const Customer = require('../tables/Customer');
const Busiv = require('../tables/Busiv');
const Kid = require('../tables/Kid');
const Mobile = require('../tables/Mobile');

/**
 * KIDテーブル更新に必要なパラメータを生成
 * @return {Array}
 */
function _mkParamForKids(kid, obj) {
  const result = {};
  result.kid = kid;
  result.user_name = obj.user_name;
  result.kana = obj.kana;
  result.number_pc = obj.number_pc;
  result.has_qa = (obj.has_qa) ? '1' : '0';
  result.is_new_contract = (obj.is_new_contract) ? '1' : '0';
  result.is_replaced_from_cj = (obj.is_replaced_from_cj) ? '1' : '0';
  result.is_replaced_from_wc = (obj.is_replaced_from_wc) ? '1' : '0';
  result.is_replaced_from_another = (obj.is_replaced_from_another) ? '1' : '0';
  result.register_on = moment().format('YYYY-MM-DD');
  result.is_registered = 1;
  return [result, { id: obj.id }];
}

function _mkParamForCustomers(obj) {
  const result = _.clone(obj);
  const condition = obj.kids_id;
  delete result.kids_id;
  return [result, { kids_id: condition }];
}

/**
 * ライセンステーブル更新に必要なパラメータを生成
 * @return {Array}
 */
function _mkParamForLicenses(obj) {
  const result = _.clone(obj);
  const condition = obj.kids_id;
  delete result.kids_id;

  // オブジェクトからコロン区切りのライセンス情報を生成
  const license = {
    services: _.chain(result)
      .pick(v => (v === '1'))
      .keys()
      .value()
      .join(':'),
  };

  return [license, { kids_id: condition }];
}

/**
 * パートナーテーブル更新に必要なパラメータを生成
 * @return {Array}
 */
function _mkParamForPartners(obj) {
  const result = _.clone(obj);
  const condition = result.kids_id;
  delete result.kids_id;
  return [result, { kids_id: condition }];
}

/**
 * ビジVテーブル更新に必要なパラメータを生成
 * @return {Array}
 */
function _mkParamForBusiv(obj) {
  const result = _.clone(obj);
  const condition = result.kids_id;
  delete result.kids_id;
  return [
    { information: JSON.stringify(result) },
    { kids_id: condition },
  ];
}


function register(items) {
  const qrys = [];
  const params = [];
  const kid = items.kid.substr(-5, 5);
  delete items.kid;
  delete items.clients;
  delete items.mobiles;

  // テーブルごとの個別処理
  // kids
  qrys.push(querys.update.kids);
  params.push(_mkParamForKids(kid, items.kids));

  // customers;
  qrys.push(querys.update.customers);
  params.push(_mkParamForCustomers(items.customers));

  // licenses;
  qrys.push(querys.update.licenses);
  params.push(_mkParamForLicenses(items.licenses));

  // partners;
  qrys.push(querys.update.partners);
  params.push(_mkParamForPartners(items.partners));

  // busivs
  qrys.push(querys.update.busivs);
  params.push(_mkParamForBusiv(items.busivs));

  return db.transaction(qrys, params);
}

/**
 * 拠点追加
 * @param {string} kids_id [description]
 * @return {Promise<>} [description]
 */
async function addBase(kids_id, is_first = false) {
  if (!kids_id) { throw new Error('kids_idを指定してください'); }

  try {
    // 初回作成時は不要だが、拠点追加時は必要となる
    if (!is_first) {
      await Customer.addRow(kids_id);
    }

    // busiv
    const base_id = await Customer.findLastBaseId(kids_id);
    await Busiv.addRow(kids_id, base_id);

    // mobile
    const fenics_key = await Mobile.findNewFenicsKey();
    return Mobile.addRow(kids_id, base_id, fenics_key);
  } catch (e) {
    throw e;
  }
}

/**
 * [create description]
 * @param  {[type]} options.kid            [description]
 * @param  {[type]} options.environment_id [description]
 * @param  {[type]} options.server         [description]
 * @param  {[type]} options.create_user_id [description]
 * @return {[type]}                        [description]
 *
 */
async function create({
  kid, environment_id, server, create_user_id,
}) {
  try {
    const recordInfo = await Kid.addRow({
      kid, environment_id, server, create_user_id,
    });
    return addBase(recordInfo.kids_id, true);
  } catch (e) {
    throw e;
  }
}


module.exports = {
  create,
  register,
  addBase,
};

