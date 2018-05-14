
const assert = require('power-assert');
const Customer = require('../../models/tables/Customer.js');

describe('Customersモジュール', () => {
  describe('selectメソッド', () => {
    it('kids_idを指定すると、顧客情報を返す', () => Customer.select('5')
      .then((r) => {
        assert(r.length === 1);
      }));
  });

  describe('findLastBaseIdメソッド', () => {
    it('kids_id(78)を指定すると、拠点id(39)を返す', () => Customer.findLastBaseId(78)
      .then((r) => {
        assert(r === 39);
      }));

    it('複数のbase_idを持つkids_idを指定すると、最後のbase_idを返す', () => Customer.findLastBaseId(2736)
      .then((r) => {
        assert(r === 206);
      }));

    it('kids_idを指定しないと、エラーを返す', () => Customer.findLastBaseId()
      .catch((err) => {
        assert(err.message === '引数を指定してください');
      }));
  });

  describe('addRowメソッド', () => {
    it('kids_idを与えると、customersテーブルに行追加', () => Customer.addRow('1')
      .then((r) => {
        assert(r.affectedRows === 1);
      }));

    it('kids_idを与えないと、エラーオブジェクトを返す', () => Customer.addRow()
      .catch((err) => {
        assert(err.message === '引数を指定してください');
      }));
  });

  describe('updateメソッド', () => {
    it('kids_idと更新内容を受け取ると、該当行を更新する', () => {
      const data = {
        base_name: 'updated',
        address: '住所はここだ',
      };
      const condition = { kids_id: 2840 };
      const access = 'customers';

      return Customer.update(data, condition, access)
        .then((r) => {
          assert(r === null);
        });
    });
  });

  describe('removeメソッド', () => {
    it('kids_idを指定すると、該当行を削除する', () => {
      const condition = { kids_id: 1 };
      return Customer.remove(condition)
        .then((r) => {
          assert(r.affectedRows === 1);
        });
    });
  });

  describe('planUpdateメソッド', () => {
    it('実行すると、関数が返る', () => {
      const plan = Customer.planUpdate();
      assert(plan instanceof Function);
    });

    it('返り値の関数に条件kids_idと更新内容を渡して関数適用すると、更新される', () => {
      const data = {
        base_name: 'updated',
        address: '住所はここだった',
      };
      const condition = { kids_id: 2840 };
      const plan = Customer.planUpdate(data, condition);

      return plan()
        .then(() => Customer.select(2840))
        .then((r) => {
          assert(r[0].address === '住所はここだった');
        });
    });
  });
});
