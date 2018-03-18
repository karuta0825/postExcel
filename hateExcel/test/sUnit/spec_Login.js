const assert = require('power-assert');
const sinon = require('sinon');
const Login = require('../../models/tables/Login');

describe('Loginモジュール', () => {

  describe('authenticateメソッド', () => {

    it('正しい組み合わせのuserとpassが与えられると、passwordを取り除いたユーザーオブジェクトが返る', () => {
      return Login.authenticate({user:'aka',pass:'aka'})
      .then( r => {
        assert.deepEqual(r,{
          id:1,
          uid:'aka',
          name:'赤鬼',
          newadd:0,
          is_admin:1
        });
      });
    });

    it('誤った組み合わせのuserとpassが与えられると、nullが返る', () => {
      return Login.authenticate({user:'aka',pass:'ao'})
      .then( r => {
        assert(r === null);
       });
    });

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

    it('引数たりないと、エラーが返る', () => {
      return Login.addRow()
      .catch( err => {
        assert(err.message === '引数が正しくありません');
      })
    });


  });

});
