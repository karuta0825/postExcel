import assert from 'power-assert';


describe('Clacクラス', () => {

  describe('addメソッド',　() => {

    it('1と2を入力すると、3が返る', () => {
      const expect = 3;
      assert( Clac.add(1,2) === expect );
    });

  });

  describe('isOddメソッド', () => {

    it('1を入力すると、trueが返る', () => {

      assert( Clac.isOdd(1) === true );

    });

    it('2を入力すると、falseが返る', () => {

      assert( Clac.isOdd(2) === false );

    });

  });

});

