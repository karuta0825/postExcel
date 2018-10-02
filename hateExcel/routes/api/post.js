// レコード挿入
const Login = require('../../models/tables/Login');

exports.auth = (req, res) => {
  const { body } = req;
  return Login.authenticate(body)
    .then((r) => {
      if (r !== null) {
        req.session.pass = true;
        req.session.uid = r.id;
        res.json({ result: 'success' });
      }
      res.json({ result: 'fail' });
    });
};