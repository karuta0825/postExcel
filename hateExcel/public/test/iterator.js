var Page = function ( list, item_per_page ) {

  if ( !item_per_page ) {
    throw new Error('two aruguments need.');
  }

  var
    idx    = 1
  , data   = list
  , length = list.length
  , items  = item_per_page
  , pages  = Math.ceil( length / item_per_page )
  // public
  , get
  , next
  , prev
  , current
  ;

  get = function ( page_number ) {

    var
      start =  items * (page_number-1)
    , end = start + items
    ;

    if ( page_number > pages || page_number < 1 ) {
      throw new Error('インデックスエラー');
    }

    idx = page_number;

    return data.slice( start, end );

  };

  next = function () {

    if ( idx === pages ) {
      return null;
    }

    idx += 1;
    return get(idx);

  };

  prev = function () {

    if ( idx === 0 ) {
      return null;
    }

    idx -= 1;
    return get(idx);

  };

  current = function () {
    return get(idx);
  };


  return {
    getPage     : get,
    nextPage    : next,
    prevPage    : prev,
    currentPage : current,
    getIndex    : function () { return idx; },
    getMaxPage  : function () { return pages; }
  };

};


var list = [1,2,3,4,5,6,7,8,9,10];

var i = Page(list, 3);