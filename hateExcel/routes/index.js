
const handler = require('./handler');

function setRoute(app) {
  app.get('/', handler.method );
  app.get('/login', handler.method );
  app.post('/login', handler.method );
  app.get('/logout', handler.method );
  app.post('/makeLoginAccount', handler.method );
  app.post('/all', handler.method );
  app.post('/select', handler.method );
  app.post('/columns', handler.method );
  app.post('/insert', handler.method );
  app.post('/addFenicsAccounts', handler.method );
  app.post('/addClient', handler.method );
  app.post('/addMobileClient', handler.method );
  app.post('/makeUser', handler.post_makeUser );
  app.post('/addBase', handler.method );
  app.post('/makeMemo', handler.method );
  app.post('/delete', handler.method );
  app.post('/update', handler.method );
  app.post('/isUnique/kid', handler.method );
  app.post('/isUniqueIp', handler.method );
  app.post('/isUniqueFenicsKey', handler.method );
  app.post('/isUniqueUserKey', handler.method );
  app.post('/isUniqueDBPass', handler.method );
  app.post('/updateFenics', handler.method );
  app.post('/updateClient', handler.method );
  app.post('/user', handler.method );
  app.post('/master/:table', handler.method );
  app.post('/updateLogin', handler.method );
}

module.exports = {
  setRoute : setRoute
};