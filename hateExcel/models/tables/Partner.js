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
  if (!kids_id) { throw new Error('引数を指定してください'); }
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

module.exports = {
  select,
  update,
  planUpdate: DbSugar.mkPlan(update),
};
