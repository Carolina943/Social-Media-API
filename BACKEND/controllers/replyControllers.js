const Reply = require('../models/Reply');
const Post = require('../models/Post');


const { StatusCodes} =  require('http-status-codes');
const CustomError = require('../errors');
const { checkPermissions} = require('../utils');

const createReply = async (req, res) =>{
   res.send('Create Reply');
};

const getAllReply = async (req, res) =>{
  res.send('Get All Reply');
};

const getSingleReply = async (req, res) =>{
  res.send('Get Single Reply');
};

const updateReply = async (req, res) =>{
  res.send('Update Reply');
};

const deleteReply = async (req, res) => {
  res.send('Delete Reply');
};

const getSinglePostReply = async (req, res) =>{
   res.send('Get Single Post Reply');
};

module.exports = {
  createReply,
  getAllReply,
  getSingleReply,
  updateReply,
  deleteReply,
  getSinglePostReply,
};

