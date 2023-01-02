const express = require('express');
const router = express.Router();

const {
   followUser,
   unfollowUser,
} = require('../controllers/followControllers');

router.route('/:id').put(followUser);
router.route('/:id/unfollow').put(unfollowUser);

module.exports = router;