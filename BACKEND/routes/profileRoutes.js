const express = require('express');
const router = express.Router();

const {authenticateUser, authorizePermissions} = require('../middleware/authentication');

const {
  getAllProfile,
  getSingleProfile,
  updateProfile,
} = require('../controllers/profileControllers');


router.route('/').get(authenticateUser, authorizePermissions('admin'), getAllProfile);
router.route('/:id').get(authenticateUser, getSingleProfile);
router.route('/updateProfile').patch(authenticateUser, updateProfile);

module.exports = router;