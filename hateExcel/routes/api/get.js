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


exports.kid = (req, res) => {
  const { kids_id } = req.params;
  Kid.select(kids_id)
    .then((r) => {
      res.json(r);
    });
};

exports.kidBykid = (req, res) => {
  const { kid } = req.params;
  Kid.selectByKid(kid)
    .then((r) => {
      res.json(r);
    });
};


exports.clients = (req, res) => {
  const { kids_id } = req.params;
  Client.select(kids_id)
    .then((r) => {
      res.json(r);
    });
};

exports.busivs = (req, res) => {
  const { kids_id } = req.params;
  Busiv.select(kids_id)
    .then((r) => {
      res.json(r);
    });
};

exports.fenics = (req, res) => {
  const { kids_id } = req.params;
  Fenics.select(kids_id)
    .then((r) => {
      res.json(r);
    });
};

exports.customers = (req, res) => {
  const { kids_id } = req.params;
  Customer.select(kids_id)
    .then((r) => {
      res.json(r);
    });
};

exports.license = (req, res) => {
  const { kids_id } = req.params;
  License.select(kids_id)
    .then((r) => {
      res.json(r);
    });
};

exports.memos = (req, res) => {
  const { kids_id } = req.params;
  Memo.select(kids_id)
    .then((r) => {
      res.json(r);
    });
};

exports.mobile = (req, res) => {
  const { kids_id } = req.params;
  Mobile.select(kids_id)
    .then((r) => {
      res.json(r);
    });
};

exports.partners = (req, res) => {
  const { kids_id } = req.params;
  Partner.select(kids_id)
    .then((r) => {
      res.json(r);
    });
};

exports.historys = (req, res) => {
  const { kids_id } = req.params;
  History.select(kids_id)
    .then((r) => {
      res.json(r);
    });
};

exports.environments = (req, res) => {
  Environment.select()
    .then((r) => {
      res.json(r);
    });
};

exports.memoTemplates = (req, res) => {
  MemoTemplate.select()
    .then((r) => {
      res.json(r);
    });
};

exports.servers = (req, res) => {
  Server.select()
    .then((r) => {
      res.json(r);
    });
};

exports.services = (req, res) => {
  Service.select()
    .then((r) => {
      res.json(r);
    });
};

exports.column = (req, res) => {
  const { uid } = req.session;
  Column.select(null, uid)
    .then((r) => {
      res.json(r);
    });
};

exports.events = (req, res) => {
  const { yearMonth } = req.params;
  // yearMonthの型チェックが必要
  Event.select(yearMonth)
    .then((r) => {
      res.json(r);
    });
};

exports.availableUsers = (req, res) => {
  Server.getAvailableUser()
    .then((r) => {
      res.json(r);
    });
};

exports.environmentFindTypeVersion = (req, res) => {
  const { id } = req.params;
  Environment.findById(id)
    .then((r) => {
      res.json(r);
    });
};

exports.environmentFindId = (req, res) => {
  const { system_type, version } = req.params;
  Environment.findId({ system_type, version })
    .then(r => res.json(r));
};


exports.addInfo = (req, res) => {
  const { yearMonth } = req.params;
  AddInfo.select(yearMonth)
    .then(r => res.json(r));
};

exports.isUniqueFenicsIp = (req, res) => {
  const { ip } = req.params;
  Fenics.isUniqueIp(ip)
    .then(r => res.json(r));
};

exports.isUniqueKid = (req, res) => {
  const { kid } = req.params;
  Kid.isUnique(kid)
    .then(r => res.json(r));
};

exports.isUniqueFenicskey = (req, res) => {
  const { fenicskey } = req.params;
  Kid.isUniqueFenicskey(fenicskey)
    .then(r => res.json(r));
};

exports.isUniqueUserkey = (req, res) => {
  const { userkey } = req.params;
  Kid.isUniqueUserkey(userkey)
    .then(r => res.json(r));
};

exports.isUniqueDbpassword = (req, res) => {
  const { dbpassword } = req.params;
  Kid.isUniqueDbPassword(dbpassword)
    .then(r => res.json(r));
};

exports.isUniqueMobileFenicskey = (req, res) => {
  const { fenicskey } = req.params;
  Mobile.isUniqueFenicskey(fenicskey)
    .then(r => res.json(r));
};

