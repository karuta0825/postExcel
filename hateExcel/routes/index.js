
/*
 * GET home page.
 */

var fs = require('fs');
var file;

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

exports.upload = function ( req, res ) {
  // req.filesのあとは、inputのname属性名が入る
  var tmp_path = req.files.upload.path;
  var target_path = './uploads/' + req.files.upload.name;
  console.log( req.files.upload );
  console.log( tmp_path );
  console.log( target_path );
  fs.rename(tmp_path, target_path, function(err) {
    if (err) throw err;

    var obj = JSON.parse(fs.readFileSync(target_path, 'utf8'));
    console.log( obj[0] );

    res.send('File uploaded to: ' + target_path + ' - ' + req.files.upload.size + ' bytes');
  });
};