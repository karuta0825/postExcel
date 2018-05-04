
const assert = require('power-assert');
const Memo = require('../../models/tables/Memo');

describe('Memoモジュール', () => {
  describe('selectメソッド', () => {
    it('kids_idを指定すると、メモのリストを返す', () => Memo.select('7')
      .then((r) => {
        assert(r.length === 2);
      }));
  });

  describe('addRowメソッド', () => {
    it('メモ追加する', () => Memo.addRow({
      kids_id: '1',
      title: 'test',
      priority_id: '1',
      message: 'message',
      create_user_id: 1,
      create_on: new Date(),
    })
      .then((r) => {
        assert(r.affectedRows === 1);
      }));
  });

  describe('updateメソッド', () => {
    it('idと更新内容を受け取ると、該当行を更新する', () => {
      const data = {
        title: 'chnage',
      };
      const condition = { id: 177 };

      return Memo.update(data, condition)
        .then((r) => {
          assert(r === null);
        });
    });
  });

  describe('removeメソッド', () => {
    it('ok_idを受け取ると、該当行のidを削除する');
    // it('idを受け取ると、該当行のidを削除する', () => {
    //   const condition = { id: 221 };
    //   const access = 'memos';

    //   return Memo.remove(condition)
    //     .then((r) => {
    //       assert(r.affectedRows === 1);
    //     });
    // });
  });
});
