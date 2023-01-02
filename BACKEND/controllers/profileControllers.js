const Profile = require('../models/Profile');
const User = require('../models/User')
const {StatusCodes} = require('http-status-codes');
const CustomError = require('../errors');
const path = require('path');
const { findById } = require('../models/Profile');
const { profile } = require('console');

 const createProfile = async (req, res) =>{
   req.body.user = req.user.userId;
   const profile = await Profile.create(req.body);
   res.status(StatusCodes.CREATED).json({profile});
 };

const getAllProfile = async (req, res) =>{
  const profile = await Profile.find({});
  res.status(StatusCodes.OK).json({profile, count: profile.length});
};

const getSingleProfile = async (req,res) =>{
  const {id: profileId} = req.params;
  const profile = await Profile.findOne({_id: profileId});
  if(!profile){
    throw new CustomError.NotFoundError(`No profile with id: ${profileId}`);
  }
  res.status(StatusCodes.OK).json({ profile });
};

const updateProfile = async (req, res) =>{
  const {id: profileId} = req.params;
  const profile = await Profile.findOneAndUpdate({_id: profileId}, req.body, {
    new: true,
    runValidators: true, 
  });
  if(!profile){
    throw new CustomError.NotFoundError(`No product with id: ${profileId}`);
  };
 res.status(StatusCodes.OK).json({ profile });
};

const profileImage = async(req,res) =>{
  if(!req.files){
    throw new CustomError.BadRequestError('No File Uploaded');
  }
  const profileImage = req.files.image;
  if(!profileImage.mimetype.startsWith('image')){
    throw new CustomError.BadRequestError('Please Upload Image');
  }
  const maxSize = 400*400;
  if(profileImage.size > maxSize){
    throw new CustomError.BadRequestError(
     'Please upload profile image smaller than 1MB'
    );
  }
  const imagePath = path.join(
    __dirname,
    '../public/uploads' + `${profileImage.name}`
  );
  await profileImage.mv(imagePath);
  res.status(StatusCodes.OK).json({ image: `/public/uploads/${profileImage.name}`});
};

const followUser = async (req, res) =>{
  if(req.body.userId != req.params.id)
  {
     
    try{
       const user = await User.findById(req.params.id)
       const currentUser = await User.findById(req.body.userId)

       if(!user.followers.includes(req.body.userId)){
         await user.updateOne({ $push: {followers: req.body.userId} })
         await currentUser.updateOne({$push: {followings: req.params.id} })

         res.status(200).json('User has been followed');
       } else {
         res.status(403).json('You already followed this user')
       }
     }catch(error){
        res.status(500).json(error)
     }
  }else{
    res.status(403).json('Action forbidden');
  }
}

module.exports = {
  createProfile,
  getAllProfile,
  getSingleProfile,
  updateProfile,
  profileImage,
  followUser
};