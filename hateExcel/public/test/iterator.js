
var Page = function ( list, item_per_page ) {

  if ( !list || !_.isArray(list) ) {
    throw new Error('first arugument needs Array');
  }

  if ( !item_per_page ) {
    throw new Error('two aruguments need.');
  }

  this['idx'] = 1;
  this['list'] = list;
  this['length'] = list.length;
  this['visible_item_number'] = item_per_page;
  this['max_page'] = Math.ceil( this.length / item_per_page );

};

Page.fn = Page.prototype;

Page.fn.get = function ( page_number ) {

  var
    start =  this['visible_item_number'] * (page_number-1)
  , end = start + this['visible_item_number']
  ;

  if ( page_number > this['max_page'] || page_number < 1 ) {
    throw new Error('インデックスエラー');
  }

  this['idx'] = page_number;

  return this['list'].slice( start, end );

};

Page.fn.next = function () {

  if ( this['idx'] === this['max_page'] ) {
    return null;
  }

  this['idx'] += 1;
  return this.get(this['idx']);

};

Page.fn.prev = function () {

  if ( this['idx'] === 1 ) {
    return null;
  }

  this['idx'] -= 1;
  return this.get(this['idx']);

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


var Page = function ( list, item_per_page ) {

  if ( !list || !_.isArray(list) ) {
    throw new Error('first arugument needs Array');
  }

  if ( !item_per_page ) {
    throw new Error('two aruguments need.');
  }

  var
    idx                  = 1
  , data                 = list
  , length               = list.length
  , visible_item_number  = item_per_page
  , max_page             = Math.ceil( length / item_per_page )
  // public
  , get
  , next
  , prev
  , current
  ;

  /**
   * 指定したページ番号のアイテムを取得する
   * @param  {Number} page_number - ページ番号
   * @return {Array}
   */
  get = function ( page_number ) {

    var
      start =  visible_item_number * (page_number-1)
    , end = start + visible_item_number
    ;

    if ( page_number > max_page || page_number < 1 ) {
      throw new Error('インデックスエラー');
    }

    idx = page_number;

    return data.slice( start, end );

  };

  /**
   * 次の表示アイテムを取得
   * 次が存在しない場合、nullを返す
   * @return {Array}
   */
  next = function () {

    if ( idx === max_page ) {
      return null;
    }

    idx += 1;
    return get(idx);

  };

  /**
   * 前の表示アイテムを取得
   * 前が存在しない場合、nullを返す
   * @return {Array}
   */
  prev = function () {

    if ( idx === 1 ) {
      return null;
    }

    idx -= 1;
    return get(idx);

  };

  /**
   * 現在の表示ページのアイテムを取得
   * @return {Array}
   */
  current = function () {
    return get(idx);
  };


  return {
    getPage     : get,
    nextPage    : next,
    prevPage    : prev,
    currentPage : current,
    getIndex    : function () { return idx; },
    getMaxPage  : function () { return max_page; }
  };

};


var list = [1,2,3,4,5,6,7,8,9,10];

  var i = Page(list, 3);