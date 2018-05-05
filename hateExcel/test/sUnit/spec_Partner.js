const assert = require('power-assert');
const Partner = require('../../models/tables/Partner');

describe('Partnerモジュール', () => {
  describe('selectメソッド', () => {
    it('kids_idを指定すると、パートナー情報を返す', () => Partner.select('107')
      .then((r) => {
        assert(r.length === 1);
        assert(r[0].sa_pid !== undefined);
        assert(r[0].sa_company !== undefined);
        assert(r[0].sa_postal_cd !== undefined);
        assert(r[0].sa_address !== undefined);
        assert(r[0].sa_kana !== undefined);
        assert(r[0].sa_name !== undefined);
        assert(r[0].sa_tel !== undefined);
        assert(r[0].sa_fax !== undefined);
        assert(r[0].sa_email !== undefined);
        assert(r[0].se_pid !== undefined);
        assert(r[0].se_company !== undefined);
        assert(r[0].se_postal_cd !== undefined);
        assert(r[0].se_address !== undefined);
        assert(r[0].se_kana !== undefined);
        assert(r[0].se_name !== undefined);
        assert(r[0].se_tel !== undefined);
        assert(r[0].se_fax !== undefined);
        assert(r[0].se_email !== undefined);
        assert(r[0].em_company !== undefined);
        assert(r[0].em_name !== undefined);
        assert(r[0].em_tel !== undefined);
        assert(r[0].em_email !== undefined);
      }));

    it('存在しないkids_idを与えると、空の配列が返る', () => Partner.select('1')
      .then((r) => {
        assert.deepEqual(r, []);
      }));

    it('kids_idを与えないと、エラーが返る', () => Partner.select()
      .catch((e) => {
        assert(e.message === '引数を指定してください');
      }));
  });

  describe('updateメソッド', () => {
    it('kids_idで条件を,input_mapで更新内容を与えると、レコード更新する', () => Partner.update(
      {
        sa_company: '販社名変更しました',
      },
      {
        kids_id: '107',
      },
    )
      .then(() => Partner.select('107'))
      .then((r) => {
        assert(r.length === 1);
        assert(r[0].sa_company === '販社名変更しました');
      }));
  });
});
