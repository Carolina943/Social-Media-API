const express = require('express');
const router = express.Router();
const {
  authenticateUser,
  authorizePermissions,
} = require('../middleware/authentication');

const {
  createPost,
  getAllPost,
  getSinglePost,
  updatePost,
  deletePost,
  uploadImage,
} = require('../controllers/postControllers');

const {getSinglePostReply} = require('../controllers/replyControllers');

router
.route('/')
.post([authenticateUser, authorizePermissions('admin')], createPost)
.get(getAllPost);

router
.route('/uploadImage')
.post([authenticateUser, authorizePermissions('admin')], uploadImage);

router
.route('/:id')
.get(getSinglePost)
.patch([authenticateUser, authorizePermissions('admin')], updatePost)
.delete([authenticateUser, authorizePermissions('admin')], deletePost);


router
.route('/:id/reply').get(getSinglePostReply);

module.exports = router;
