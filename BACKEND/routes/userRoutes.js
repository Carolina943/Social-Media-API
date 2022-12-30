const express = require('express');
const router = express.Router();

const {authenticateUser} = require('../middleware/authentication');

const {
  showCurrentUser,
  updateUser,
  updateUserPassword
} = require('../controllers/userControllers');



router.route('/showMe').get(authenticateUser, showCurrentUser);
router.route('/updateUser').patch(authenticateUser, updateUser);
router.route('/updateUserPassword').patch(authenticateUser, updateUserPassword);

module.exports = router;