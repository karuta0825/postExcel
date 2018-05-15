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
const Column = require('../models/tables/Column');
const User = require('../models/presentations/User');
const { dispatcher } = require('./dispatcher');
const u_others = require('../models/util/u_others');

// 関数名は[HTTP-METHOD_URI]とする

function get_login(req, res) {
  res.render('login', { message: '' });
}

function post_login(req, res) {
  return Login.authenticate(req.body)
    .then((r) => {
      if (r !== null) {
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

function get_tableHeader(req, res) {
  Column.select()
    .then((r) => {
      res.json(r);
    });
}

function post_makeLoginAccount(req, res) {
  const data = {
    uid: req.body.id,
    name: req.body.name,
    password: req.body.pass,
    newadd: 1,
  };

  return Login.makeLoginAccount(data)
    .then(() => {
      res.render('complete');
    });
}

function get_root(req, res) {
  if (!req.session.pass) {
    res.redirect('/login');
  } else {
    res.render('index');
  }
}

function post_select(req, res) {
  const { condition, table } = req.body;
  const { uid } = req.session;

  if (table === 'available_number_in_each_server') {
    Server.getAvailableUser()
      .then((r) => {
        res.json(r);
      })
      .catch((err) => {
        res.status(500).send(err.message);
      });
    return;
  }

  const dp = dispatcher(table);
  dp.select(condition, uid)
    .then((r) => {
      res.json(r);
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
}

function post_column(req, res) {
  const { data } = req.body;
  const { uid } = req.session;

  const dp = dispatcher('header');
  dp.update(data, uid)
    .then(() => {
      res.json({ result: 'ok' });
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
}

async function post_delete(req, res) {
  const { data, table } = req.body;
  const dp = dispatcher(table);

  try {
    for (let i = 0; i < data.length; i += 1) {
      await dp.remove(data[i]);
    }
    res.json({ result: 'ok' });
  } catch (e) {
    res.status(500).send({ error: e });
  }
}

function post_update(req, res) {
  const { data, condition, table } = req.body;
  const dp = dispatcher(table);

  if (table === 'memos') {
    data.update_user_id = req.session.uid;
  }

  dp.update(data, condition)
    .then(() => {
      res.json({ result: 'ok' });
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
}

async function post_insert(req, res) {
  const { data, table } = req.body;
  const dp = dispatcher(table);

  try {
    for (let i = 0; i < data.length; i += 1) {
      data[i].create_user_id = req.session.uid;
      data[i].create_on = new Date();
      await dp.addRow(data[i]);
    }
    res.json({ result: 'ok' });
  } catch (e) {
    res.status(500).send({ error: e });
  }
}

function post_addFenicsAccounts(req, res) {
  const { data } = req.body;
  data.create_user_id = req.session.uid;

  Fenics.makeUsers(data.kids_id, false, data.number_pc_added)
    .then(() => {
      res.json({ result: 'ok' });
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
}

function post_addClient(req, res) {
  const { data } = req.body;

  Client.makeIds(data.kids_id, req.session.uid, data.number_client_added)
    .then(() => {
      res.json({ result: 'ok' });
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
}

function post_addMobileClient(req, res) {
  const { data } = req.body;

  Fenics.makeUsers(data.kids_id, true, data.number_client_added)
    .then(() => {
      res.json({ result: 'ok' });
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
}

function post_makeUser(req, res) {
  const { data } = req.body;
  data.create_user_id = req.session.uid;

  User.create(data)
    .then((r) => {
      res.json(r);
    })
    .catch((err) => {
      res.json(440, { result: 'falied', message: err.message });
    });
}

function post_addBase(req, res) {
  const { kids_id } = req.body;
  User.addBase(kids_id)
    .then(() => {
      res.json({ result: 'ok' });
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
}

function post_makeMemo(req, res) {
  const { data } = req.body;
  data.create_user_id = req.session.uid;
  data.create_on = new Date();

  Memo.addRow(data)
    .then(() => {
      res.json({ result: 'ok' });
    })
    .catch((err) => {
      res.json({ result: 'fail', err: err.message });
    });
}

async function post_updateFenics(req, res) {
  const { data } = req.body;
  const item = {};
  let condition;
  let i;

  try {
    for (i = 0; i < data.length; i += 1) {
      item.fenics_id = data[i].fenics_id || '';
      item.start_on = (data[i].start_on) ? data[i].start_on : null;
      item.end_on = (data[i].end_on && data[i].end_on !== '') ? data[i].end_on : null;
      item.pc_name = data[i].pc_name || '';
      if (data[i].fenics_ip) {
        item.fenics_ip = u_others.inet_aton(data[i].fenics_ip);
      }
      item.category = data[i].category || '';

      condition = data[i].fenics_id;

      await Fenics.update(item, condition);
    }
  } catch (err) {
    res.status(500).send({ error: err });
  }

  res.json({ result: 'success', number: i });
}

async function post_updateClient(req, res) {
  const { data } = req.body;
  const item = {};
  let condition;
  let i = 0;

  try {
    for (i = 0; i < data.length; i += 1) {
      item.fenics_id = data[i].fenics_id || '';
      item.end_on = (data[i].end_on && data[i].end_on !== '') ? data[i].end_on : null;
      condition = data[i].client_id;

      await Client.update(item, condition);
    }
  } catch (err) {
    res.json({ result: 'fail', err: err.message });
  }

  res.json({ result: 'success', number: i });
}


function post_user(req, res) {
  const { data } = req.body;
  User.register(data)
    .then(() => {
      res.json({ result: 'success', message: '登録完了しました' });
    })
    .catch((err) => {
      res.json(400, { result: 'failed', message: err.message });
    });
}

function post_master_table(req, res) {
  const { items } = req.body;
  const { table } = req.params;
  const { version } = items[0];

  const dp = dispatcher(table);
  dp.register(version, items)
    .then(() => {
      res.json({ result: 'ok' });
    })
    .catch((err) => {
      res.json(440, { result: 'failed', message: err.message });
    });
}

function post_isUnique_kid(req, res) {
  const { kid } = req.body;
  Kid.isUnique(kid)
    .then((r) => {
      res.json(r);
    });
}

function post_isUniqueIp(req, res) {
  const { ip } = req.body;
  Fenics.isUniqueIp(ip)
    .then((r) => {
      res.json(r);
    })
    .catch((err) => {
      res.json(400, { result: 'fail', message: err.message });
    });
}

function post_isUniqueFenicskey(req, res) {
  const { fenicsKey } = req.body;
  Kid.isUniqueFenicskey(fenicsKey)
    .then((r) => {
      res.json(r);
    })
    .catch((err) => {
      res.json(440, { result: 'fail', err: err.message });
    });
}

function post_isUniqueUserkey(req, res) {
  const { userkey } = req.body;
  Kid.isUniqueUserkey(userkey)
    .then((r) => {
      res.json(r);
    })
    .catch((err) => {
      res.json(440, { result: 'fail', err: err.message });
    });
}

function post_isUniqueDBPass(req, res) {
  const { db_password } = req.body;
  Kid.isUniqueDBPass(db_password)
    .then((r) => {
      res.json(r);
    })
    .catch((err) => {
      res.json(440, { result: 'fail', err: err.message });
    });
}

function post_isUniqueMobileFenicskey(req, res) {
  const { kids_id, fenicsKey } = req.body;
  Mobile.isUniqueFenicskey(kids_id, fenicsKey)
    .then((r) => {
      res.json(r);
    })
    .catch((err) => {
      res.json(440, { result: 'fail', err: err.message });
    });
}

function post_updateLogin(req, res) {
  const { data } = req.body;
  const condition = (data.id) ? { id: data.id } : { id: req.session.uid };

  delete data.id;

  Login.update(data, condition)
    .then(() => {
      res.json({ result: 'success' });
    })
    .catch((err) => {
      res.status(500).send({ result: 'fail', err: err.message });
    });
}

module.exports = {
  get_login,
  post_login,
  get_logout,
  get_root,
  get_tableHeader,
  post_makeLoginAccount,
  post_addMobileClient,
  post_makeUser,
  post_select,
  post_insert,
  post_delete,
  post_update,
  post_column,
  post_addFenicsAccounts,
  post_addClient,
  post_isUnique_kid,
  post_makeMemo,
  post_updateFenics,
  post_updateClient,
  post_addBase,
  post_user,
  post_master_table,
  post_isUniqueIp,
  post_isUniqueFenicskey,
  post_isUniqueMobileFenicskey,
  post_isUniqueUserkey,
  post_isUniqueDBPass,
  post_updateLogin,
};
