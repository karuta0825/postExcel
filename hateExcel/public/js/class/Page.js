
/**
 * Pageクラス
 * Iteratorの一種
 */

( function ( $, exports ) {

  exports.Page = function ( list, item_per_page ) {

    if ( !list || !_.isArray(list) ) {
      throw new Error('first arugument needs Array');
    }

    if ( !item_per_page ) {
      throw new Error('two aruguments need.');
    }

    this['stock'] = 3;
    this.initialize(list, item_per_page);

  };

  Page.fn = Page.prototype;

  Page.fn.get = function ( page_number, callback ) {

    var
      start =  this['visible_item_number'] * (page_number-1)
    , end = start + this['visible_item_number']
    , result
    ;

    if ( page_number > this['max_page'] || page_number < 1 ) {
      throw new Error('インデックスエラー');
    }

    this['idx'] = page_number;
    result = this['list'].slice( start, end );

    if ( typeof callback === 'function' ) {
      callback( result );
    }
    else {
      return result;
    }

  };

  Page.fn.initialize = function ( list, item_per_page ) {

    this['idx']                 = 1;
    this['list']                = list;
    this['length']              = list.length;
    this['visible_item_number'] = item_per_page;
    this['max_page']            = this.length && Math.ceil( this.length / item_per_page ) || 1;

  };

  Page.fn.next = function ( callback ) {

    if ( this['idx'] === this['max_page'] ) {
      return null;
    }

    this['idx'] += 1;
    if ( typeof callback === 'function' ) {
      callback( this.get(this['idx']) );
    }
    else {
      return this.get( this['idx'] );
    }

  };

  Page.fn.prev = function ( callback ) {

    if ( this['idx'] === 1 ) {
      return null;
    }

    this['idx'] -= 1;
    if ( typeof callback === 'function' ) {
      callback( this.get(this['idx']) );
    }
    else {
      return this.get( this['idx'] );
    }

  };

  Page.fn.first = function () {
    return this.get(1);
  };

  Page.fn.last = function () {
    return this.get( this['max_page'] );
  };

  Page.fn.current = function () {
    return this.get(this['idx']);
  };

  Page.fn.getIndex = function () {
    return this['idx'];
  };

  Page.fn.getMaxPage = function () {
    return this['max_page'];
  };

  Page.fn.getPageList = function ( callback ) {

    var
      i     = this['idx']
    , max   = this['max_page']
    , stock = this['stock']
    ;

    // 最大ページ数が表示可能ページ数より少ないとき
    if ( max <= 5 ) {
      return _.range(1,max+1);
    }

    // 次のページを読み込む必要がない
    if ( i <= 3 ) {
      return [1,2,3,4,'',max];
    }

    // 次ページが存在しない時
    if ( i >= max - 2 ) {
      return [1,'',max-3, max-2, max-1, max];
    }

    return [1,'',i-1,i,i+1,'',max];


  };

}( jQuery, this)) ;
