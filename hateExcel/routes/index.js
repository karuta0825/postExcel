
const handler = require('./handler');
const Get = require('./api/get');
const Post = require('./api/post');
const Put = require('./api/put');
const Delete = require('./api/delete');

function checkSession(req, res, next) {
  if (!req.session.pass) {
    res.json(440, {
      result: 'expired',
      message: 'セッションが切れました。ログインからやり直してください。',
    });
    return;
  }
  next();
}

function isArrayOfRequestBodyData(req, res, next) {
  const { data } = req.body;
  if (Object.prototype.toString.call(data) !== '[object Array]') {
    res.status(500).send({ error: '配列を渡してくれ' });
  }
  next();
}

function setHeader(req, res, next) {
  res.header('Content-Type', 'application/json; charset=utf-8');
  next();
}

// 既存のルーティング情報を設定する
function setRoute(app) {
  app.get('/', handler.get_root);
  app.get('/login', handler.get_login);
  app.get('/logout', handler.get_logout);
  app.get('/tableHeader', checkSession, setHeader, handler.get_tableHeader);
  app.post('/login', handler.post_login);
  app.post('/makeLoginAccount', checkSession, handler.post_makeLoginAccount);
  app.post('/select', checkSession, handler.post_select);
  app.post('/insert', checkSession, isArrayOfRequestBodyData, handler.post_insert);
  app.post('/delete', checkSession, isArrayOfRequestBodyData, handler.post_delete);
  app.post('/update', checkSession, handler.post_update);
  app.post('/columns', checkSession, handler.post_column);
  app.post('/addFenicsAccounts', checkSession, handler.post_addFenicsAccounts);
  app.post('/addClient', checkSession, handler.post_addClient);
  app.post('/addMobileClient', checkSession, handler.post_addMobileClient);
  app.post('/makeUser', checkSession, handler.post_makeUser);
  app.post('/addBase', checkSession, handler.post_addBase);
  app.post('/makeMemo', checkSession, handler.post_makeMemo);
  app.post('/updateFenics', checkSession, isArrayOfRequestBodyData, handler.post_updateFenics);
  app.post('/updateClient', checkSession, isArrayOfRequestBodyData, handler.post_updateClient);
  app.post('/user', checkSession, handler.post_user);
  app.post('/master/:table', checkSession, handler.post_master_table);
  app.post('/updateLogin', checkSession, handler.post_updateLogin);
  app.post('/isUnique/kid', handler.post_isUnique_kid);
  app.post('/isUniqueIp', handler.post_isUniqueIp);
  app.post('/isUniqueFenicsKey', handler.post_isUniqueFenicskey);
  app.post('/isUniqueUserKey', handler.post_isUniqueUserkey);
  app.post('/isUniqueDBPass', handler.post_isUniqueDBPass);
  app.post('/isUniqueMobileFenicskey', handler.post_isUniqueMobileFenicskey);
  return app;
}

// ここに今後APIを準備して移行させていく
function setAPI(app) {
  // authenticate
  app.post('/api/v1/auth', Post.auth);

  // select
  app.get('/api/v1/kids', Get.kidBykid);
  app.get('/api/v1/kids/id', Get.kidBykid);
  app.get('/api/v1/kids/id/:kids_id', Get.kid);
  app.get('/api/v1/kids/:kid', Get.kidBykid);
  app.get('/api/v1/clients/id/:kids_id', Get.clients);
  app.get('/api/v1/busivs/id/:kids_id', Get.busivs);
  app.get('/api/v1/fenics/id/:kids_id', Get.fenics);
  app.get('/api/v1/customers/id/:kids_id', Get.customers);
  app.get('/api/v1/licenses/id/:kids_id', Get.license);
  app.get('/api/v1/memos/id/:kids_id', Get.memos);
  app.get('/api/v1/mobiles/id/:kids_id', Get.mobile);
  app.get('/api/v1/partners/id/:kids_id', Get.partners);
  app.get('/api/v1/historys/id/:kids_id', Get.historys);
  app.get('/api/v1/environments', Get.environments);
  app.get('/api/v1/memoTemplates', Get.memoTemplates);
  app.get('/api/v1/servers', Get.servers);
  app.get('/api/v1/services', Get.services);
  app.get('/api/v1/column', Get.column);
  app.get('/api/v1/events/:yearMonth', Get.events);
  app.get('/api/v1/servers/availableUsers', Get.availableUsers);
  app.get('/api/v1/environments/:id', Get.environmentFindTypeVersion);
  app.get('/api/v1/environments/:system_type/:version', Get.environmentFindId);
  app.get('/api/v1/addInfo/:yearMonth', Get.addInfo);

  // check
  app.get('/api/v1/check/unique/fenics/ip/:ip', Get.isUniqueFenicsIp);
  app.get('/api/v1/check/unique/kids/kid/:kid', Get.isUniqueKid);
  app.get('/api/v1/check/unique/kids/fenicskey/:fenicskey', Get.isUniqueFenicskey);
  app.get('/api/v1/check/unique/kids/userkey/:userkey', Get.isUniqueUserkey);
  app.get('/api/v1/check/unique/kids/dbpassword/:dbpassword', Get.isUniqueDbpassword);
  app.get('/api/v1/check/unique/mobilds/fenicskey/:fenicskey', Get.isUniqueMobileFenicskey);

  // insert
  app.post('/api/v1/clients/:kids_id', Post.clientAdd);
  app.post('/api/v1/customers/:kids_id', Post.customerAdd);
  app.post('/api/v1/fenics/:kids_id', Post.fenicsAdd);
  app.post('/api/v1/events', Post.eventAdd);
  app.post('/api/v1/historys', Post.historyAdd);
  app.post('/api/v1/memos', Post.memoAdd);
  app.post('/api/v1/kids', Post.kidAdd);
  app.post('/api/v1/memoTemplates', Post.memoTemplateAdd);
  app.post('/api/v1/mobiles', Post.mobileAdd);
  app.post('/api/v1/servers', Post.servers);
  app.post('/api/v1/services', Post.services);
  app.post('/api/v1/login', Post.loginUserAdd);

  // update
  app.put('/api/v1/buisvs/:base_id', Put.busiv);
  app.put('/api/v1/clients/:client_id', Put.client);
  app.put('/api/v1/customers/:base_id', Put.customer);
  app.put('/api/v1/events/:id', Put.event);
  app.put('/api/v1/columns/', Put.column);
  app.put('/api/v1/fenics/:fenics_id', Put.fenics);
  app.put('/api/v1/kids/:kids_id', Put.kid);
  app.put('/api/v1/licenses/:kids_id', Put.licenses);
  app.put('/api/v1/memos/:id', Put.memo);
  app.put('/api/v1/memoTemplates/:id', Put.memoTemplate);
  app.put('/api/v1/mobiles/:base_id', Put.mobile);
  app.put('/api/v1/partners/:kids_id', Put.partner);
  app.put('/api/v1/login', Put.userInfo);

  // delete
  // app.delete('/api/v1/buisvs/:base_id', Delete.busiv);
  // app.delete('/api/v1/clients/:kids_id/:client_id', Delete.client);
  // app.delete('/api/v1/customers/:base_id', Delete.customer);
  // app.delete('/api/v1/events/:id', Delete.event);
  // app.delete('/api/v1/fenics/:fenics_id', Delete.fenics);
  // app.delete('/api/v1/historys/:id', Delete.history);
  // app.delete('/api/v1/kids/:kids_id', Delete.kid);
  // app.delete('/api/v1/memos/:id', Delete.memo);
  // app.delete('/api/v1/memoTemplates/:id', Delete.memoTemplates);
  // app.delete('/api/v1/mobiles/:kid_id', Delete.mobile);

  // app.get('/api/v1/clients/:kids_id', (req, res, next) => {
  //   const err = new Error('エラ発生');
  //   err.statusCode = '500';
  //   next(err);
  // });

  return app;
}

module.exports = {
  setRoute,
  setAPI,
};
