const router = require('express').Router();
const withAuth = require('../Authentication/middleware');
const emailController = require('../Email/emailController');

router.put('/', emailController.sendEmail);
router.get('/checkToken', withAuth, function(req, res) {
  res.sendStatus(200);
});
module.exports = router;
