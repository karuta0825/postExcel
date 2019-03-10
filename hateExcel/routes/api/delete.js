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
const Service = require('../../models/tables/Service');
const Server = require('../../models/tables/Server');

exports.busiv = (req, res, next) => {
  const { base_id } = req.params;
  Busiv.remove({ base_id })
    .then(r => res.json(r))
    .catch(next);
};

exports.client = (req, res, next) => {
  const { body } = req;
  Client.removes(body)
    .then(r => res.json(r))
    .catch(next);
};

exports.customer = (req, res, next) => {
  const { base_id } = req.params;
  Customer.remove({ base_id })
    .then(r => res.json(r))
    .catch(next);
};

exports.event = (req, res, next) => {
  const { id } = req.params;
  Event.remove({ id })
    .then(r => res.json(r))
    .catch(next);
};

exports.fenics = (req, res, next) => {
  const { body } = req;
  Fenics.removes(body)
    .then(r => res.json(r))
    .catch(next);
};

exports.history = (req, res, next) => {
  const { body } = req;
  History.removes(body)
    .then(r => res.json(r))
    .catch(next);
};

exports.kid = (req, res, next) => {
  const { body } = req;
  Kid.removes(body)
    .then(r => res.json(r))
    .catch(next);
};

exports.memo = (req, res, next) => {
  const { id } = req.params;
  Memo.remove({ id })
    .then(r => res.json(r))
    .catch(next);
};

exports.memoTemplates = (req, res, next) => {
  const { id } = req.params;
  MemoTemplate.remove({ id })
    .then(r => res.json(r))
    .catch(next);
};

// 削除後customerテーブルの値も変更が必要だよね?
exports.mobile = (req, res, next) => {
  const { base_id } = req.params;
  Mobile.remove({ base_id })
    .then(r => res.json(r))
    .catch(next);
};

exports.service = (req, res, next) => {
  const { body } = req;
  Service.removes(body)
    .then(r => res.json(r))
    .catch(next);
};

exports.server = (req, res, next) => {
  const { body } = req;
  Server.removes(body)
    .then(r => res.json(r))
    .catch(next);
};
