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
const History = require('../../models/tables/History');
const utils = require('../../routes/utils');

exports.busiv = async (req, res, next) => {
  try {
    const { base_id } = req.params;
    const { body } = req;

    const convertMap = Busiv.itemNames;
    const [oldObj] = await Busiv.selectByBaseId(base_id);
    const list = utils.createDiffList({
      kids_id: oldObj.kids_id,
      content_name: 'ビジV',
      convertTable: convertMap,
      oldObj,
      newObj: JSON.parse(body.information),
      create_user_id: 1,
    });

    const r = await Busiv.update(body, { base_id });

    for (let i = 0; i < list.length; i += 1) {
      await History.addRow(list[i]);
    }

    res.json(r);
  } catch (e) {
    next(e);
  }
};

exports.client = (req, res, next) => {
  const { body } = req;
  Client.updates(body)
    .then(r => res.json(r))
    .catch(next);
};

exports.customer = async (req, res, next) => {
  try {
    const { base_id } = req.params;
    const { body } = req;

    const convertMap = Customer.itemNames;
    const [oldObj] = await Customer.selectByBaseId(base_id);
    const list = utils.createDiffList({
      kids_id: oldObj.kids_id,
      content_name: '拠点情報',
      convertTable: convertMap,
      oldObj,
      newObj: body,
      create_user_id: 1,
    });

    const r = await Customer.update(body, { base_id });
    for (let i = 0; i < list.length; i += 1) {
      await History.addRow(list[i]);
    }

    res.json(r);
  } catch (e) {
    next(e);
  }
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

exports.kid = async (req, res, next) => {
  try {
    const { kids_id } = req.params;
    const { body } = req;
    const [oldObj] = await Kid.select(kids_id);
    oldObj.kid = oldObj.kid.replace(/[^0-9]/g, '');
    const convertMap = Kid.itemNames;
    const list = utils.createDiffList({
      kids_id,
      content_name: 'システム情報',
      convertTable: convertMap,
      oldObj,
      newObj: body,
      create_user_id: 1,
    });
    const r = await Kid.update(body, { id: kids_id });
    for (let i = 0; i < list.length; i += 1) {
      await History.addRow(list[i]);
    }

    res.json(r);
  } catch (e) {
    next(e);
  }
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

exports.partner = async (req, res, next) => {
  try {
    const { kids_id } = req.params;
    const { body } = req;
    const convertMap = Partner.itemNames;
    const [oldObj] = await Partner.select(kids_id);
    const list = utils.createDiffList({
      kids_id,
      content_name: 'パートナー',
      convertTable: convertMap,
      oldObj,
      newObj: body,
      create_user_id: 1,
    });

    const r = await Partner.update(body, { kids_id });
    for (let i = 0; i < list.length; i += 1) {
      await History.addRow(list[i]);
    }
    res.json(r);
  } catch (e) {
    next(e);
  }
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
