const assert = require('power-assert');
const sinon = require('sinon');
const Client = require('../../models/tables/Client');

describe('Clientモジュール', () => {
  describe('makeIdメソッド', () => {
    it('正しい引数を受け取ると、1行追加情報を取得する');

    it('引数が足りないと、エラーを返す');
  });

  describe('makeIdsメソッド', () => {
    it('count=1を指定し、1ユーザー作成する');

    it('count=4を指定し、4ユーザー作成する');

    it('count=0を指定し、エラーを返す');

    it('count=-1を指定し、エラーを返す');
  });

  describe('updateメソッド', () => {
    it('idと更新内容を受け取ると、該当のidの行を更新する');
  });

  describe('deleteメソッド', () => {
    it('idを受け取ると、該当行のidを削除する');
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
});
