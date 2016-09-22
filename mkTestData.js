var getKID = function () {
  var random = Math.floor( Math.random() * 100000 );
  random = ( '00000' + random ).slice( - 5 )
  return random
};

var getServer = function () {
  var random_s = Math.floor( (Math.random() * 5) + 1 ),
      random_n = Math.floor( (Math.random() * 5) + 1 );
  return random = 'AP' + random_s + '-' + random_n;
};

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
  list_genics.push( getGenics() );
};

i = 0
for (; i<list_kid.length; i+=1 ) {
  var query = 'insert into user ( kid, server, genics, userKey updateDate, authorid) values( ' 
  + list_kid[i]     + ','
  + list_server[i]  + ','
  + list_genics[i]  + ',',
  + list_userKey[i] + ',',
  + list_id[i]      + ',;'
  ;

}