
const assert = require('power-assert');
const sinon = require('sinon');
const User = require('../../models/presentations/User.js');

describe('Userモジュール', () => {

  describe('createメソッド', () => {
    it('ok_ユーザー作成');
    // it('ユーザー作成', () => {
    //   return User.create({
    //     kid:'10000',
    //     system_type: 'cloud',
    //     version: 'LM',
    //     environment_id: 4,
    //     server: 'LAP1-1',
    //     create_user_id:1
    //   })
    //   .then( r => {
    //     assert(r.affectedRows === 1);
    //   })
    // });
  })

  describe('registerメソッド', () => {
    it('ユーザー登録');
  });

  describe('addBaseメソッド', () => {
    it('ok_KID10000の拠点追加を行う');
    // it('KID10000の拠点追加を行う', () => {
    //   return User.addBase(10000)
    //   .then( r => {
    //     assert(r.affectedRows === 1);
    //   })
    // });
  });

});