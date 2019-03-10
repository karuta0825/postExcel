const Busiv = require('../../models/tables/Busiv');
const Client = require('../../models/tables/Client');
const Customer = require('../../models/tables/Customer');
const Environment = require('../../models/tables/Environment');
const Fenics = require('../../models/tables/Fenics');
const Kid = require('../../models/tables/Kid');
const License = require('../../models/tables/License');
const Memo = require('../../models/tables/Memo');
const MemoTemplate = require('../../models/tables/MemoTemplate');
const Partner = require('../../models/tables/Partner');
const History = require('../../models/tables/History');
const Mobile = require('../../models/tables/Mobile');
const Server = require('../../models/tables/Server');
const Service = require('../../models/tables/Service');
const Column = require('../../models/tables/Column');
const AddInfo = require('../../models/presentations/AddInfo');
const Event = require('../../models/tables/Event');
const Login = require('../../models/tables/Login');

exports.kid = (req, res, next) => {
  const { kids_id } = req.params;
  Kid.select(kids_id)
    .then((r) => {
      res.json(r);
    })
    .catch(next);
};

exports.kidBykid = (req, res, next) => {
  const { kid } = req.params;
  Kid.selectByKid(kid)
    .then((r) => {
      res.json(r);
    })
    .catch(next);
};

exports.clients = (req, res, next) => {
  const { kids_id } = req.params;
  Client.select(kids_id)
    .then((r) => {
      res.json(r);
    })
    .catch(next);
};

exports.busivs = (req, res, next) => {
  const { kids_id } = req.params;
  Busiv.select(kids_id)
    .then((r) => {
      res.json(r);
    })
    .catch(next);
};

exports.fenics = (req, res, next) => {
  const { kids_id } = req.params;
  Fenics.select(kids_id)
    .then((r) => {
      res.json(r);
    })
    .catch(next);
};

exports.customers = (req, res, next) => {
  const { kids_id } = req.params;
  Customer.select(kids_id)
    .then((r) => {
      res.json(r);
    })
    .catch(next);
};

exports.license = (req, res, next) => {
  const { kids_id } = req.params;
  License.select(kids_id)
    .then((r) => {
      res.json(r);
    })
    .catch(next);
};

exports.memos = (req, res, next) => {
  const { kids_id } = req.params;
  Memo.select(kids_id)
    .then((r) => {
      res.json(r);
    })
    .catch(next);
};

exports.mobile = (req, res, next) => {
  const { kids_id } = req.params;
  Mobile.select(kids_id)
    .then((r) => {
      res.json(r);
    })
    .catch(next);
};

exports.partners = (req, res, next) => {
  const { kids_id } = req.params;
  Partner.select(kids_id)
    .then((r) => {
      res.json(r);
    })
    .catch(next);
};

exports.historys = (req, res, next) => {
  const { kids_id } = req.params;
  const { page } = req.query;
  if (page) {
    History.fetchLatestTenHistorys(page)
      .then((r) => {
        res.json(r);
      })
      .catch(next);
    return;
  }

  History.select(kids_id)
    .then((r) => {
      res.json(r);
    })
    .catch(next);
};

exports.environments = (req, res, next) => {
  Environment.select()
    .then((r) => {
      res.json(r);
    })
    .catch(next);
};

exports.memoTemplates = (req, res, next) => {
  MemoTemplate.select()
    .then((r) => {
      res.json(r);
    })
    .catch(next);
};

exports.servers = (req, res, next) => {
  Server.select()
    .then((r) => {
      res.json(r);
    })
    .catch(next);
};

exports.services = (req, res, next) => {
  Service.select()
    .then((r) => {
      res.json(r);
    })
    .catch(next);
};

exports.column = (req, res, next) => {
  const { uid } = req.session;
  Column.select(null, uid)
    .then((r) => {
      res.json(r);
    })
    .catch(next);
};

exports.events = (req, res, next) => {
  const { yearMonth } = req.params;
  // yearMonthの型チェックが必要
  Event.select(yearMonth)
    .then((r) => {
      res.json(r);
    })
    .catch(next);
};

exports.accounts = (req, res, next) => {
  Login.select()
    .then((r) => {
      res.json(r);
    })
    .catch(next);
};

exports.availableUsers = (req, res, next) => {
  Server.getAvailableUser()
    .then((r) => {
      res.json(r);
    })
    .catch(next);
};

exports.environmentFindTypeVersion = (req, res, next) => {
  const { id } = req.params;
  Environment.findById(id)
    .then((r) => {
      res.json(r);
    })
    .catch(next);
};

exports.environmentFindId = (req, res, next) => {
  const { system_type, version } = req.params;
  Environment.findId({ system_type, version })
    .then(r => res.json(r))
    .catch(next);
};

exports.addInfo = (req, res, next) => {
  const { yearMonth } = req.params;
  AddInfo.select(yearMonth)
    .then(r => res.json(r))
    .catch(next);
};

exports.isUniqueFenicsIp = (req, res, next) => {
  const { ip } = req.params;
  Fenics.isUniqueIp(ip)
    .then(r => res.json(r))
    .catch(next);
};

exports.isUniqueKid = (req, res, next) => {
  const { kid } = req.params;
  Kid.isUnique(kid)
    .then(r => res.json(r))
    .catch(next);
};

exports.isUniqueFenicskey = (req, res, next) => {
  const { fenicskey } = req.params;
  Kid.isUniqueFenicskey(fenicskey)
    .then(r => res.json(r))
    .catch(next);
};

exports.isUniqueUserkey = (req, res, next) => {
  const { userkey } = req.params;
  Kid.isUniqueUserkey(userkey)
    .then(r => res.json(r))
    .catch(next);
};

exports.isUniqueDbpassword = (req, res, next) => {
  const { dbpassword } = req.params;
  Kid.isUniqueDbPassword(dbpassword)
    .then(r => res.json(r))
    .catch(next);
};

exports.isUniqueMobileFenicskey = (req, res, next) => {
  const { fenicskey } = req.params;
  Mobile.isUniqueFenicskey(fenicskey)
    .then(r => res.json(r))
    .catch(next);
};
