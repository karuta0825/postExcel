// var customer;
// customer = customer || {};
customer.model = ( function () {

  var 
    /*private member*/
    _data, _sortOrder = 1,
    /*private method*/

    /*public  method*/
    findByKid, findByServer, findByGenics,
    sortByCol, getData,      initModule
  ;

  findByKid = function ( kid ) {
    return $.grep( _data, function ( val ) {
      return kid === val.kid;
    })[0];
  };

  findByServer = function ( server, callback ) {
    var data = $.grep( _data, function ( val ) { return server === val.server;})
    if ( callback ) {
      callback( 'server', data );
    }
    return data;
  };

  findByGenics = function ( genics ) {
    return $.grep( _data, function ( val ) {
      return genics === val.genics;
    })[0];
  };

  sortByCol = function ( col, callbackFromView ) {
    
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

    // モデルの変化時にviewを更新する処理
    if( callbackFromView ) {
      callbackFromView( col, _data );
    }

  };

  getData = function () {
    return _data;
  };

  initModule = function () {
    _data = customer.db.selectAll('all');
    return {
      findByKid    : findByKid,
      findByServer : findByServer,
      findByGenics : findByGenics,
      sortByCol    : sortByCol,
      getData      : getData      
    }
  };

  /*public method*/
  // return {
  //   initModule   : initModule,
  //   findByKid    : findByKid,
  //   findByServer : findByServer,
  //   findByGenics : findByGenics,
  //   sortByCol    : sortByCol,
  //   getData      : getData
  // };
  return {
    initModule   : initModule
  };

}());