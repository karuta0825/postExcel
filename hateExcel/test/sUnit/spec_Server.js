const assert = require('power-assert');
const Server = require('../../models/tables/Server.js');


describe('Serverモジュール', () => {
  describe('registerメソッド', () => {
    it('バージョン情報がないと、保存せずもとのままのデータになる', () => {
      const list = [{
        id: 60, ip: '192.158.10.10', name: 'LAP1-1', type: 'AP', version: 'LM', connect_db: 'LDB1-1', domain: 'WINCARE1', capacity: 60, environment_id: 4,
      }, {
        id: 38, ip: '192.168.200.108', name: 'LAP1-2', type: 'AP', version: 'LM', connect_db: 'LDB1-1', domain: 'WINCARE1', capacity: 40, environment_id: 4,
      }, {
        id: 43, ip: '192.168.210.101', name: 'LAP1-3', type: 'AP', version: 'LM', connect_db: 'LDB1-1', domain: 'WINCARE1', capacity: 10, environment_id: 4,
      }, {
        id: 50, ip: '192.168.210.108', name: 'LAP1-4', type: 'AP', version: 'LM', connect_db: 'LDB1-1', domain: 'WINCARE1', capacity: 40, environment_id: 4,
      }, {
        id: 42, ip: '192.168.200.112', name: 'LAP1-5', type: 'AP', version: 'LM', connect_db: 'LDB1-1', domain: 'WINCARE1', capacity: 80, environment_id: 4,
      }, {
        id: 54, ip: '192.168.210.112', name: 'LAP2-1', type: 'AP', version: 'LM', connect_db: 'LDB2-1', domain: 'WINCARE2', capacity: 30, environment_id: 4,
      }, {
        id: 34, ip: '192.168.200.104', name: 'LAP2-2', type: 'AP', connect_db: 'LDB2-1', domain: 'WINCARE2', capacity: 80, environment_id: 4,
      }, {
        id: 46, ip: '192.168.210.104', name: 'LAP2-3', type: 'AP', version: 'LM', connect_db: 'LDB2-1', domain: 'WINCARE2', capacity: 80, environment_id: 4,
      }, {
        id: 40, ip: '192.168.200.110', name: 'LAP2-4', type: 'AP', version: 'LM', connect_db: 'LDB2-1', domain: 'WINCARE2', capacity: 80, environment_id: 4,
      }];

      return Server.register('LM', list)
        .catch((err) => {
          assert(err instanceof Error);
          assert(err.code === 'ER_NO_DEFAULT_FOR_FIELD');
        });
    });

    it('バージョン情報とサーバリストを与えると、サーバテーブルを一括更新する', () => {
      const list = [{
        id: 34, ip: '192.168.200.104', name: 'LAP2-2', type: 'AP', version: 'LM', connect_db: 'LDB2-1', domain: 'WINCARE2', capacity: 80, environment_id: 4,
      }, {
        id: 38, ip: '192.168.200.108', name: 'LAP1-2', type: 'AP', version: 'LM', connect_db: 'LDB1-1', domain: 'WINCARE1', capacity: 40, environment_id: 4,
      }, {
        id: 40, ip: '192.168.200.110', name: 'LAP2-4', type: 'AP', version: 'LM', connect_db: 'LDB2-1', domain: 'WINCARE2', capacity: 80, environment_id: 4,
      }, {
        id: 42, ip: '192.168.200.112', name: 'LAP1-5', type: 'AP', version: 'LM', connect_db: 'LDB1-1', domain: 'WINCARE1', capacity: 80, environment_id: 4,
      }, {
        id: 43, ip: '192.168.210.101', name: 'LAP1-3', type: 'AP', version: 'LM', connect_db: 'LDB1-1', domain: 'WINCARE1', capacity: 10, environment_id: 4,
      }, {
        id: 46, ip: '192.168.210.104', name: 'LAP2-3', type: 'AP', version: 'LM', connect_db: 'LDB2-1', domain: 'WINCARE2', capacity: 80, environment_id: 4,
      }, {
        id: 50, ip: '192.168.210.108', name: 'LAP1-4', type: 'AP', version: 'LM', connect_db: 'LDB1-1', domain: 'WINCARE1', capacity: 40, environment_id: 4,
      }, {
        id: 54, ip: '192.168.210.112', name: 'LAP2-1', type: 'AP', version: 'LM', connect_db: 'LDB2-1', domain: 'WINCARE2', capacity: 30, environment_id: 4,
      }, {
        id: 60, ip: '192.158.10.10', name: 'LAP1-1', type: 'AP', version: 'LM', connect_db: 'LDB1-1', domain: 'WINCARE1', capacity: 60, environment_id: 4,
      }];

      return Server.register('LM', list)
        .then((r) => {
          assert(r === 'end');
        });
    });
  });

  describe('selectメソッド', () => {
    it('引数を与えないと、登録されたサーバ情報を返す', () => Server.select()
      .then((r) => {
        assert(r.length === 40);
      }));
  });
});
