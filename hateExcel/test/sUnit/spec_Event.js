const assert = require('power-assert');
const Event = require('../../models/tables/Event.js');

let addId;

describe('Eventモジュール', () => {
  describe('selectメソッド', () => {
    it('YYYY-MMを与えると、当日付のイベントリストを返す', () => Event.select('2017-08')
      .then((r) => {
        assert(r.length === 2);
        assert(r[0].id !== undefined);
        assert(r[0].title !== undefined);
        assert(r[0].message !== undefined);
        assert(r[0].start_on_for_view !== undefined);
        assert(r[0].start_time_for_view !== undefined);
        assert(r[0].start_on !== undefined);
        assert(r[0].date !== undefined);
        assert(r[0].is_finished !== undefined);
      }));
  });

  describe('addRowメソッド', () => {
    it('タイトル、内容、開始日付、終了フラグを与えると、１行分イベントを作成する', () => Event.addRow({
      title: 'test',
      message: 'test',
      start_on: '2018-05-06',
      is_finished: 0,
    })
      .then((r) => {
        addId = r.insertId;
        assert(r.affectedRows === 1);
      }));
  });

  describe('updateメソッド', () => {
    it('addRowで追加したイベントに新しい更新内容を与えると、更新される', () => Event.update(
      {
        title: 'test2',
      },
      {
        id: addId,
      },
    )
      .then(() => Event.select('2018-05'))
      .then((r) => {
        assert(r.length === 1);
        assert(r[0].title === 'test2');
      }));
  });

  describe('removeメソッド', () => {
    it('addRowで追加したEventのidを与えると、該当行を削除する', () => Event.remove({
      id: addId,
    })
      .then((r) => {
        assert(r.affectedRows === 1);
      }));
  });
});
