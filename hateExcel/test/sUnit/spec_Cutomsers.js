
const assert = require('power-assert');
const sinon = require('sinon');
const Customer = require('../../models/tables/Customer.js');

describe('Customersモジュール', () => {
  describe('findLastBaseIdメソッド', () => {
    it('kids_id(79)を指定すると、拠点id(5)を返す', () => Customer.findLastBaseId(79)
      .then((r) => {
        assert(r === 5);
      }));

    it('複数のbase_idを持つkids_idを指定すると、最後のbase_idを返す', () => Customer.findLastBaseId(2736)
      .then((r) => {
        assert(r === 206);
      }));

    it('kids_idを指定しないと、クエリエラーを返す', () => Customer.findLastBaseId()
      .catch((err) => {
        assert(err.code === 'ER_PARSE_ERROR');
      }));
  });

  describe('addRowメソッド', () => {
    it('ok_kids_idを与えると、customersテーブルに行追加');
    // it('kids_idを与えると、customersテーブルに行追加', () => {
    //   return Customer.addRow('1')
    //   .then( r => {
    //     assert(r.affectedRows === 1);
    //   })
    // });

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

  describe('deleteメソッド', () => {
    it('ok_kids_idを指定すると、該当行を削除する');
    // it('kids_idを指定すると、該当行を削除する', () => {
    //   const condition = {kids_id:10000};
    //   const access = 'customers';

    //   return Customer.delete(condition, access)
    //   .then( r => {
    //     assert(r.affectedRows === 1);
    //   });
    // })
  });
});
