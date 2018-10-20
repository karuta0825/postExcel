// レコード削除
const Busiv = require('../../models/tables/Busiv');
const Client = require('../../models/tables/Client');
const Customer = require('../../models/tables/Customer');
const Fenics = require('../../models/tables/Fenics');
const Kid = require('../../models/tables/Kid');
const Memo = require('../../models/tables/Memo');
const MemoTemplate = require('../../models/tables/MemoTemplate');
const History = require('../../models/tables/History');
const Mobile = require('../../models/tables/Mobile');
const Event = require('../../models/tables/Event');


exports.busiv = (req, res) => {
  const { base_id } = req.params;
  Busiv.remove({ base_id })
    .then(r => res.json(r));
};

exports.client = (req, res) => {
  const { client_id } = req.params;
  Client.remove({ client_id })
    .then(r => res.json(r));
};

exports.customer = (req, res) => {
  const { base_id } = req.params;
  Customer.remove({ base_id })
    .then(r => res.json(r));
};

exports.event = (req, res) => {
  const { id } = req.params;
  Event.remove({ id })
    .then(r => res.json(r));
};

exports.fenics = (req, res) => {
  const { fenics_id } = req.params;
  Fenics.remove({ fenics_id })
    .then(r => res.json(r));
};

exports.history = (req, res) => {
  const { id } = req.param;
  History.remove({ id })
    .then(r => res.json(r));
};

exports.kid = (req, res) => {
  const { kids_id } = req.params;
  Kid.remove({ kids_id })
    .then(r => res.json(r));
};

exports.memo = (req, res) => {
  const { id } = req.params;
  Memo.remove({ id })
    .then(r => res.json(r));
};

exports.memoTemplates = (req, res) => {
  const { id } = req.params;
  MemoTemplate.remove({ id })
    .then(r => res.json(r));
};

// 削除後customerテーブルの値も変更が必要だよね?
exports.mobile = (req, res) => {
  const { base_id } = req.params;
  Mobile.remove({ base_id })
    .then(r => res.json(r));
};
