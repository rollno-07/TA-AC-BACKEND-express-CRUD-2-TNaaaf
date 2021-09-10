var express = require('express');
var router = express.Router();
var Article=require("../models/article")

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('blog');
});









module.exports = router;
