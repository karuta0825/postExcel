const assert = require('power-assert');
const Service = require('../../models/tables/Service.js');


describe('Serviceモジュール', () => {
  describe('registerメソッド', () => {
    it('バージョン情報とサービスリストを与えると、一括テーブル更新する', () => {
      const list = [
        {
          id: 1, service_id: 'K1', sales_id: 'AK1', service_name: '基本サービス', version: 'LM', is_setup_info: 0,
        }, {
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
        }, {
          id: 11, service_id: 'UA', sales_id: 'AUA', service_name: 'UAサービス', version: 'LM', is_setup_info: 0,
        }, {
          id: 12, service_id: 'UB', sales_id: 'AUB', service_name: 'UBサービス', version: 'LM', is_setup_info: 0,
        }, {
          id: 13, service_id: 'UC', sales_id: 'AUC', service_name: 'UCサービス', version: 'LM', is_setup_info: 0,
        }, {
          id: 14, service_id: 'UD', sales_id: 'AUD', service_name: 'UDサービス', version: 'LM', is_setup_info: 0,
        }, {
          id: 15, service_id: 'UE', sales_id: 'AUE', service_name: 'UEサービス', version: 'LM', is_setup_info: 0,
        }, {
          id: 16, service_id: 'UF', sales_id: 'AUF', service_name: 'UFサービス', version: 'LM', is_setup_info: 0,
        }, {
          id: 17, service_id: 'UG', sales_id: 'AUG', service_name: 'UGサービス', version: 'LM', is_setup_info: 0,
        }, {
          id: 18, service_id: 'UH', sales_id: 'AUH', service_name: 'UHサービス', version: 'LM', is_setup_info: 0,
        }, {
          id: 19, service_id: 'UI', sales_id: 'AUI', service_name: 'UIサービス', version: 'LM', is_setup_info: 0,
        }, {
          id: 20, service_id: 'C1', sales_id: 'AC1', service_name: 'C1サービス', version: 'LM', is_setup_info: 0,
        }, {
          id: 21, service_id: 'C2', sales_id: 'AC2', service_name: 'C2サービス', version: 'LM', is_setup_info: 0,
        }, {
          id: 22, service_id: 'C3', sales_id: 'AC3', service_name: 'C3サービス', version: 'LM', is_setup_info: 0,
        }, {
          id: 23, service_id: 'C4', sales_id: 'AC4', service_name: 'C4サービス', version: 'LM', is_setup_info: 0,
        }, {
          id: 24, service_id: 'S2', sales_id: 'AS2', service_name: 'S2サービス', version: 'LM', is_setup_info: 0,
        }, {
          id: 25, service_id: 'S3', sales_id: 'AS3', service_name: 'S3サービス', version: 'LM', is_setup_info: 0,
        }, {
          id: 26, service_id: 'S9', sales_id: 'AS9', service_name: 'S9サービス', version: 'LM', is_setup_info: 0,
        }, {
          id: 27, service_id: 'SC', sales_id: 'ASC', service_name: 'SCサービス', version: 'LM', is_setup_info: 0,
        }, {
          id: 28, service_id: 'SE', sales_id: 'ASE', service_name: 'SEサービス', version: 'LM', is_setup_info: 0,
        }, {
          id: 29, service_id: 'SH', sales_id: 'ASH', service_name: 'SHサービス', version: 'LM', is_setup_info: 0,
        }, {
          id: 30, service_id: 'SI', sales_id: 'ASI', service_name: 'SIサービス', version: 'LM', is_setup_info: 0,
        }, {
          id: 31, service_id: 'SJ', sales_id: 'ASJ', service_name: 'SJサービス', version: 'LM', is_setup_info: 0,
        }, {
          id: 32, service_id: 'SL', sales_id: 'ASL', service_name: 'SLサービス', version: 'LM', is_setup_info: 0,
        }, {
          id: 33, service_id: 'SM', sales_id: 'ASM', service_name: 'SMサービス', version: 'LM', is_setup_info: 0,
        }, {
          id: 34, service_id: 'SO', sales_id: 'ASO', service_name: 'SOサービス', version: 'LM', is_setup_info: 0,
        }, {
          id: 70, service_id: 'has_sd', sales_id: 'BA1', service_name: 'スマートデバイス', version: 'LM', is_setup_info: 1,
        }, {
          id: 71, service_id: 'add_one_cli', sales_id: 'BA2', service_name: '1クライアント追加', version: 'LM', is_setup_info: 1,
        }, {
          id: 72, service_id: 'add_ten_cli', sales_id: 'BA3', service_name: '10クライアント追加', version: 'LM', is_setup_info: 1,
        }, {
          id: 73, service_id: 'add_twe_cli', sales_id: 'BA4', service_name: '20クライアント追加', version: 'LM', is_setup_info: 1,
        }, {
          id: 74, service_id: 'add_one_usr', sales_id: 'BA5', service_name: '1ユーザ追加', version: 'LM', is_setup_info: 1,
        }, {
          id: 75, service_id: 'add_sd', sales_id: 'BA6', service_name: '1スマートデバイス追加', version: 'LM', is_setup_info: 1,
        }, {
          id: 76, service_id: 'has_busiv', sales_id: 'BA7', service_name: '常時VPN接続', version: 'LM', is_setup_info: 1,
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
        assert(r.length === 75);
      }));
  });
});
