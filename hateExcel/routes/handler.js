const Busiv = require('../models/tables/Busiv');
const Client = require('../models/tables/Client');
const Customer = require('../models/tables/Customer');
const Environment = require('../models/tables/Environment');
const Fenics = require('../models/tables/Fenics');
const Kid = require('../models/tables/Kid');
const License = require('../models/tables/License');
const Login = require('../models/tables/Login');
const Memo = require('../models/tables/Memo');
const Mobile = require('../models/tables/Mobile');
const Server = require('../models/tables/Server');
const Service = require('../models/tables/Service');

// 関数名は[HTTP-METHOD_URI]とする

function checkSession(req, res, next) {
  if ( !req.session.pass ) {
    res.json(440, {result:'expired', message:'セッションが切れました。ログインからやり直してください。'});
    return;
  }
  next();
}

function setHeader(req, res, next) {
  res.header("Content-Type", "application/json; charset=utf-8");
}

function get_login(req, res) {
  res.render('login', { message : ''} );
}

function post_login(req,res) {
  return Login.authenticate(req.body)
  .then( r => {
    if ( r !== null ) {
      req.session.pass = true;
      req.session.uid = r.id;
    }
    res.redirect('/');
  });
}

function get_logout(req, res) {
  req.session.pass = null;
  res.redirect('/');
}

function post_makeLoginAccount(req, res) {
  let data = {
    uid      : req.body.id  ,
    name     : req.body.name,
    password : req.body.pass,
    newadd   : 1
  };

  return Login.makeLoginAccount(data)
  .then( r => {
    res.render('complete');
  });
}

function get_route(req, res) {
  if ( !req.session.pass ) {
    res.redirect('/login');
    return;
  }
  else {
    res.render('index');
    return;
  }
}

function get_all(req, res) {
  res.header("Content-Type", "application/json; charset=utf-8");
  datas.getAll( function (results){
    res.json(results);
  });
}

function post_select(req, res) {

}

function post_column(req, res) {
  var
    data = req.body.data,
    uid  = req.session.uid
    ;

  datas.update( data, uid, 'columns', function ( err ) {
    if ( err ) {
      res.status( 500 ).send( err.message );
      return;
    }
    res.json({ result : 'ok'});
  });
}

function post_insert(req, res) {
  //post送信で渡ってきたデータ
  var
    data = req.body.data
  , table = req.body.table
  , idx = 0
  ;

  if ( !req.session.pass ) {
    res.json(440, {result:'expired', message:'セッションが切れました。ログインからやり直してください。'});
    return;
  }

  // dataがArrayであることが前提だね
  if ( Object.prototype.toString.call( data ) === '[object Array]' ) {
    for ( var i = 0; i < data.length; i+= 1 ) {
      data[i]['create_user_id'] = req.session.uid;
      data[i]['create_on'] = new Date();

      datas.insert( data[i], table, function ( err ) {
        // insert時のエラー処理
        if (err) {
          console.log(err);
          res.status( 500 ).send( {error : err} );
          return;
        }

        idx++;
        console.log(table);
        console.log('idx increment');
        console.log(idx);

        console.log( idx === data.length );

        if ( idx === data.length ) {
          console.log('end');
          res.json({'result' : 'ok'});
        }

      });
    }
  }
}

function post_addFenicsAccounts(req, res) {
  var data = req.body.data;

  // if ( !req.session.pass ) {
  //   res.json(440, {result:'expired', message:'セッションが切れました。ログインからやり直してください。'});
  //   return;
  // }

  data.create_user_id = req.session.uid;
  return Fenics.makeids( data, data.number_pc_added, () => {
    res.json({'result' : 'ok'});
  });
}

function post_addClient(req, res) {
  var data = req.body.data;

  // if ( !req.session.pass ) {
  //   res.json(440, {result:'expired', message:'セッションが切れました。ログインからやり直してください。'});
  //   return;
  // }

  data.create_user_id = req.session.uid;

  Fenics.makeUsers( data, data.number_client_added, function () {
    res.json({'result' : 'ok'});
  });
}

function post_addMobileClient(req, res) {
  var data = req.body.data;

  // if ( !req.session.pass ) {
  //   res.json(440, {result:'expired', message:'セッションが切れました。ログインからやり直してください。'});
  //   return;
  // }

  data.create_user_id = req.session.uid;

  Fenics.makeMobileUsers( data, data.number_client_added, function (err) {
    res.json({'result' : 'ok'});
  });
}

function post_makeUser(req, res) {}
function post_makeUser(req, res) {}
function post_addBase(req, res) {}
function post_makeMemo(req, res) {}
function post_delete(req, res) {}
function post_update(req, res) {}
function post_isUnique_kid(req, res) {}
function post_isUniqueIp(req, res) {}
function post_isUniqueFenicsKey(req, res) {}
function post_isUniqueUserKey(req, res) {}
function post_isUniqueDBPass(req, res) {}
function post_updateFenics(req, res) {}
function post_updateClient(req, res) {}
function post_user(req, res) {}
function post_master_table(req, res) {}
function post_updateLogin(req, res) {}

module.exports = {
  checkSession : checkSession,
  setHeader : setHeader,
  post_makeUser : post_makeUser
}