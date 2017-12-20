// import module
const
  database = require('./database')
, querys   = require('./list_query')
, moment = require('../public/js/lib/moment.min')
, db = database.createClient()
;

function register ( items, callback ) {

  let qrys, params;

  // テーブルごとの個別処理
  for ( var i in itmes ) {

    if ( i === 'kids') {}
    if ( i === 'customers') {}
    if ( i === 'licenses') {}
    if ( i === 'partners') {}
    if ( i === 'mobiles') {}
    if ( i === 'busivs') {}

  }

  db.transaction( qrys, params, callback );

}


exports.register = register;

