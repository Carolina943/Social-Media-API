const Reply = require('../models/Reply');
const Post = require('../models/Post');


const { StatusCodes} =  require('http-status-codes');
const CustomError = require('../errors');
const { checkPermissions} = require('../utils');

const createReply = async (req, res) =>{
   const {post: postId} = req.body;

   const isValidPost = await Post.findOne({_id: postId});
   
   if(!isValidPost){
      throw new CustomError.NotFoundError(`No post with id: ${postId}`);
   }

   const alreadySubmitted = await Reply.findOne({
       post: postId,
       user: req.user.userId,
   });

   if(alreadySubmitted){
     throw new CustomError.BadRequestError('Already submitted reply for this post');
   }

   req.body.user = req.user.userId;
   const reply = await Reply.create(req.body);
   res.status(StatusCodes.CREATED).json({reply});
};

const getAllReply = async (req, res) =>{
   const reply = await Reply.find({}).populate({
       path: 'post',
       select: 'reply'
   });

   res.status(StatusCodes.OK).json({ reply, count: reply.length});
};

const getSingleReply = async (req, res) =>{
   const {id: replyId} = req.params;
   const reply = await Reply.findOne({_id: replyId});

   if(!reply){
     throw new CustomError.NotFoundError(`No reply with id ${replyId}`);
   }

   res.status(StatusCodes.OK).json({reply})
};

const updateReply = async (req, res) =>{
   const {id: replyId} = req.params;
   const{comment} = req.body;
   const reply = await Reply.findOne({_id: replyId});

   if(!reply){
    throw new CustomError.NotFoundError(`No reply with id ${replyId}`);
   }

   checkPermissions(req.user, reply.user);
   reply.comment = comment;

   await reply.save();
   res.status(StatusCodes.OK).json({msg: 'Success! Review updated'});
};

const deleteReply = async (req, res) => {
   const {id: replyId} = req.params;
   const reply = await Reply.findOne({_id: replyId});

   if(!reply){
     throw new CustomError.NotFoundError(`No reply with id ${replyId}`);
   }

   checkPermissions(req.user, reply.user);
   await reply.remove()
   res.status(StatusCodes.OK).json({msg: 'Success! reply removed'});
};

const getSinglePostReply = async (req, res) =>{
   const {id: postId} = req.params;
   const reply = await Reply.find({post: postId});
   res.status(StatusCodes.OK).json({reply, count: reply.length});
};

module.exports = {
  createReply,
  getAllReply,
  getSingleReply,
  updateReply,
  deleteReply,
  getSinglePostReply,
};

