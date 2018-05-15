
const assert = require('power-assert');
const Kid = require('../../models/tables/Kid.js');

describe('Kidsモジュール', () => {
  describe('selectメソッド', () => {
    it('kids_idを指定すると、kid情報を返す', () => Kid.select('10')
      .then((r) => {
        assert(r.length === 1);
      }));

    it('kids_idを指定しないと、全ユーザー情報を返す', () => Kid.select()
      .then((r) => {
        assert(r.length > 1);
      }));
  });

  describe('findUserkeyメソッド', () => {
    it('kids_idを与えると、userkeyを返す', () => Kid.findUserkey('2840')
      .then((r) => {
        assert(r === 'NZNQID');
      }));
  });

  describe('findFenicsKeyメソッド', () => {
    it('kids_idを与えると、fenicskeyを返す', () => Kid.findFenicsKey('2840')
      .then((r) => {
        assert(r === 'nznq');
      }));
  });

  describe('findNewKidメソッド', () => {
    it('environemnt_idのユーザー存在しないと、environmentsテーブルにある初期kidが返る', () => Kid.findNewKid(7)
      .then((r) => {
        assert(r === '99999');
      }));

    // テストの度にDatabaseの中身を固定させないといけない
    it('environment_idのユーザーが存在すると、最も数値の高いKID+1が返る', () => Kid.findNewKid(2)
      .then((r) => {
        assert(r === 83023);
      }));

    it('存在しないenvironment_idを指定すると、空の配列が返る', () => Kid.findNewKid(99999)
      .then((r) => {
        assert(r === null);
      }));
  });

  describe('findNewUserKeyメソッド', () => {
    it('すでに存在しているuserkeyを引数に指定すると、新しい重複しないuserkeyを返す', () => Kid.findNewUserKey('ZYUYG')
      .then((r) => {
        assert(r !== 'ZYUYG');
      }));

    it('存在してしないuserkeyを引数に指定すると、その値を返す', () => Kid.findNewUserKey('AAAAAA')
      .then((r) => {
        assert(r === 'AAAAAA');
      }));

    it('引数を指定しないと、新しい重複しないuserkeyを返す', () => Kid.findNewUserKey()
      .then((r) => {
        assert(r !== null);
      }));
  });

  describe('findNewFenicsKeyメソッド', () => {
    it('すでに存在しているfenicsKeyを指定すると、新しいユニークなfenicsKeyを返す', () => Kid.findNewFenicsKey('aaaa')
      .then((r) => {
        assert(r !== 'aaaa');
      }));

    it('存在していないfenicsKeyを引数に指定すると、その値を返す', () => Kid.findNewFenicsKey('aaab')
      .then((r) => {
        assert(r === 'aaab');
      }));

    it('引数を指定しないと、新しいユニークなfenicsKeyを返す', () => Kid.findNewFenicsKey()
      .then((r) => {
        assert(r !== null);
      }));
  });

  describe('findNewDbPassメソッド', () => {
    it('変換対象の文字列すべてをつかうと、すべて変換される', () => {
      assert(Kid.findNewDbPass('ABEGIOSTZ') === 'U53R483610572');
    });
  });

  describe('isUniqueメソッド', () => {
    it('存在するkidを与えると、falseを返す', () => Kid.isUnique('98400')
      .then((r) => {
        assert(r === false);
      }));

    it('存在しないkidを与えると、trueを返す', () => Kid.isUnique('20000')
      .then((r) => {
        assert(r === true);
      }));

    it('引数を与えないと、errを返す', () => Kid.isUnique()
      .catch((err) => {
        assert(err instanceof Error);
      }));
  });

  describe('isUniqueFenicskeyメソッド', () => {
    it('存在するfenicskeyを与えると、falseを返す', () => Kid.isUniqueFenicskey('atw')
      .then((r) => {
        assert(r === false);
      }));

    it('存在しないfenicskeyを与えると、trueを返す', () => Kid.isUniqueFenicskey('xxx')
      .then((r) => {
        assert(r === true);
      }));

    it('引数を与えないと、エラーを返す', () => Kid.isUniqueFenicskey()
      .catch((err) => {
        assert(err instanceof Error);
      }));
  });

  describe('isUniqueUserkeyメソッド', () => {
    it('存在するuserkeyを与えると、falseを返す', () => Kid.isUniqueUserkey('YYYYY')
      .then((r) => {
        assert(r === false);
      }));

    it('存在しないuserkeyを与えると、trueを返す', () => Kid.isUniqueUserkey('XXXXX')
      .then((r) => {
        assert(r === true);
      }));

    it('引数を与えないと、エラーを返す', () => Kid.isUniqueUserkey()
      .catch((err) => {
        assert(err instanceof Error);
      }));
  });

  describe('isUniqueDBPassメソッド', () => {
    it('存在するdb passwordを与えると、falseを返す', () => Kid.isUniqueDBPass('U53RUPH2QH')
      .then((r) => {
        assert(r === false);
      }));

    it('存在しないdb passwordを与えると、trueを返す', () => Kid.isUniqueDBPass('AAAAAAAAA')
      .then((r) => {
        assert(r === true);
      }));

    it('引数を与えないと、エラーを返す', () => Kid.isUniqueDBPass()
      .catch((err) => {
        assert(err instanceof Error);
      }));
  });

  describe('addRowメソッド', () => {
    it('kidを指定して非ドコモユーザー作成', () => {
      const params = {
        kid: '98387',
        environment_id: 4,
        server: 'LAP1-1',
        create_user_id: '1',
      };

      return Kid.addRow(params)
        .then((r) => {
          assert(r.kid === params.kid);
          assert(r.userkey !== undefined);
          assert(r.db_password !== undefined);
        });
    });

    it('kidを指定せずにドコモユーザー作成', () => {
      const params = {
        environment_id: 6,
        server: 'LAP1-1',
        create_user_id: '1',
      };

      return Kid.addRow(params)
        .then((r) => {
          assert(r.kid !== undefined);
          assert(r.userkey !== undefined);
          assert(r.db_password !== undefined);
          assert(r.is_replaced_from_another === 1);
        });
    });

    it('既に存在しているKIDが指定されると、重複エラーを返す', () => {
      const params = {
        kid: '42357',
        environment_id: 2,
        server: 'LAP1-1',
        create_user_id: '1',
      };

      return Kid.addRow(params)
        .catch((err) => {
          assert(err.message === '指定システム環境で作成できるKID上限数を超えましたので、作成できませんでした');
        });
    });
  });

  describe('updateメソッド', () => {
    it('idと更新内容を受け取ると、該当行を更新する', () => Kid.update(
      {
        userkey: 'PRINTR',
        server: 'AP1-1',
      },
      {
        kid: '98386',
      },
    )
      .then(() => Kid.select('2918'))
      .then((r) => {
        assert(r[0].userkey === 'PRINTR');
        assert(r[0].server === 'AP1-1');
      }));
  });

  describe('deleteメソッド', () => {
    it('kidを与えると、該当行を削除する', () => Kid.remove({
      kid: '98387',
    })
      .then((r) => {
        assert(r.affectedRows === 1);
      }));
  });

  describe('planUpdateメソッド', () => {
    it('実行すると、関数が返る', () => {
      const plan = Kid.planUpdate();
      assert(plan instanceof Function);
    });


    it('返り値の関数に条件kidと更新内容を渡して関数適用すると、更新される', () => {
      const plan = Kid.planUpdate(
        {
          userkey: 'PRINTK',
          server: 'AP1-2',
        },
        {
          kid: '98386',
        },
      );

      plan()
        .then(() => Kid.select('2918'))
        .then((r) => {
          assert(r[0].userkey === 'PRINTK');
          assert(r[0].server === 'AP1-2');
        });
    });
  });
});
