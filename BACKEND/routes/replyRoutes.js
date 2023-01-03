const express = require('express');
const router = express.Router();
const {authenticateUser} = require('../middleware/authentication');

const {
  createReply,
  getAllReply,
  getSingleReply,
  updateReply,
  deleteReply
} = require('../controllers/replyControllers');

router
.route('/')
.post(authenticateUser, createReply)
.get(getAllReply);

router
.route('/:id')
.get(getSingleReply)
.patch(authenticateUser, updateReply)

router
.route('/:id')
.get(getSingleReply)
.patch(authenticateUser, updateReply)
.delete(authenticateUser, deleteReply);

module.exports = router;