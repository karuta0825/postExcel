
const assert = require('power-assert');
const Busiv = require('../../models/tables/Busiv.js');

describe('Busivモジュール', () => {
  describe('selectメソッド', () => {
    it('kids_idを指定すると、ビジV情報のリストを返す', () => Busiv.select('5')
      .then((r) => {
        assert(r.length === 1);
      }));
  });

  describe('addRowメソッド', () => {
    it('kids_id, base_idを与えると、busivsテーブルに行追加', () => Busiv.addRow('1', '99999')
      .then((r) => {
        assert(r.affectedRows === 1);
      }));

    it('引数をひとつも渡さないと、エラーオブジェクトを返す', () => Busiv.addRow()
      .catch((err) => {
        assert(err.message === '引数を指定してください');
      }));

    it('kids_idを与えないと、エラーオブジェクトを返す', () => Busiv.addRow(null, 1)
      .catch((err) => {
        assert(err.message === '引数を指定してください');
      }));

    it('base_idを与えないと、エラーオブジェクトを返す', () => Busiv.addRow(1)
      .catch((err) => {
        assert(err.message === '引数を指定してください');
      }));
  });

  describe('updateメソッド', () => {
    it('base_idと更新対象のオブジェクトを渡すと該当行の更新をする', () => {
      const data = {
        information: JSON.stringify({
          cc_ip: 'a',
          sx_ip: 'a',
          has_L3: 'a',
          has_cc: 'a',
          has_sx: 'a',
          w_router: 'a',
          w_subnet: 'a',
          has_carte: 'a',
          open_date: 'a',
          w_network: 'a',
          carte_system: 'a',
          circuit_name: 'a',
          auth_server_ip: 'a',
          circuit_service: 'a',
          how_to_cooperate: 'a',
          carte_html_save_ip: 'a',
          download_server_ip: 'a',
        }),
      };
      const condition = { base_id: 218 };

      return Busiv.update(data, condition)
        .then((r) => {
          assert(r === null);
        });
    });
  });

  describe('removeメソッド', () => {
    it('base_idをプロパティに持つオブジェクトを与えると、該当行を削除する', () => Busiv.remove({
      base_id: '99999',
    })
      .then((r) => {
        assert(r.affectedRows === 1);
      }));
  });

  describe('planUpdateメソッド', () => {
    it('実行すると、関数が返る', () => {
      const plan = Busiv.planUpdate();
      assert(plan instanceof Function);
    });

    it('返り値の関数にbase_idと更新対象のオブジェクトを渡して関数適用すると、更新される', () => {
      const data = {
        information: JSON.stringify({
          cc_ip: 'b',
          sx_ip: 'b',
          has_L3: 'b',
          has_cc: 'b',
          has_sx: 'b',
          w_router: 'b',
          w_subnet: 'b',
          has_carte: 'b',
          open_date: 'b',
          w_network: 'b',
          carte_system: 'b',
          circuit_name: 'b',
          auth_server_ip: 'b',
          circuit_service: 'b',
          how_to_cooperate: 'b',
          carte_html_save_ip: 'b',
          download_server_ip: 'b',
        }),
      };
      const condition = { base_id: 218 };
      const plan = Busiv.planUpdate(data, condition);
      return plan()
        .then(() => Busiv.select(10000))
        .then((r) => {
          assert(r[0].cc_ip === 'b');
        });
    });
  });
});
