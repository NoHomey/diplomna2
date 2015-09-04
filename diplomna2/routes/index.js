var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/hellow', function(req, res, next) {
  res.send({hellow : 'hellow'});
});

module.exports = router;
