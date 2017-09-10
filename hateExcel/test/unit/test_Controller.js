import assert from 'power-assert';
import _ from 'underscore';
import sinon from 'sinon';

describe('Controllerクラス', () => {

  var c;

  beforeEach( () => {
    c = new Controller('.top');
  });

  describe('constructorメソッド', () => {

    it('wrapプロパティがある', () => {
      assert( c.hasOwnProperty('wrap') === true );
    });

    it('_elプロパティが{}で初期化', () => {
      assert.deepEqual( c['_el'] , {} );
    });

    it('topプロパティに引数が格納', () => {
      assert( c.top === '.top' );
    });

  });

  describe('deepメソッド', () => {

    it('３段のオブジェクトを使用する', () => {

      var el = {
        floor1 : '1',
        floor2 : { f2_1 : '21', f2_2 : '22'},
        floor3 : {
          f3_1 : {
            f3_1_1 : '311',
            f3_1_2 : '312'
          },
          f3_2 : {
            f3_2_1 : '321',
            f3_2_2 : '322'
           }
        }
      }

      var obj = c.deep(el);
      assert( obj.hasOwnProperty('floor1') === true );

    });

  });

  describe('initElementメソッド', () => {

    it('selectorプロパティに引数と同じオブジェクトが格納されている');

    it('_elプロパティにjQuery変換されたオブジェクトが格納されている');

  });

  describe('$メソッド', () => {

    it('DOM探索範囲が親のだけに絞れている');

  });

  describe('propertysメソッド', () => {

  });

  describe('getメソッド', () => {

  });

  describe('getSelectorメソッド', () => {

  });

  describe('hasElementメソッド', () => {

  });

  describe('addElementメソッド', () => {

  });

  describe('updateElementメソッド', () => {

  });

  describe('addElementメソッド', () => {

  });


});

