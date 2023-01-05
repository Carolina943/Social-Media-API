const Post = require('../models/Post');
const {StatusCodes} = require('http-status-codes');
const CustomError = require('../errors');
const path = require('path');


const createPost = async (req,res) =>{
   req.body.user = req.user.userId;
   const post = await Post.create(req.body);
   res.status(StatusCodes.CREATED).json({post});
};

const getAllPost = async (req, res) =>{
  const post = await Post.find({});
  res.status(StatusCodes.OK).json({post, count: post.length});
};

const getSinglePost = async (req, res) =>{
   const {id: postId} = req.params;
   const post = await Post.findOne({_id: postId});
   if(!post){
     throw new CustomError.NotFoundError(`No post with id: ${postId}`);
   }
   res.status(StatusCodes.OK).json({post});
}; 

const updatePost = async (req,res) =>{
   const {id: postId} = req.params;
   const post = await Post.findOneAndUpdate({_id: postId}, req.body, {
      new: true,
      runValidators: true,
   });
   if(!post){
     throw new CustomError.NotFoundError(`No post with id: ${postId}`);
   };
  res.status(StatusCodes.OK).json({post});
};

const deletePost = async (req, res)=>{
  const {id: postId} = req.params;
  const post = await Post.findOne({_id: postId});

  if(!post){
    throw new CustomError.NotFoundError(`No post with id: ${postId}`);
  }
  await post.remove();
  res.status(StatusCodes.OK).json({msg: 'Success! Post removed.'})
};

const uploadImage = async (req, res) =>{
  if(!req.files){
    throw new CustomError.BadRequestError('No File Uploaded');
  }
  const postImage = req.files.image;
  if(!postImage.mimetype.startsWith('image')){
    throw new CustomError.BadRequestError('Please Upload Image');
  }
  const maxSize = 280*150;

  if(postImage.size > maxSize){
    throw new Custom.BadRequestError(
      'Please upload image smaller than 1MB'
    );
  }
  const imagePath = path.join(
    __dirname,
    '../public/uploads' + `${postImage.name}`
  );
  await postImage.mv(imagePath);
  res.status(StatusCodes.OK).json({ image:`/public/uploads/${postImage.name}` });
};

const likePost = async (req, res)=>{
   const post = await Post.findById(req.params.id);
   
   if(!post){
    throw new CustomError.NotFoundError(`No post with id: ${postId}`);
  }

   if(!post.likes.includes(req.body.userId)){
      await post.updateOne({$push: {likes: req.body.userId}});
   }
    res.status(StatusCodes.OK).json('The post has been liked');
};

 
const dislikePost = async (req, res) =>{
   const post = await Post.findById(req.params.id);

   if(!post){
     throw new CustomError.NotFoundError(`No post with id: ${post}`);
   }

   if(post.likes.includes(req.body.userId)){
     await post.updateOne({$pull: {likes: req.body.userId}});
   }
   res.status(StatusCodes.OK).json('The post has been disliked')
}

module.exports = {
  createPost,
  getAllPost,
  getSinglePost,
  updatePost,
  deletePost,
  uploadImage,
  likePost,
  dislikePost,
};