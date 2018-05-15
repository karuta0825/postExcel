const assert = require('power-assert');
const Column = require('../../models/tables/Column');

describe('Columnモジュール', () => {
  describe('selectメソッド', () => {
    it('uidを与えると、ヘッダー表示情報を返す', () => Column.select(null, 1)
      .then((r) => {
        assert(r.length === 1);
        assert(r[0].kid !== undefined);
      }));

    it('引数を与えないと、ヘッダ名情報を返す', () => Column.select()
      .then((r) => {
        assert(r.length === 1);
        assert(r[0].kid === 'KID');
      }));
  });

  describe('updateメソッド', () => {
    it('uidとKIDの非表示値を与えると、KIDの値が更新される', () => Column.update(
      {
        kid: '0',
      },
      2,
    )
      .then(() => Column.select(null, 2))
      .then((r) => {
        assert(r[0].kid === '0');
      }));
  });
});
