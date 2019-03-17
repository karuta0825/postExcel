const { DbSugar } = require('../mysql/DbSugar');

/**
 * @param  {string} kids_id
 * @return {Promise<[{
 *           sa_pid: string,
 *           sa_company: string,
 *           sa_postal_cd: string,
 *           sa_address: string,
 *           sa_kana: string,
 *           sa_name: string,
 *           sa_tel: string,
 *           sa_fax: string,
 *           sa_email: string,
 *           se_pid: string,
 *           se_company: string,
 *           se_postal_cd: string,
 *           se_address: string,
 *           se_kana: string,
 *           se_name: string,
 *           se_tel: string,
 *           se_fax: string,
 *           se_email: string,
 *           em_company: string,
 *           em_name: string,
 *           em_tel: string,
 *           em_email: string,
 *         }] | null>}
 */
async function select(kids_id) {
  if (!kids_id) {
    throw new Error('引数を指定してください');
  }
  return DbSugar.select(kids_id, 'partners');
}

/**
 * @param  {{
 *           [sa_pid]: string,
 *           [sa_company]: string,
 *           [sa_postal_cd]: string,
 *           [sa_address]: string,
 *           [sa_kana]: string,
 *           [sa_name]: string,
 *           [sa_tel]: string,
 *           [sa_fax]: string,
 *           [sa_email]: string,
 *           [se_pid]: string,
 *           [se_company]: string,
 *           [se_postal_cd]: string,
 *           [se_address]: string,
 *           [se_kana]: string,
 *           [se_name]: string,
 *           [se_tel]: string,
 *           [se_fax]: string,
 *           [se_email]: string,
 *           [em_company]: string,
 *           [em_name]: string,
 *           [em_tel]: string,
 *           [em_email]: string,
 *         }} input_map
 * @param  {{
 *           kids_id: string
 *         }} condition
 * @return {Promise<null>}
 */
function update(input_map, condition) {
  return DbSugar.update(input_map, condition, 'partners');
}

const itemNames = {
  sa_pid: 'PID',
  sa_company: '販社名',
  sa_postal_cd: '郵便番号',
  sa_address: '住所',
  sa_affliation: 'SA所属',
  sa_kana: 'SAフリガナ',
  sa_name: 'SA担当者',
  sa_tel: 'SA電話番号',
  sa_fax: 'SA_FAX',
  sa_email: 'SA_Email',
  se_pid: 'PID',
  se_company: '販社名',
  se_postal_cd: '郵便番号',
  se_address: '住所',
  se_affliation: 'SE所属',
  se_kana: 'SEフリガナ',
  se_name: 'SE担当者',
  se_tel: 'SE電話番号',
  se_fax: 'SE_FAX',
  se_email: 'SE_Email',
  em_company: '緊急連絡先社名',
  em_name: '担当者',
  em_tel: '緊急電話番号',
  em_email: '緊急Email',
};

module.exports = {
  select,
  update,
  planUpdate: DbSugar.mkPlan(update),
  itemNames,
};
