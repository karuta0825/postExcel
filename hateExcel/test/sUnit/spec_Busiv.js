
const assert = require('power-assert');
const Busiv = require('../../models/tables/Busiv.js');

describe('Busivモジュール', () => {
  describe('addRowメソッド', () => {
    it('ok_kids_id, base_idを与えると、busivsテーブルに行追加');
    // it('kids_id, base_idを与えると、busivsテーブルに行追加', () => {
    //   return Busiv.addRow(1,99999)
    //   .then( r => {
    //     assert( r.affectedRows === 1 );
    //   });
    // });

    it('引数をひとつも渡さないと、エラーオブジェクトを返す', () => Busiv.addRow()
      .catch((err) => {
        assert(err.message === '引数を指定してください');
      }));

    it('kids_idを与えないと、エラーオブジェクトを返す', () => Busiv.addRow(null, 1)
      .catch((err) => {
        assert(err.message === '引数を指定してください');
      }));

    it('base_idを与えないと、エラーオブジェクトを返す', () => Busiv.addRow(1)
      .catch((err) => {
        assert(err.message === '引数を指定してください');
      }));
  });

  describe('updateメソッド', () => {
    it('kids_idと更新対象のオブジェクトを渡すと該当行の更新をする');
  });
});
