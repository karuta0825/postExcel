// レコード挿入
const Client = require('../../models/tables/Client');
const Customer = require('../../models/tables/Customer');
const Fenics = require('../../models/tables/Fenics');
const Kid = require('../../models/tables/Kid');
const Memo = require('../../models/tables/Memo');
const MemoTemplate = require('../../models/tables/MemoTemplate');
const History = require('../../models/tables/History');
const Mobile = require('../../models/tables/Mobile');
const Server = require('../../models/tables/Server');
const Service = require('../../models/tables/Service');
const Event = require('../../models/tables/Event');
const Login = require('../../models/tables/Login');
const Environment = require('../../models/tables/Environment');

exports.auth = (req, res, next) => {
  const { body } = req;
  return Login.authenticate(body).then((r) => {
    if (r !== null) {
      req.session.pass = true;
      req.session.uid = r.id;
      res.json({ result: req.session });
    }
    res.json({ result: 'fail' });
  });
};

exports.clientAdd = (req, res, next) => {
  const { kids_id } = req.params;
  const { uid } = req.session;
  Client.makeid(kids_id, uid)
    .then(r => res.json(r))
    .catch(next);
};

exports.customerAdd = (req, res, next) => {
  const { kids_id } = req.params;
  const { body } = req;
  Customer.addRow({ kids_id, ...body })
    .then(r => res.json(r))
    .catch(next);
};

exports.eventAdd = (req, res, next) => {
  const { data } = req.body;
  Event.addRow(data)
    .then(r => res.json(r))
    .catch(next);
};

exports.fenicsAdd = (req, res, next) => {
  const { kids_id } = req.params;
  const { data } = req.body;
  Fenics.makeUser(kids_id, data.is_mobile)
    .then(r => res.json(r))
    .catch(next);
};

exports.historyAdd = (req, res, next) => {
  const { data } = req.body;
  History.addRow(data)
    .then(r => res.json(r))
    .catch(next);
};

exports.memoAdd = (req, res, next) => {
  const { kids_id } = req.params;
  const create_user_id = 1;
  const { body } = req;
  Memo.addRow({ kids_id, ...body, create_user_id })
    .then(r => res.json(r))
    .catch(next);
};

exports.kidAdd = async (req, res, next) => {
  try {
    const { body } = req;
    if (!body.environment_id) {
      body.environment_id = await Environment.findId(body);
    }
    const r = await Kid.addRow(body);
    res.json(r);
  } catch (e) {
    next(e);
  }
};

exports.memoTemplateAdd = (req, res, next) => {
  const { body } = req;
  body.create_user_id = req.session.uid;
  MemoTemplate.addRow(body)
    .then(r => res.json(r))
    .catch(next);
};

exports.mobileAdd = (req, res, next) => {
  const { data } = req.body;
  const { kids_id, base_id, fenics_key } = data;
  Mobile.addRow(kids_id, base_id, fenics_key)
    .then(r => res.json(r))
    .catch(next);
};

exports.servers = (req, res, next) => {
  const { version, params } = req.body;
  Server.register(version, params)
    .then(r => res.json(r))
    .catch(next);
};

exports.services = (req, res, next) => {
  const { body } = req;
  Service.addRow(body)
    .then(r => res.json(r))
    .catch(next);
};

exports.loginUserAdd = (req, res, next) => {
  const { uid } = req.session;
  const { name, password } = req.body;
  Login.addRow({ uid, name, password })
    .then(r => res.json(r))
    .catch(next);
};
