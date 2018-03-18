
const assert = require('power-assert');
const sinon = require('sinon');
const Memo = require('../../models/tables/Memo');

describe('Memoモジュール', () => {

  describe('addMemoメソッド', () => {

    it('メモ追加する', () => {
      return Memo.addRow({
        kids_id : '1',
        title : 'test',
        priority_id : '1',
        message : 'message',
        create_user_id: 1,
        create_on : new Date()
      })
      .then( r => {
        assert(r.affectedRows === 1);
      })
    })

  });

});