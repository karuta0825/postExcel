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
const Partner = require('../models/tables/Partner');
const History = require('../models/tables/History');
const MemoTemplate = require('../models/tables/MemoTemplate');
const Event = require('../models/tables/Event');
const Column = require('../models/tables/Column');
const AddInfo = require('../models/presentations/AddInfo');

const tableObj = {
  busivs: Busiv,
  clients: Client,
  customers: Customer,
  environments: Environment,
  fenics: Fenics,
  kids: Kid,
  licenses: License,
  login_users: Login,
  login_user: Login,
  memos: Memo,
  mobiles: Mobile,
  servers: Server,
  services: Service,
  partners: Partner,
  historys: History,
  usrHistorys: History,
  memo_templates: MemoTemplate,
  events: Event,
  header: Column,
  all_fenics: Fenics,
  add_info: AddInfo,
};

function dispatcher(table) {
  return tableObj[table];
}

module.exports = {
  dispatcher,
};
