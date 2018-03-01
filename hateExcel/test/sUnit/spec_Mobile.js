
const assert = require('power-assert');
const sinon = require('sinon');
const Mobile = require('../../models/tables/Mobile');

describe('Mobileモジュール', () => {

  describe('findNewFenicsKeyメソッド', () => {

    it('すでに存在しているfenicsKeyを指定すると、新しいユニークなfenicsKeyを返す', () => {
      return Mobile.findNewFenicsKey('m4vtv')
      .then( r => {
        assert(r !== 'm4vtv');
      });
    });

    it('存在していないfenicsKeyを引数に指定すると、その値を返す', () => {
      return Mobile.findNewFenicsKey('aaab')
      .then( r => {
        assert(r === 'aaab');
      })
    });

    it('引数を指定しないと、新しいユニークなfenicsKeyを返す', () => {
      return Mobile.findNewFenicsKey()
      .then( r => {
        assert( r !== null );
      });
    });

  });

  describe('addRowメソッド', () => {
    it('kids_id, base_id, fenicskeyを与えると、mobilesテーブルに行追加');
    it('kids_idを与えないと、エラーオブジェクト返す');
    it('base_idを与えないと、エラーオブジェクトを返す');
    it('fenicskeyを与えないと、エラーオブジェクト返す');
  });

});
