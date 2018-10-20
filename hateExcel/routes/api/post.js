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

exports.auth = (req, res) => {
  const { body } = req;
  return Login.authenticate(body)
    .then((r) => {
      if (r !== null) {
        req.session.pass = true;
        req.session.uid = r.id;
        res.json({ result: req.session });
      }
      res.json({ result: 'fail' });
    });
};

exports.clientAdd = (req, res) => {
  const { kids_id } = req.params;
  const { uid } = req.session;
  Client.makeid(kids_id, uid)
    .then(r => res.json(r));
};

exports.customerAdd = (req, res) => {
  const { kids_id } = req.params;
  Customer.addRow(kids_id)
    .then(r => res.json(r));
};

exports.eventAdd = (req, res) => {
  const { data } = req.body;
  Event.addRow(data)
    .then(r => res.json(r));
};

exports.fenicsAdd = (req, res) => {
  const { kids_id } = req.params;
  const { data } = req.body;
  Fenics.makeUser(kids_id, data.is_mobile)
    .then(r => res.json(r));
};

exports.historyAdd = (req, res) => {
  const { data } = req.body;
  History.addRow(data)
    .then(r => res.json(r));
};

exports.memoAdd = (req, res) => {
  const { data } = req.body;
  Memo.addRow(data)
    .then(r => res.json(r));
};

exports.kidAdd = (req, res) => {
  const { data } = req.body;
  Kid.addRow(data)
    .then(r => res.json(r));
};

exports.memoTemplateAdd = (req, res) => {
  const { data } = req.body;
  MemoTemplate.addRow(data)
    .then(r => res.json(r));
};

exports.mobileAdd = (req, res) => {
  const { data } = req.body;
  const { kids_id, base_id, fenics_key } = data;
  Mobile.addRow(kids_id, base_id, fenics_key)
    .then(r => res.json(r));
};

exports.servers = (req, res) => {
  const { version, params } = req.body;
  Server.register(version, params)
    .then(r => res.json(r));
};

exports.services = (req, res) => {
  const { version, params } = req.body;
  Service.register(version, params)
    .then(r => res.json(r));
};

exports.loginUserAdd = (req, res) => {
  const { uid } = req.session;
  const { name, password } = req.body;
  Login.addRow({ uid, name, password })
    .then(r => res.json(r));
};
