const assert = require('power-assert');
const MemoTemplate = require('../../models/tables/MemoTemplate.js');

let addId;

describe('MemoTemplateモジュール', () => {
  describe('selectメソッド', () => {
    it('引数無しで全テンプレートアイテムを返す', () => MemoTemplate.select()
      .then((r) => {
        assert(r.length === 2);
      }));

    it('memo_idを与えると、該当id情報を返す', () => MemoTemplate.select(30)
      .then((r) => {
        assert(r.length === 1);
        assert(r[0].id === 30);
        assert(r[0].title !== undefined);
        assert(r[0].msg !== undefined);
      }));

    it('存在しないmemo_idを与えると、空の配列を返す', () => MemoTemplate.select(1)
      .then((r) => {
        assert.deepEqual(r, []);
      }));
  });

  describe('addRowメソッド', () => {
    it('title, msg, create_user_id, create_onを与えると、テンプレートが作成される', () => MemoTemplate.addRow({
      title: 'test',
      msg: 'test',
      create_user_id: 1,
      create_on: '2018-05-06',
    })
      .then((r) => {
        addId = r.insertId;
        assert(r.affectedRows === 1);
      }));
  });

  describe('updateメソッド', () => {
    it('addRowで追加したテンプレートのidと更新内容を与えると、テンプレート内容が更新される', () => MemoTemplate.update(
      {
        title: 'title2',
      },
      {
        id: addId,
      },
    )
      .then(() => MemoTemplate.select(addId))
      .then((r) => {
        assert(r[0].id === addId);
        assert(r[0].title === 'title2');
      }));
  });

  describe('removeメソッド', () => {
    it('addRowで追加したテンプレートのidを与えると、削除される', () => MemoTemplate.remove({
      id: addId,
    })
      .then((r) => {
        assert(r.affectedRows === 1);
      }));
  });
});
