const assert = require('power-assert');
const Fenics = require('../../models/tables/Fenics');

describe('Fenicsモジュール', () => {
  describe('selectメソッド', () => {
    it('kids_idを指定すると、fenicsユーザーリストを返す', () => Fenics.select('74')
        .then((r) => {
          assert(r.length === 1);
        }));
  });

  describe('makeUser', () => {
    it('PC用のユーザーを追加', () => Fenics.makeUser('10', false)
      .then((r) => {
        assert(r.affectedRows === 1);
      }));

    it('mobile用のユーザーを追加', () => Fenics.makeUser('10', true)
      .then((r) => {
        assert(r.affectedRows === 1);
      }));

    it('存在しないkids_idとpcフラグを与えると、エラーを返す', () => Fenics.makeUser('1', false)
      .catch((e) => {
        assert(e.message === 'ユーザーを作成してください');
      }));

    it('存在しないkids_idとmobileフラグを与えると、エラーを返す', () => Fenics.makeUser('1', true)
      .catch((e) => {
        assert(e.message === 'ユーザーを作成してください');
      }));
  });

  describe('makeUsersメソッド', () => {
    it('pc用1ユーザー作成する', () => Fenics.makeUser('10', false, 1)
      .then((r) => {
        assert(r.affectedRows === 1);
      }));

    it('mobile用1ユーザー作成する', () => Fenics.makeUser('10', true, 1)
      .then((r) => {
        assert(r.affectedRows === 1);
      }));

    it('pc用複数ユーザー(3人)作成する', () => Fenics.makeUsers('10', false, 3)
      .then((r) => {
        assert(r === 3);
      }));

    it('mobile用複数ユーザー(3人)作成する', () => Fenics.makeUsers('10', true, 3)
      .then((r) => {
        assert(r === 3);
      }));

    it('ループカウンタが0以下のとき、エラーを返す', () => Fenics.makeUsers({ kids_id: '2729', fenics_key: 'pdlj' }, false, 0)
      .catch((err) => {
        assert(err.message === 'ループ回数は1以上指定してください');
      }));
  });

  describe('updateメソッド', () => {
    it('idと更新内容を受け取ると、該当行を更新する', () => Fenics.update(
      {
        pc_name: 'CGXA01002',
        end_on: '2018-06-06',
      },
      'cgxa01001',
    )
      .then((r) => {
        assert(r === null);
      }));
  });

  describe('deleteメソッド', () => {
    it('fenics_idを与えると、該当行を削除する', () => Fenics.remove({
      fenics_id: 'aaac01001',
    })
      .then((r) => {
        assert(r.affectedRows === 1);
      }));

    it('kids_idを与えると、該当行を削除する', () => Fenics.remove({
      kids_id: '10',
    })
      .then((r) => {
        assert(r.affectedRows === 9);
      }));
  });

  describe('findNewIdメソッド', () => {
    describe('is pc', () => {
      it('fenics_keyがすでに存在しているkids_idを指定すると、最後のid+1のfenics_idが返る', () => Fenics.findNewId('2728', false)
        .then((r) => {
          assert(r === 'ilrl01012');
        }));

      it('fenics_key存在していないkids_idを指定すると、[fenics_key]01001が返る', () => Fenics.findNewId('2736', false)
        .then((r) => {
          assert(r === 'mnlx01001');
        }));

      it('引数がないと、エラーオブジェクトが返る', () => Fenics.findNewId()
        .catch((err) => {
          assert(err.message === '引数が正しくありません');
        }));
    });

    describe('is mobile', () => {
      it('fenics_keyすでに存在しているkids_idを指定すると、最後のid+1のfenics_idが返る', () => Fenics.findNewId('2729', true)
        .then((r) => {
          assert(r === 'm4wbn006');
        }));

      it('fenics_key存在していないkids_idを指定すると、[fenics_key]001が返る', () => Fenics.findNewId('111', true)
        .then((r) => {
          assert(r === 'm4nwm001');
        }));

      it('引数がないと、エラーオブジェクトが返る', () => Fenics.findNewId()
        .catch((err) => {
          assert(err.message === '引数が正しくありません');
        }));
    });
  });
});

