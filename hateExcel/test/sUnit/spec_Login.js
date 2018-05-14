const assert = require('power-assert');
const sinon = require('sinon');
const Login = require('../../models/tables/Login');

describe('Loginモジュール', () => {
  describe('authenticateメソッド', () => {
    it('正しい組み合わせのuserとpassが与えられると、passwordを取り除いたユーザーオブジェクトが返る', () => Login.authenticate({ user: 'aka', pass: 'aka' })
      .then((r) => {
        assert.deepEqual(r, {
          id: 1,
          uid: 'aka',
          name: '赤鬼',
          newadd: 0,
          is_admin: 1,
        });
      }));

    it('誤った組み合わせのuserとpassが与えられると、nullが返る', () => Login.authenticate({ user: 'aka', pass: 'ao' })
      .then((r) => {
        assert(r === null);
      }));
  });

  describe('selectメソッド', () => {
    it('引数を与えないと、ユーザーリストを返す', () => Login.select()
      .then((r) => {
        assert(r.length === 9);
      }));

    it('uidを与えると、該当のユーザー情報を返す', () => Login.select(null, 1)
      .then((r) => {
        assert(r === true);
      }));
  });

  describe('addRowメソッド', () => {
    // it('1行追加', () => {
    //   return Login.addRow({
    //     uid : 1,
    //     name : 'testtest',
    //     password : 'testtest',
    //     newadd : 0
    //   })
    //   .then( r => {
    //     assert(r.affectedRows === 1)
    //   })
    // });

    it('引数たりないと、エラーが返る', () => Login.addRow()
      .catch((err) => {
        assert(err.message === '引数が正しくありません');
      }));
  });

  describe('updateメソッド', () => {
    it('idと更新内容を受け取ると、該当行を更新する');
  });
});
