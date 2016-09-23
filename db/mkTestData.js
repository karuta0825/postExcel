var getKID = function () {
  var random = Math.floor( Math.random() * 100000 );
  random = ( '00000' + random ).slice( - 5 )
  return random;
};

var getServer = function () {
  var random_s = Math.floor( (Math.random() * 5) + 1 ),
      random_n = Math.floor( (Math.random() * 5) + 1 );
  return random = 'AP' + random_s + '-' + random_n;
};

var alpha = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    alpha_len = alpha.length;

var num = Math.floor( Math.random() * alpha_len );
WScript.Echo( alpha.charAt(num));

var getUserKey = function () {
  var r = '';
  for ( var i = 0; i<5; i+=1 ) {
    var num = Math.floor( Math.random() * alpha_len );
    r +=  alpha.charAt(num);
  }
  return r;
  // _.uniq( list );
};

var getId = function () {
  var random = Math.floor( (Math.random() * 3) + 1 );
  return random;
}

var i            = 0,
    list_kid     = [],
    list_server  = [],
    list_genics  = [],
    list_userKey = [],
    list_id      = []
    ;

for ( ; i<100; i+=1 ) {
  list_kid.push( 'KID' + getKID() );
  list_server.push( getServer() );
  list_userKey.push( getUserKey() );
  list_id.push( getId() );
};

_.each( list_userKey, function (val) {
  list_genics.push( val.substr(0,3).toLowerCase() );
});

WScript.Echo(list_userKey);

var query = [];
for (var i = 0; i<list_kid.length; i+=1 ) {
  query.push( 'insert into customer.user ( kid, server, genics, userKey, updateDate, authorid) values( '
    + "'" + list_kid[i]     + "'" +  ','
    + "'" + list_server[i]  + "'" + ','
    + "'" + list_genics[i]  + "'" + ','
    + "'" + list_userKey[i] + "'" + ','
    + 'NOW()' + ','
    + list_id[i]
    + ' );'
  );
}

var mobile_add = mobile_add || {};
mobile_add.sql = ( function () {

  var
    configMap = {
      file      : null,
      testMode  : true
    },
    openMode = {
        FOR_READ   : 1,
        FOR_WRITE  : 2,
        FOR_APPEND : 8
    },
    encode = {
        UNICODE : -1,
        ASCII   : 0,
        SJIS    : -2
    },
    file,
    initModule,finitModule,writeFile,
    _unitTest
  ;

  initModule = function ( sh, fs ) {
    var
      sh   = sh || new ActiveXObject( 'WScript.Shell' ),
      fs   = fs || new ActiveXObject( "Scripting.FileSystemObject"),
      path = sh.CurrentDirectory + '/tmp.sql'
      ;

    file = fs.OpenTextFile( path, openMode.FOR_WRITE, true, encode.SJIS );
  };

  finitModule = function () {
    if ( file ) { file.Close(); }
  };

  writeFile = function ( list ) {

    var i = 0;
    for ( ; i<list.length; i+=1 ) {
      file.writeLine( list[i] );
    };

    file.writeLine('\n');
  };

  _unitTest = function () {

    initModule();
    WScript.Echo('test');
    writeFile(query);

    finitModule();

  };

  if ( configMap.testMode === true ) { _unitTest(); }

  /*to public*/
  return {
    initModule  : initModule,
    finitModule : finitModule,
    writeFile   : writeFile
  };

}());