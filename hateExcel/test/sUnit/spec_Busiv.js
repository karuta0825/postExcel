
const assert = require('power-assert');
const Busiv = require('../../models/tables/Busiv.js');

describe('Busivモジュール', () => {
  describe('addRowメソッド', () => {
    it('ok_kids_id, base_idを与えると、busivsテーブルに行追加');
    // it('kids_id, base_idを与えると、busivsテーブルに行追加', () => {
    //   return Busiv.addRow(1,99999)
    //   .then( r => {
    //     assert( r.affectedRows === 1 );
    //   });
    // });

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
});
