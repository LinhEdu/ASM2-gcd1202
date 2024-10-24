var express = require('express');
var router = express.Router();
var display_admin_page = require('../controllers/get_admins_controller')

/* GET /admins page. */
router.get('/', function(req, res, next) {
  display_admin_page(req, res);
});
/* POST /admins page. */
router.post('/', function(req, res, next) {
  console.log(req.body);
  display_admin_page(req, res);
});
module.exports = router;

