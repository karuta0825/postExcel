

class Clac {

  /**
   * ２つ引数の値を合計値を求める
   * @param {Number} x
   * @param {Number} y
   */
  static add ( x, y ) {
    return x + y;
  }

  /**
   * 入力値が奇数の場合、trueを返す
   * @param  {Number} x
   * @return {Boolean}
   */
  static isOdd ( x ) {
    if ( x%2 === 1 ) {
      return true;
    }
    else {
      return false;
    }
  }

}

