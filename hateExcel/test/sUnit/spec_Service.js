const assert = require('power-assert');
const Service = require('../../models/tables/Service.js');


describe('Serviceモジュール', () => {
  describe('registerメソッド', () => {
    it('バージョン情報とサービスリストを与えると、一括テーブル更新する', () => {
      const list = [{
        id: 2, service_id: 'U1', sales_id: 'AU1', service_name: 'U1サービス', version: 'LM', is_setup_info: 0,
      }, {
        id: 3, service_id: 'U2', sales_id: 'AU2', service_name: 'U2サービス', version: 'LM', is_setup_info: 0,
      }, {
        id: 4, service_id: 'U3', sales_id: 'AU3', service_name: 'U3サービス', version: 'LM', is_setup_info: 0,
      }, {
        id: 5, service_id: 'U4', sales_id: 'AU4', service_name: 'U4サービス', version: 'LM', is_setup_info: 0,
      }, {
        id: 6, service_id: 'U5', sales_id: 'AU5', service_name: 'U5サービス', version: 'LM', is_setup_info: 0,
      }, {
        id: 7, service_id: 'U6', sales_id: 'AU6', service_name: 'U6サービス', version: 'LM', is_setup_info: 0,
      }, {
        id: 8, service_id: 'U7', sales_id: 'AU7', service_name: 'U7サービス', version: 'LM', is_setup_info: 0,
      }, {
        id: 9, service_id: 'U8', sales_id: 'AU8', service_name: 'U8サービス', version: 'LM', is_setup_info: 0,
      }, {
        id: 10, service_id: 'U9', sales_id: 'AU9', service_name: 'U9サービス', version: 'LM', is_setup_info: 0,
      }];

      return Service.register('LM', list)
        .then((r) => {
          assert(r === 'end');
        });
    });
  });

  describe('selectメソッド', () => {
    it('引数なしで、全サービス情報を返す', () => Service.select()
      .then((r) => {
        assert(r.length === 43);
      }));
  });
});
