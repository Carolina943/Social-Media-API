const Post = require('../models/Post');


const createPost = async (req,res) =>{
  res.send('Create Post');
};

const getAllPost = async (req, res) =>{
res.send('Get All Post');
};

const getSinglePost = async (req, res) =>{
 res.send('Get Single Post');
}; 

const updatePost = async (req,res) =>{
   res.send('Update Post');
};

const deletePost = async (req, res)=>{
  res.send('Delete Post');
};

const uploadImage = async (req, res) =>{
  res.send('Upload Image');
};

module.exports = {
  createPost,
  getAllPost,
  getSinglePost,
  updatePost,
  deletePost,
  uploadImage,
};