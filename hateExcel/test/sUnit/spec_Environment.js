const assert = require('power-assert');
const sinon = require('sinon');
const Environment = require('../../models/tables/Environment');

describe('Environmentモジュール', () => {

  describe('findIdメソッド', () => {

    it('system_type,versionを指定すると、該当のidを返す', () => {
      return Environment.findId({system_type:'cloud', version:'LM'})
      .then( r => {
        assert(r === 4);
      })
    });

    it('存在しないsystem_typeとversionの組み合わせが与えられると、nullを返す', () => {
      return Environment.findId({system_type:'aaa', version:'bbb'})
      .then( r => {
        assert(r === null);
      })
    });

    it('system_typeしか指定しないと、nullを返す', () => {
      return Environment.findId({system_type:'cloud'})
      .then( r => {
        assert(r === null);
      })
    });

    it('versionしか指定しないと、nullを返す', () => {
      return Environment.findId({version:'LM'})
      .then( r => {
        assert(r === null);
      })
    });

    it('引数がないと、nullを返す', () => {
      return Environment.findId({})
      .then( r => {
        assert(r === null);
      })
    });

  });

});
