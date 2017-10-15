// @flow

class Calc {

  static add ( x: number, y: number ): number {
    return x + y;
  }

  static isOdd ( x: number ): boolean {
    if ( x%2 === 1 ) {
      return true;
    }
    else {
      return false;
    }
  }

}

