const assert = require('power-assert');
const sinon = require('sinon');
const License = require('../../models/tables/License');

describe('Licenseモジュール', () => {
  describe('getメソッド', () => {
    it('kid_idを指定すると、使用しているライセンス情報をobjectで返す', () => License.get('5')
      .then((r) => {
        assert(typeof r === 'object');
      }));
  });

  describe('_convertObj2Stringメソッド', () => {
    it('使用サービスが1以上存在するとき、オブジェクトがコロン区切りの文字列に変換される', () => {
      const input = {
        K1: '1',
        K2: '0',
        U1: '1',
        U2: '1',
        U4: '1',
        U5: '0',
        U8: '1',
      };
      const expected = 'K1:U1:U2:U4:U8';
      assert.deepEqual(License._convertObj2String(input), { services: expected });
    });

    it('使用サービスが0のとき、空文字が返される', () => {
      const input = {
        K1: '0',
        K2: '0',
        U1: '0',
        U2: '0',
        U4: '0',
        U5: '0',
        U8: '0',
      };

      const expected = '';
      assert.deepEqual(License._convertObj2String(input), { services: '' });
    });
  });

  describe('updateメソッド', () => {
    it('idと更新内容を受け取ると、該当行を更新する', () => {
      const input = {
        K1: '1',
        K2: '0',
        U1: '1',
        U2: '1',
        U4: '1',
        U5: '0',
        U8: '1',
      };

      return License.update(input, { kids_id: 111 })
        .then((r) => {
          assert(r === null);
        });
    });
  });
});
