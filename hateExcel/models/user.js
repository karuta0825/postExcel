// import module
const
  database = require('./database')
, querys   = require('./list_query')
, moment = require('../public/js/lib/moment.min')
, _ = require('../public/js/lib/underscore')
, db = database.createClient()
;

function register ( items, callback ) {

  let
    qrys   = []
  , params = []
  , kid    = items.kid.substr(-5,5)
  , condition
  ;

  delete items.kid;
  delete items.clients;
  delete items.mobiles;

  // テーブルごとの個別処理

  // kids
  items['kids']['kid']                      = kid;
  items['kids']['has_qa']                   = ( items['kids']['has_qa']                   ) ? '1' : '0';
  items['kids']['is_new_contract']          = ( items['kids']['is_new_contract']          ) ? '1' : '0';
  items['kids']['is_replaced_from_cj']      = ( items['kids']['is_replaced_from_cj']      ) ? '1' : '0';
  items['kids']['is_replaced_from_wc']      = ( items['kids']['is_replaced_from_wc']      ) ? '1' : '0';
  items['kids']['is_replaced_from_another'] = ( items['kids']['is_replaced_from_another'] ) ? '1' : '0';
  items['kids']['register_on'] = moment().format('YYYY-MM-DD');
  items['kids']['is_registered'] = 1
  qrys.push( querys.update['kids'] )
  params.push( [ items['kids'], { 'id' : items['kids'].kids_id } ] );

  // customers;
  condition = items['customers']['kids_id'];
  delete items['customers']['kids_id'];
  qrys.push( querys.update['customers']);
  params.push( [ items['customers'], { 'kids_id' : condition }]);

  // licenses;
  condition = items['licenses']['kids_id'];
  delete items['licenses']['kids_id'];
  qrys.push( querys.update['licenses']);

  var ary = [];
  _.each( items['licenses'], function (v,k) {
    if ( v === '1') {
      ary.push(k);
    }
  });
  var license;
  if ( ary.length > 1 ) {
    license = { 'services' : ary.join(':') };
  }
  else {
    license = { services : ary[0] };
  }
  params.push([ license, { 'kids_id' : condition } ]);

  // partners;
  condition = items['partners']['kids_id'];
  delete items['partners']['kids_id'];
  qrys.push( querys.update['partners']);
  params.push( [ items['partners'], { 'kids_id' : condition }]);

  // busivs
  condition = items['busivs']['kids_id'];
  delete items['busivs']['kids_id'];
  qrys.push( querys.update['busivs']);
  var information = JSON.stringify(items['busivs']);
  params.push([ {'information' : information}, { 'kids_id' : condition } ]);

  console.log(qrys);
  console.log(params);

  // callback(null,'test');
  db.transaction( qrys, params, callback );

}


exports.register = register;

