
const assert = require('power-assert');
const sinon = require('sinon');
const Busiv = require('../../models/tables/Busiv.js');

describe('Busivモジュール', () => {

  describe('addRowメソッド', () => {

    it('ok_kids_id, base_idを与えると、busivsテーブルに行追加')
    // it('kids_id, base_idを与えると、busivsテーブルに行追加', () => {
    //   return Busiv.addRow(1,99999)
    //   .then( r => {
    //     assert( r.affectedRows === 1 );
    //   });
    // });

    it('引数をひとつも渡さないと、エラーオブジェクトを返す', () => {
      return Busiv.addRow()
      .catch( err => {
        assert( err.message === '引数を指定してください');
      });
    });

    it('kids_idを与えないと、エラーオブジェクトを返す', () => {
      return Busiv.addRow(null,1)
      .catch( err => {
        assert( err.message === '引数を指定してください');
      });
    });

    it('base_idを与えないと、エラーオブジェクトを返す', () => {
      return Busiv.addRow(1)
      .catch( err => {
        assert( err.message === '引数を指定してください');
      });
    });



  });

});
