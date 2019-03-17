const assert = require('power-assert');
const utils = require('../../routes/utils');

describe('isDiffメソッド', () => {
  it('old:new = "":"" is same', () => {
    assert(utils.isDiff('', '') === false);
  });

  it('old:new = "":null is same', () => {
    assert(utils.isDiff('', null) === false);
  });

  it('old:new = null:"" is same', () => {
    assert(utils.isDiff(null, '') === false);
  });

  it('old:new = null:null is same', () => {
    assert(utils.isDiff(null, null) === false);
  });

  it('old:new = "":some is different', () => {
    assert(utils.isDiff('', 'some') === true);
  });

  it('old:new = null:some is different', () => {
    assert(utils.isDiff(null, 'some') === true);
  });

  it('old:new = some:"" is different', () => {
    assert(utils.isDiff('some', '') === true);
  });

  it('old:new = some:null is different', () => {
    assert(utils.isDiff('some', null) === true);
  });

  it('old:new = some:some is same', () => {
    assert(utils.isDiff('some', 'some') === false);
  });

  it('old:new = some:others is different', () => {
    assert(utils.isDiff('some', 'others') === true);
  });
});

describe('createDiffList', () => {
  it('', () => {
    const Old = {
      a: '',
      b: 'b1',
      c: 1,
      d: 1,
      e: false,
      f: false,
    };
    const New = {
      a: '',
      b: 'b2',
      c: 1,
      d: 2,
      e: false,
      f: true,
    };

    const Table = {
      a: 'a',
      b: 'b',
      c: 'c',
      d: 'd',
      e: 'e',
      f: 'f',
    };

    const list = utils.createDiffList(1, 'タブ', Table, Old, New);
    console.log(list);
    assert(list.length === 3);
  });
});
