const assert = require('power-assert');
const sinon = require('sinon');
const Environment = require('../../models/tables/Environment');

describe('Environmentモジュール', () => {
  describe('findIdメソッド', () => {
    it('system_type,versionを指定すると、該当のidを返す', () => Environment.findId({ system_type: 'cloud', version: 'LM' })
      .then((r) => {
        assert(r === 4);
      }));

    it('存在しないsystem_typeとversionの組み合わせが与えられると、nullを返す', () => Environment.findId({ system_type: 'aaa', version: 'bbb' })
      .then((r) => {
        assert(r === null);
      }));

    it('system_typeしか指定しないと、nullを返す', () => Environment.findId({ system_type: 'cloud' })
      .then((r) => {
        assert(r === null);
      }));

    it('versionしか指定しないと、nullを返す', () => Environment.findId({ version: 'LM' })
      .then((r) => {
        assert(r === null);
      }));

    it('引数がないと、nullを返す', () => Environment.findId({})
      .then((r) => {
        assert(r === null);
      }));
  });

  describe('findByIdメソッド', () => {
    it('idを指定すると、そのsystem_typeとversionを返す', () => Environment.findById(1)
      .then((r) => {
        assert(r.system_type === 'onpre');
        assert(r.version === 'ES');
      }));

    it('引数がない場合、エラーが返る', () => Environment.findById()
      .catch((err) => {
        assert(err.message === '引数を指定してください');
      }));
  });
});
