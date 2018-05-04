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
    it('すでに存在しているuserkeyを指定すると、最後のclient_id+1が返る', () => Client.findNewId({ kids_id: '152', userkey: 'ZXYNFA' })
      .then((r) => {
        assert(r === 'ZXYNFA0003');
      }));

    it('存在していないuserkeyを指定すると、userkey0001が返る', () => Client.findNewId({ kids_id: '2736', userkey: 'MNLXIR' })
      .then((r) => {
        assert(r === 'MNLXIR0001');
      }));

    it('引数にkids_idがないと、エラーオブジェクトが返る', () => Client.findNewId({ userkey: 'LDTQRV' })
      .catch((err) => {
        assert(err.message === '正しい引数を指定してください');
      }));

    it('引数にusekeyがないと、エラーオブジェクトが返る', () => Client.findNewId({ kids_id: '2736' })
      .catch((err) => {
        assert(err.message === '正しい引数を指定してください');
      }));
  });

  describe('makeIdメソッド', () => {
    it('正しい引数を受け取ると、1行追加情報を取得する', () => Client.makeId({
      kids_id: '2840',
      userkey: 'NZNQID',
      create_user_id: 1,
    })
      .then((r) => {
        assert(r.affectedRows === 1);
      }));

    it('kids_idが引数にないと、エラーを返す', () => Client.makeId({
      userkey: 'NZNQID',
      create_user_id: 1,
    })
      .catch((e) => {
        assert(e.message === '引数が正しくありません');
      }));

    it('userkeyが引数にないと、エラーを返す', () => Client.makeId({
      kids_id: '2840',
      create_user_id: 1,
    })
      .catch((e) => {
        assert(e.message === '引数が正しくありません');
      }));

    it('create_user_idが引数にないと、エラーを返す', () => Client.makeId({
      kids_id: '2840',
      userkey: 'NZNQID',
    })
      .catch((e) => {
        assert(e.message === '引数が正しくありません');
      }));
  });

  describe('makeIdsメソッド', () => {
    it('count=1を指定し、1ユーザー作成する', () => Client.makeIds({
      kids_id: '2840',
      userkey: 'NZNQID',
      create_user_id: 1,
    }, 1)
      .then((r) => {
        assert(r === 1);
      }));

    it('count=4を指定し、4ユーザー作成する', () => Client.makeIds({
      kids_id: '2840',
      userkey: 'NZNQID',
      create_user_id: 1,
    }, 4)
      .then((r) => {
        assert(r === 4);
      }));

    it('count=0を指定し、エラーを返す', () => Client.makeIds({
      kids_id: '2840',
      userkey: 'NZNQID',
      create_user_id: 1,
    })
      .catch((e) => {
        assert(e.message === '1以上を指定してください');
      }));

    it('count=-1を指定し、エラーを返す', () => Client.makeIds({
      kids_id: '2840',
      userkey: 'NZNQID',
      create_user_id: 1,
    }, -1)
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
    it('ok_idを受け取ると、該当行のidを削除する');
    // it('idを受け取ると、該当行のidを削除する', () => Client.remove({
    //   client_id: 'NZNQID0002',
    // })
    //   .then((r) => {
    //     assert(r.affectedRows === 1);
    //   }));
  });
});

