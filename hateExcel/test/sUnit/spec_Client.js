const assert = require('power-assert');
const Client = require('../../models/tables/Client');

describe('Clientモジュール', () => {
  describe('selectメソッド', () => {
    it('kids_idを指定すると、クライアントのリストを返す', () => Client.select('5')
      .then((r) => {
        assert(r.length === 5);
      }));
  });

  describe('findNewIdメソッド', () => {
    it('すでに存在しているuserkeyを指定すると、最後のclient_id+1が返る', () => Client.findNewId('152')
      .then((r) => {
        assert(r === 'ZXYNFA0003');
      }));

    it('存在していないuserkeyを指定すると、userkey0001が返る', () => Client.findNewId('2736')
      .then((r) => {
        assert(r === 'MNLXIR0001');
      }));

    it('引数がないと、エラーオブジェクトが返る', () => Client.findNewId()
      .catch((err) => {
        assert(err.message === '正しい引数を指定してください');
      }));

    it('存在しないkids_idを与えると、エラーが返る', () => Client.findNewId('99999')
      .catch((e) => {
        assert(e.message === 'ユーザーキーが設定されていません');
      }));
  });

  describe('makeIdメソッド', () => {
    it('正しい引数を受け取ると、1行追加情報を取得する', () => Client.makeId('2840', 1)
      .then((r) => {
        assert(r.affectedRows === 1);
      }));

    it('存在しないkids_idを与えると、エラーを返す', () => Client.makeId('99999', 1)
      .catch((e) => {
        assert(e.message === 'ユーザーキーが設定されていません');
      }));

    it('create_user_idが引数にないと、エラーを返す', () => Client.makeId('2840')
      .catch((e) => {
        assert(e.message === '引数が正しくありません');
      }));
  });

  describe('makeIdsメソッド', () => {
    it('count=1を指定し、1ユーザー作成する', () => Client.makeIds('2840', 1, 1)
      .then((r) => {
        assert(r === 1);
      }));

    it('count=4を指定し、4ユーザー作成する', () => Client.makeIds('2840', 1, 4)
      .then((r) => {
        assert(r === 4);
      }));

    it('count=0を指定し、エラーを返す', () => Client.makeIds('2840', 1, 0)
      .catch((e) => {
        assert(e.message === '1以上を指定してください');
      }));

    it('count=-1を指定し、エラーを返す', () => Client.makeIds('2840', 1, -1)
      .catch((e) => {
        assert(e.message === '1以上を指定してください');
      }));
  });

  describe('updateメソッド', () => {
    it('idと更新内容を受け取ると、該当のidの行を更新する', () => Client.update(
      {
        fenics_id: 'test01001',
        end_on: '2018-01-01',
      },
      'NZNQID0001',
    )
      .then((r) => {
        assert(r === null);
      }));
  });

  describe('deleteメソッド', () => {
    it('client_idを与えると、該当1行を削除する', () => Client.remove({
      client_id: 'NZNQID0001',
    })
      .then((r) => {
        assert(r.affectedRows === 1);
      }));

    it('kids_idを与えると、該当行全てを削除する', () => Client.remove({
      kids_id: '2840',
    })
      .then((r) => {
        assert(r.affectedRows === 5);
      }));
  });

  describe('planMakeIdsメソッド', () => {
    it('実行すると、関数が帰ること', () => {
      const result = Client.planMakeIds('2840', 1);
      assert(result instanceof Function === true);
    });

    it('実行して得られた関数にkids_idとcreate_user_idを与えると、ユーザーが作成される', () => {
      const result = Client.planMakeIds('2840', 1, 10);
      result()
        .then((r) => {
          assert(r === 10);
        });
    });
  });
});

