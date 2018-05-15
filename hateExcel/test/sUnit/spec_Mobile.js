
const assert = require('power-assert');
const Mobile = require('../../models/tables/Mobile');


describe('Mobileモジュール', () => {
  describe('selectメソッド', () => {
    it('kids_idをプロパティにもつオブジェクトを与えると、該当レコードを返す', () => Mobile.select(149)
      .then((r) => {
        assert.deepEqual(r[0], {
          kids_id: '149',
          base_id: 137,
          fenics_key: 'm1adz',
          client_number: 0,
          admin_id: 'm1adz',
          admin_pw: 'm1adz20',
          city_cd: null,
          office_cd: null,
          disk_name: null,
          disk_size: null,
        });
      }));
  });

  describe('findNewFenicsKeyメソッド', () => {
    it('すでに存在しているfenicsKeyを指定すると、新しいユニークなfenicsKeyを返す', () => Mobile.findNewFenicsKey('m4snw')
      .then((r) => {
        assert(r !== 'm4snw');
      }));

    it('存在していないfenicsKeyを引数に指定すると、その値を返す', () => Mobile.findNewFenicsKey('aaab')
      .then((r) => {
        assert(r === 'aaab');
      }));

    it('引数を指定しないと、新しいユニークなfenicsKeyを返す', () => Mobile.findNewFenicsKey()
      .then((r) => {
        assert(r !== null);
      }));
  });

  describe('isUniqueFenicskeyメソッド', () => {
    it('すでに存在するfenicskeyとkids_idを与えると、falseを返す', () => Mobile.isUniqueFenicskey('m3fey', '3086')
      .then((r) => {
        assert(r === false);
      }));
  });

  describe('addRowメソッド', () => {
    it('ok_kids_id, base_id, fenicskeyを与えと、mobilesテーブルに行追加');
    // it('kids_id, base_id, fenicskeyを与えると、mobilesテーブルに行追加', () => {
    //   return Mobile.addRow('1', '1', 'mobil')
    //   .then( r => {
    //     assert( r.affectedRows === 1 );
    //   })
    // });

    it('kids_idを与えないと、エラーオブジェクト返す', () => Mobile.addRow()
      .catch((err) => {
        assert(err.message === '引数が存在してません');
      }));

    it('base_idを与えないと、エラーオブジェクトを返す', () => Mobile.addRow('1')
      .catch((err) => {
        assert(err.message === '引数が存在してません');
      }));

    it('fenicskeyを与えないと、エラーオブジェクト返す', () => Mobile.addRow('1', '1')
      .catch((err) => {
        assert(err.message === '引数が存在してません');
      }));
  });

  describe('updateメソッド', () => {
    it('ok_kids_idと更新内容を受け取ると、該当行を更新する');
    // it('kids_idと更新内容を受け取ると、該当行を更新する', () => {
    //   const condition = { kids_id: 149 };
    //   const input_map = {
    //     admin_id: 'm1adb',
    //   };

    //   return Mobile.update(input_map, condition)
    //     .then((r) => {
    //       assert(r === null);
    //       return Mobile.select(149);
    //     })
    //     .then((r) => {
    //       assert.deepEqual(r[0], {
    //         kids_id: '149',
    //         base_id: 137,
    //         fenics_key: 'm1adz',
    //         client_number: 0,
    //         admin_id: 'm1adb',
    //         admin_pw: 'm1adz20',
    //         city_cd: null,
    //         office_cd: null,
    //         disk_name: null,
    //         disk_size: null,
    //       });
    //     });
    // });
  });
});

