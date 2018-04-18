
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

  describe('updateメソッド', () => {
    it('idと更新内容を受け取ると、該当行を更新する', () => {

      const data = {
        title : 'chnage'
      };
      const condition = {id: 177};
      const access = 'memos'

      return Memo.update(data,condition,access)
      .then(r => {
        assert(r === null);
      })

    });
  });

  describe('deleteメソッド', () => {
    it('ok_idを受け取ると、該当行のidを削除する')
    // it('idを受け取ると、該当行のidを削除する', () => {

    //   const condition = {id:186};
    //   const access = 'memos';

    //   return Memo.delete(condition, access)
    //   .then( r => {
    //     assert(r.affectedRows === 1);
    //   });

    // });
  });

});