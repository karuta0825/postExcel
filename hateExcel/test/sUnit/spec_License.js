const assert = require('power-assert');
const sinon = require('sinon');
const License = require('../../models/tables/License');

describe('Licenseモジュール', () => {

  describe('getメソッド', () => {
    it('kid_idを指定すると、使用しているライセンス情報をobjectで返す', () => {
      return License.get('5')
      .then( r => {
        assert( typeof r === 'object');
      })
    })
  });

  describe('updateメソッド', () => {
    it('idと更新内容を受け取ると、該当行を更新する');
  });

});
