// レコード更新
const Busiv = require('../../models/tables/Busiv');
const Client = require('../../models/tables/Client');
const Customer = require('../../models/tables/Customer');
const Fenics = require('../../models/tables/Fenics');
const Kid = require('../../models/tables/Kid');
const License = require('../../models/tables/License');
const Memo = require('../../models/tables/Memo');
const MemoTemplate = require('../../models/tables/MemoTemplate');
const Partner = require('../../models/tables/Partner');
const Mobile = require('../../models/tables/Mobile');
const Column = require('../../models/tables/Column');
const Event = require('../../models/tables/Event');
const Login = require('../../models/tables/Login');
const Service = require('../../models/tables/Service');
const Server = require('../../models/tables/Server');

exports.busiv = (req, res, next) => {
  const { base_id } = req.params;
  const { body } = req;
  Busiv.update(body, { base_id })
    .then(r => res.json(r))
    .catch(next);
};

exports.client = (req, res, next) => {
  const { body } = req;
  Client.updates(body)
    .then(r => res.json(r))
    .catch(next);
};

exports.customer = (req, res, next) => {
  const { base_id } = req.params;
  const { body } = req;
  Customer.update(body, { base_id })
    .then(r => res.json(r))
    .catch(next);
};

exports.event = (req, res, next) => {
  const { id } = req.params;
  const { body } = req;
  Event.update(body, { id })
    .then(r => res.json(r))
    .catch(next);
};

exports.column = (req, res, next) => {
  const { uid } = req.session;
  const { body } = req;
  Column.update(body, { uid })
    .then(r => res.json(r))
    .catch(next);
};

exports.fenics = (req, res, next) => {
  const { body } = req;
  Fenics.updates(body)
    .then(r => res.json(r))
    .catch(next);
};

exports.kid = (req, res, next) => {
  const { kids_id } = req.params;
  const { body } = req;
  Kid.update(body, { kids_id })
    .then(r => res.json(r))
    .catch(next);
};

exports.licenses = (req, res, next) => {
  const { kids_id } = req.params;
  const { body } = req;
  License.update(body, { kids_id })
    .then(r => res.json(r))
    .catch(next);
};

exports.memo = (req, res, next) => {
  const { id } = req.params;
  const { body } = req;
  Memo.update(body, { id })
    .then(r => res.json(r))
    .catch(next);
};

exports.memoTemplate = (req, res, next) => {
  const { id } = req.params;
  const { body } = req;
  MemoTemplate.update(body, { id })
    .then(r => res.json(r))
    .catch(next);
};

exports.mobile = (req, res, next) => {
  const { base_id } = req.params;
  const { body } = req;
  Mobile.update(body, { base_id })
    .then(r => res.json(r))
    .catch(next);
};

exports.partner = (req, res, next) => {
  const { kids_id } = req.params;
  const { body } = req;
  Partner.update(body, { kids_id })
    .then(r => res.json(r))
    .catch(next);
};

exports.userInfo = (req, res, next) => {
  const id = req.session.uid;
  const { body } = req;
  Login.update(body, { id })
    .then(r => res.json(r))
    .catch(next);
};

exports.services = (req, res, next) => {
  const { body } = req;
  Service.updates(body)
    .then(r => res.json(r))
    .catch(next);
};

exports.servers = (req, res, next) => {
  const { body } = req;
  Server.updates(body)
    .then(r => res.json(r))
    .catch(next);
};
