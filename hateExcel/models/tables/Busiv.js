const { DbSugar } = require('../mysql/DbSugar');

/**
 * @param  {string} kids_id
 * @return {[{
 *           kid_id: string,
 *           base_id: string,
 *           information: any
 *         }]}
 */
function select(kids_id) {
  return DbSugar.select(kids_id, 'busivs').then(r =>
    r.map(item => ({
      base_id: item.base_id,
      base_name: item.base_name,
      ...JSON.parse(item.information),
    })));
}

function selectByBaseId(base_id) {
  return DbSugar.select(base_id, 'busiv_by_baseId').then(r =>
    r.map(item => ({
      kids_id: item.kids_id,
      base_id: item.base_id,
      base_name: item.base_name,
      ...JSON.parse(item.information),
    })));
}

/**
 * 拠点テーブルに指定したkid_idの行を追加する
 * @param {String} kids_id [description]
 * @param {Number} base_id [description]
 * @return {Promise<any>} [description]
 *
 * @throws {Promise<Exception>}
 *
 */
async function addRow(kids_id, base_id) {
  if (!kids_id || !base_id) {
    throw new Error('引数を指定してください');
  }
  return DbSugar.insert({ kids_id, base_id }, 'make_busiv');
}

/**
 * [update description]
 * @param  {Object} input_map
 *         {JSON} input_map.information
 * @param  {Object} condition
 *         {String} condition.base_id
 * @return {Promise<>} result
 */
function update(input_map, condition) {
  return DbSugar.update(input_map, condition, 'busivs');
}

function remove(condition) {
  return DbSugar.delete(condition, 'busivs');
}

const itemNames = {
  circuit_name: '回線品目',
  circuit_service: '回線サービス',
  open_date: '開通通知日',
  w_network: 'ネットワークアドレス',
  w_subnet: 'サブネットマスク',
  w_router: 'Sirルータアドレス',
  has_sx: 'S連携有無',
  how_to_cooperate: '連携方法',
  has_L3: 'L3有無',
  sx_ip: 'SのIPアドレス',
  has_carte: 'カルテ連携有無',
  carte_system: 'カルテシステム',
  carte_html_save_ip: 'カルテHTML保存IP',
  has_cc: 'CC連携',
  cc_ip: 'CCのIPアドレス',
  download_server_ip: 'ダウンロードサーバ',
  auth_server_ip: '認証サーバ',
  virual_dl_ip: '仮想ダウンロードIPアドレス',
  has_sxr_j: 'SXRまたはJ連携有無',
  has_rx: 'RX連携有無',
  rx_ip: 'RのIPアドレス',
  has_sd: 'スマデバ有無',
  clients_ip: 'クライアントIPアドレス',
};

module.exports = {
  select,
  selectByBaseId,
  addRow,
  update,
  remove,
  planUpdate: DbSugar.mkPlan(update),
  itemNames,
};
