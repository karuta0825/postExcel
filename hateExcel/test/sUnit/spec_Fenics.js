const assert = require('power-assert');
const sinon = require('sinon');
const Fenics = require('../../models/tables/Fenics');

describe('Fenicsモジュール', () => {

  describe('makeUser', () => {

    // it('PC用のユーザーを追加', () => {
    //   return Fenics.makeUser({kids_id:'2729', fenics_key:'pdlj'},false)
    //   .then( r => {
    //     assert(r.affectedRows === 1);
    //   })
    // });

    // it('mobile用のユーザーを追加', () => {
    //   return Fenics.makeUser({kids_id:'2729', fenics_key:'m4wbn'},true)
    //   .then( r => {
    //     assert(r.affectedRows === 1);
    //   })
    // });

  });

  describe('Fenicsクライアント更新', () => {
    it('');
  });

  describe('Fenicsクライアント削除', () => {
    it('');
  });

  describe('findNewMobileFenicsIdメソッド', () => {

    it('すでに存在しているfenics_keyを指定すると、最後のid+1のfenics_idが返る', () => {
      return Fenics.findNewMobileId({kids_id:'2729', fenics_key:'m4wbn'})
      .then( r => {
        assert(r === 'm4wbn006');
      })
    });

    it('存在していないfenics_keyを指定すると、[fenics_key]001が返る', () => {
      return Fenics.findNewMobileId({kids_id:'111', fenics_key: 'm4nwm'})
      .then( r => {
        assert(r === 'm4nwm001');
      })
    });

    it('引数にkids_idがないと、エラーオブジェクトが返る', () => {
      return Fenics.findNewMobileId({fenics_key:'m4wbn'})
      .catch( err => {
        assert( err.message === '引数が正しくありません');
      })
    });

    it('引数にfenics_keyがないと、エラーオブジェクトが返る', () => {
      return Fenics.findNewMobileId({kids_id:'2729'})
      .catch( err => {
        assert( err.message === '引数が正しくありません');
      })
    });

    it('引数がないと、エラーオブジェクトが返る', () => {
      return Fenics.findNewMobileId()
      .catch( err => {
        assert( err.message === '引数が正しくありません');
      })
    });


  });

});



