const assert = require('power-assert');
const sinon = require('sinon');
const Fenics = require('../../models/tables/Fenics');

describe('Fenicsモジュール', () => {

  describe('makeUser', () => {

    it('PC用のユーザーを追加', () => {
      return Fenics.makeUser({kids_id:'2729', fenics_key:'pdlj'},false)
      .then( r => {
        assert(r.affectedRows === 1);
      })
    });

    // it('mobile用のユーザーを追加', () => {
    //   return Fenics.makeUser({kids_id:'2729', fenics_key:'m4wbn'},true)
    //   .then( r => {
    //     assert(r.affectedRows === 1);
    //   })
    // });

  });

  describe('makeUsersメソッド', () => {

    it('1ユーザー作成する', () => {

    });

    // it('複数ユーザー作成する', () => {
    //   return Fenics.makeUsers({kids_id:'2729',fenics_key:'pdlj'}, false, 3)
    //   .then( r => {
    //     assert( r === 3 );
    //   })
    // });

    it('エラーを起こす', () => {
      return Fenics.makeUsers({kids_id:'2729'}, false, 3)
      .catch( err => {
        assert( err.message === '引数が正しくありません' );
      })
    })

  });


  describe('findNewIdメソッド', () => {

    describe('is pc', () => {


      it('すでに存在しているfenics_keyを指定すると、最後のid+1のfenics_idが返る', ()=> {
        return Fenics.findNewId({kids_id})
        .then( r => {
          assert( r === '' );
        })
      });

      it('存在していないfenics_keyを指定すると、[fenics_key]01001が返る', () => {
        return Fenics.findNewId({})
        .then( r => {
          assert( r === '' );
        })
      });

      it('引数にkids_idがないと、エラーオブジェクトが返る', () => {
        return Fenics.findNewId({fenics_key:''})
        .catch( err => {
          assert( err.message === '引数が正しくありません');
        })
      });

      it('引数にfenics_keyがないと、エラーオブジェクトが返る', () => {
        return Fenics.findNewId({kids_id:'2729'})
        .catch( err => {
          assert( err.message === '引数が正しくありません');
        })
      });

      it('引数がないと、エラーオブジェクトが返る', () => {
        return Fenics.findNewId()
        .catch( err => {
          assert( err.message === '引数が正しくありません');
        })
      });


    });

    describe('is mobile', () => {

      it('すでに存在しているfenics_keyを指定すると、最後のid+1のfenics_idが返る', () => {
        return Fenics.findNewId({kids_id:'2729', fenics_key:'m4wbn'}, true)
        .then( r => {
          assert(r === 'm4wbn006');
        })
      });

      it('存在していないfenics_keyを指定すると、[fenics_key]001が返る', () => {
        return Fenics.findNewId({kids_id:'111', fenics_key: 'm4nwm'}, true)
        .then( r => {
          assert(r === 'm4nwm001');
        })
      });

      it('引数にkids_idがないと、エラーオブジェクトが返る', () => {
        return Fenics.findNewId({fenics_key:'m4wbn'}, true)
        .catch( err => {
          assert( err.message === '引数が正しくありません');
        })
      });

      it('引数にfenics_keyがないと、エラーオブジェクトが返る', () => {
        return Fenics.findNewId({kids_id:'2729'}, true)
        .catch( err => {
          assert( err.message === '引数が正しくありません');
        })
      });

      it('引数がないと、エラーオブジェクトが返る', () => {
        return Fenics.findNewId()
        .catch( err => {
          assert( err.message === '引数が正しくありません');
        })
      });

    });

  });

});



