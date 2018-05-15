const assert = require('power-assert');
const History = require('../../models/tables/History');

let addId;

describe('Hisotryモジュール', () => {
  describe('selectメソッド', () => {
    it('kids_idを与えると、履歴一覧を返す', () => History.select('94')
      .then((r) => {
        assert(r.length === 1);
        assert(r[0].id !== undefined);
        assert(r[0].type !== undefined);
        assert(r[0].content_name !== undefined);
        assert(r[0].item_name !== undefined);
        assert(r[0].before !== undefined);
        assert(r[0].after !== undefined);
        assert(r[0].create_on !== undefined);
      }));
  });

  describe('addRowメソッド', () => {
    it('kids_id, type, content_name, item_name, before, after, create_on, create_user_idを与えると、１行分の履歴を作成する', () => History.addRow({
      kids_id: '1',
      type: '更新',
      content_name: 'test',
      item_name: 'test',
      before: 'before',
      after: 'after',
      create_on: '2018-05-06',
      create_user_id: 1,
    })
      .then((r) => {
        addId = r.insertId;
        assert(r.affectedRows === 1);
      }));
  });

  describe('removeメソッド', () => {
    it('addRowで追加したHistoryのidを与えると、該当行を削除する', () => History.remove({
      id: addId,
    })
      .then((r) => {
        assert(r.affectedRows === 1);
      }));
  });
});
