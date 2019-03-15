var express = require("express");
var router = express.Router();
var discountsJSON = require("../data/discounts");

/* GET users listing. */
router.get("/discounts", function(req, res, next) {
  res.send(discountsJSON);
});

module.exports = router;
