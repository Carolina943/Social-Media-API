const Profile = require('../models/Profile');


const followUser = async (req, res) =>{
   if (req.body._id !== req.params.id) {
    try {
      const user = await Profile.findById(req.params.id);
      const currentUser = await Profile.findById(req.body.id);
      if (!user.followers.includes(req.body._Id)) {
        await user.updateOne({ $push: { followers: req.body.id} });
        await currentUser.updateOne({ $push: { followings: req.params.id } });
        res.status(200).json("profile user has been followed");
      } else {
        res.status(403).json("you already follow this profile");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("you can't follow yourself");
  }
}

const unfollowUser = async (req, res) =>{
  if (req.body._id !== req.params.id) {
    try {
      const user = await Profile.findById(req.params.id);
      const currentUser = await Profile.findById(req.body.id);
      if (!user.followers.includes(req.body._Id)) {
        await user.updateOne({ $pull: { followers: req.body.id } });
        await currentUser.updateOne({ $pull: { followings: req.params.id } });
        res.status(200).json("profile user has been unfollowed");
      } else {
        res.status(403).json("you already unfollow this profile");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("you can't unfollow yourself");
  }
}

module.exports = {
   followUser,
   unfollowUser
}