// var customer;
// customer = customer || {};
customer.model = ( function () {

  var 
    _data, _sortOrder = 1,
    findBy,
    findByKid, findByServer, findByGenics,
    sortByCol,
    getData,
    initModule
  ;

  findByKid = function ( kid ) {
    return $.grep( _data, function ( val ) {
      return kid === val.kid;
    })[0];
  };

  findByServer = function ( server ) {
    return $.grep( _data, function ( val ) {
      return server === val.server;
    });　
  };

  findByGenics = function ( genics ) {
    return $.grep( _data, function ( val ) {
      return genics === val.genics;
    })[0];
  };

  sortByCol = function ( col, callback ) {
    
    _data.sort( function ( item1, item2 ) {
      item1 = _.isString( item1[col] ) && item1[col].toString().toLowerCase() || item1[key];
      item2 = _.isString( item2[col] ) && item2[col].toString().toLowerCase() || item2[key];
      if ( item1 < item2 ) {
        return -1 * _sortOrder;
      }
      else if ( item1 > item2 ) {
        return 1 * _sortOrder;
      }
      // return 0;
    });

    // 並び替え方向の入れ替え
    _sortOrder *= -1;

    console.log(_data);
    if( callback ) {
      callback( col, _data );
    }
    // return _data;
  };

  getData = function () {
    return _data;
  };

  initModule = function () {
    _data = customer.db.selectAll('all');
  };


  return {
    initModule   : initModule,
    findByKid    : findByKid,
    findByServer : findByServer,
    findByGenics : findByGenics,
    sortByCol    : sortByCol,
    getData      : getData
  };


}());