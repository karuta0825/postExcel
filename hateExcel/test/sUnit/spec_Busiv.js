
const assert = require('power-assert');
const sinon = require('sinon');
const Busiv = require('../../models/tables/Busiv.js');

describe('Busivモジュール', () => {

  describe('addRowメソッド', () => {

    it('kids_id, base_idを与えると、busivsテーブルに行追加');
    it('kids_idを与えないと、エラーオブジェクトを返す');
    it('base_idを与えないと、エラーオブジェクトを返す');

  });

});
