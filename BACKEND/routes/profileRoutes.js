const express = require('express');
const router = express.Router();

const {authenticateUser, authorizePermissions} = require('../middleware/authentication');

const {
  createProfile,
  getAllProfile,
  getSingleProfile,
  updateProfile,
  profileImage,
  showCurrentProfile
} = require('../controllers/profileControllers');



router
.route('/')
.post([authenticateUser, authorizePermissions('admin')], createProfile)
.get(getAllProfile);

router
.route('/showMeProfile')
.get(authenticateUser, showCurrentProfile);


router
.route('/profileImage')
.post([authenticateUser, authorizePermissions('admin')], profileImage);

router
.route('/:id')
.get(getSingleProfile)
.patch([authenticateUser, authorizePermissions('admin')], updateProfile);





module.exports = router;