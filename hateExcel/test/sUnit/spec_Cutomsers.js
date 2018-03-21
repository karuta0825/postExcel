
const assert = require('power-assert');
const sinon = require('sinon');
const Customer = require('../../models/tables/Customer.js');

describe('Customersモジュール', () => {

  describe('findLastBaseIdメソッド', () => {

    it('kids_id(79)を指定すると、拠点id(5)を返す', () => {
      return Customer.findLastBaseId('79')
      .then( r => {
        assert( r === 5 );
      });
    });

    it('複数のbase_idを持つkids_idを指定すると、最後のbase_idを返す', () => {
      return Customer.findLastBaseId('2736')
      .then( r => {
        assert( r === 206 );
      });
    });

    it('kids_idを指定しないと、クエリエラーを返す', () => {
      return Customer.findLastBaseId()
      .catch( err => {
        assert( err.code === 'ER_PARSE_ERROR');
      })
    });

  });

  describe('addRowメソッド', () => {

    it('ok_kids_idを与えると、customersテーブルに行追加')
    // it('kids_idを与えると、customersテーブルに行追加', () => {
    //   return Customer.addRow('1')
    //   .then( r => {
    //     assert(r.affectedRows === 1);
    //   })
    // });

    it('kids_idを与えないと、エラーオブジェクトを返す', () => {
      return Customer.addRow()
      .catch( err => {
        assert( err.message === '引数を指定してください');
      })
    });

  });

});
