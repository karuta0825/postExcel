const assert = require('power-assert');
const sinon = require('sinon');
const Client = require('../../models/tables/Client');

describe('Clientモジュール', () => {

  describe('クライアント追加', () => {
    it('');
  });

  describe('クライアント更新', () => {
    it('');
  });

  describe('クライアント削除', () => {
    it('');
  });

  describe('findNewIdメソッド', () => {

    it('すでに存在しているuserkeyを指定すると、最後のclient_id+1が返る', () => {
      return Client.findNewId({kids_id:'152', userkey: 'ZXYNFA'})
      .then( r => {
        assert(r === 'ZXYNFA0003')
      });
    });

    it('存在していないuserkeyを指定すると、userkey0001が返る', () => {
      return Client.findNewId({kids_id:'2736', userkey: 'MNLXIR'})
      .then( r => {
        assert(r === 'MNLXIR0001')
      });
    });

    it('引数にkids_idがないと、エラーオブジェクトが返る', () => {
      return Client.findNewId({userkey: 'LDTQRV'})
      .catch( err => {
        assert(err === '正しい引数を指定してください');
      });
    });

    it('引数にusekeyがないと、エラーオブジェクトが返る', () => {
      return Client.findNewId({kids_id:'2736'})
      .catch( err => {
        assert(err === '正しい引数を指定してください');
      });
    });


  });

});
