import assert from 'power-assert';

describe('Calcクラス', () => {

  describe('addメソッド',　() => {

    it('1と2を入力すると、3が返る', () => {
      const expect = 3;
      assert( Calc.add(1,2) === expect );
    });

  });

  describe('isOddメソッド', () => {

    it('1を入力すると、trueが返る', () => {

      assert( Calc.isOdd(1) === true );

    });

    it('2を入力すると、falseが返る', () => {

      assert( Calc.isOdd('2') === false );

    });

  });

});

