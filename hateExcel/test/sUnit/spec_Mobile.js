
const assert = require('power-assert');
const sinon = require('sinon');
const Mobile = require('../../models/tables/Mobile');


describe('Mobileモジュール', () => {
  describe('findNewFenicsKeyメソッド', () => {
    it('すでに存在しているfenicsKeyを指定すると、新しいユニークなfenicsKeyを返す', () => Mobile.findNewFenicsKey('m4vtv')
      .then((r) => {
        assert(r !== 'm4vtv');
      }));

    it('存在していないfenicsKeyを引数に指定すると、その値を返す', () => Mobile.findNewFenicsKey('aaab')
      .then((r) => {
        assert(r === 'aaab');
      }));

    it('引数を指定しないと、新しいユニークなfenicsKeyを返す', () => Mobile.findNewFenicsKey()
      .then((r) => {
        assert(r !== null);
      }));
  });

  describe('addRowメソッド', () => {
    it('ok_kids_id, base_id, fenicskeyを与えると、mobilesテーブルに行追加');
    // it('kids_id, base_id, fenicskeyを与えると、mobilesテーブルに行追加', () => {
    //   return Mobile.addRow('1', '1', 'mobil')
    //   .then( r => {
    //     assert( r.affectedRows === 1 );
    //   })
    // });

    it('kids_idを与えないと、エラーオブジェクト返す', () => Mobile.addRow()
      .catch((err) => {
        assert(err.message === '引数が存在してません');
      }));

    it('base_idを与えないと、エラーオブジェクトを返す', () => Mobile.addRow('1')
      .catch((err) => {
        assert(err.message === '引数が存在してません');
      }));

    it('fenicskeyを与えないと、エラーオブジェクト返す', () => Mobile.addRow('1', '1')
      .catch((err) => {
        assert(err.message === '引数が存在してません');
      }));
  });

  describe('updateメソッド', () => {
    it('kids_idと更新内容を受け取ると、該当行を更新する');
    // it('kids_idと更新内容を受け取ると、該当行を更新する', () => {
    //   const condition = {kids_id:186};
    //   const access = 'mobiles';

    //   return Memo.delete(condition, access)
    //   .then( r => {
    //     assert(r.affectedRows === 1);
    //   });
    // });
  });
});
