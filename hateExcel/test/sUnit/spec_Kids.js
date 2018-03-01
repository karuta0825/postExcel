
const assert = require('power-assert');
const sinon = require('sinon');
const Kid = require('../../models/tables/Kid.js');

describe('Kidsモジュール', () => {

  describe('findNewKidメソッド', () => {

    it('environemnt_idのユーザー存在しないと、environmentsテーブルにある初期kidが返る', () => {
      return Kid.findNewKid('7')
      .then( r => {
        assert( r[0].kid === '99999' );
      });
    });

    // このテストは難しい
    // テストの度にDatabaseの中身を固定させないといけない
    it('environment_idのユーザーが存在すると、最も数値の高いKID+1が返る', () => {
      return Kid.findNewKid('2')
      .then( r => {
        assert( r[0].kid === 83023 );
      });
    });

    it('存在しないenvironment_idを指定すると、空の配列が返る', () => {
      return Kid.findNewKid('99999')
      .then( r => {
        assert.deepEqual(r, []);
      });
    });

  });

  describe('findNewUserKeyメソッド', () => {

    it('すでに存在しているuserkeyを引数に指定すると、新しい重複しないuserkeyを返す', () => {
      return Kid.findNewUserKey('ZYUYG')
      .then( r => {
        assert(r !== 'ZYUYG');
      })
    });

    it('存在してしないuserkeyを引数に指定すると、その値を返す', () => {
      return Kid.findNewUserKey('AAAAAA')
      .then( r => {
        assert( r === 'AAAAAA');
      })
    });

    it('引数を指定しないと、新しい重複しないuserkeyを返す', () => {
      return Kid.findNewUserKey()
      .then( r => {
        assert( r !== null );
      })
    });

  });

  describe('findNewFenicsKeyメソッド', () => {

    it('すでに存在しているfenicsKeyを指定すると、新しいユニークなfenicsKeyを返す', () => {
      return Kid.findNewFenicsKey('aaaa')
      .then( r => {
        assert(r !== 'aaaa');
      });
    });

    it('存在していないfenicsKeyを引数に指定すると、その値を返す', () => {
      return Kid.findNewFenicsKey('aaab')
      .then( r => {
        assert(r === 'aaab');
      })
    });

    it('引数を指定しないと、新しいユニークなfenicsKeyを返す', () => {
      return Kid.findNewFenicsKey()
      .then( r => {
        assert( r !== null );
      });
    });

  });

  describe('findNewDbPassメソッド', () => {

    it('変換対象の文字列すべてをつかうと、すべて変換される', () => {
      assert(Kid.findNewDbPass('ABEGIOSTZ') === 'U53R' + '483610572');
    });

  });

  describe('addRowメソッド', () => {

    // it('kidを指定せずに通常ユーザー作成', () => {

    //   var params = {
    //     system_type : '',
    //     version : 'LM',
    //     environment_id : '2',
    //     server : 'LAP1-1',
    //     create_user_id : '1'
    //   };

    //   return Kid.makeUser(params)
    //   .then( r => {
    //     console.log(r);
    //     assert.deepEqual( r, {
    //       version : 'LM',
    //       environment_id : '2',
    //       server : 'LAP1-1'
    //     })
    //   });

    // });

    it('kidを指定せずにドコモユーザー作成');

    it('既に存在しているKIDが指定されると、重複エラーを返す')

  });

});