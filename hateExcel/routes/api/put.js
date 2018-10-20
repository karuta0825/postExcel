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

exports.busiv = (req, res) => {
  const { base_id } = req.params;
  const { data } = req.body;
  Busiv.update(data, { base_id })
    .then(r => res.json(r));
};

exports.client = (req, res) => {
  const { client_id } = req.params;
  const { data } = req.body;
  Client.update(data, client_id)
    .then(r => res.json(r));
};

exports.customer = (req, res) => {
  const { base_id } = req.params;
  const { data } = req.body;
  Customer.update(data, { base_id })
    .then(r => res.json(r));
};

exports.event = (req, res) => {
  const { id } = req.params;
  const { data } = req.body;
  Event.update(data, { id })
    .then(r => res.json(r));
};

exports.column = (req, res) => {
  const { uid } = req.session;
  const { data } = req.body;
  Column.update(data, { uid })
    .then(r => res.json(r));
};

exports.fenics = (req, res) => {
  const { fenics_id } = req.param;
  const { data } = req.body;
  Fenics.update(data, fenics_id)
    .then(r => res.json(r));
};

exports.kid = (req, res) => {
  const { kids_id } = req.params;
  const { data } = req.body;
  Kid.update(data, { kids_id })
    .then(r => res.json(r));
};

exports.licenses = (req, res) => {
  const { kids_id } = req.params;
  const { data } = req.body;
  License.update(data, { kids_id })
    .then(r => res.json(r));
};

exports.memo = (req, res) => {
  const { id } = req.params;
  const { data } = req.body;
  Memo.update(data, { id })
    .then(r => res.json(r));
};

exports.memoTemplate = (req, res) => {
  const { id } = req.params;
  const { data } = req.body;
  MemoTemplate.update(data, { id })
    .then(r => res.json(r));
};

exports.mobile = (req, res) => {
  const { base_id } = req.params;
  const { data } = req.body;
  Mobile.update(data, { base_id })
    .then(r => res.json(r));
};

exports.partner = (req, res) => {
  const { kids_id } = req.params;
  const { data } = req.body;
  Partner.update(data, { kids_id })
    .then(r => res.json(r));
};

exports.userInfo = (req, res) => {
  const id = req.session.uid;
  const { data } = req.body;
  Login.update(data, { id })
    .then(r => res.json(r));
};
