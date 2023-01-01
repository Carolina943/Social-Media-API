const Profile = require('../models/Profile');
const {StatusCodes} = require('http-status-codes');
const CustomError = require('../errors');
const {createTokenUser, attachCookiesToResponse} = require('../utils');


const getAllProfile = async (req, res) =>{
  res.send('Get All Profile');
};

const getSingleProfile = async (req,res) =>{
  res.send('Get Single Profile');
};

const updateProfile = async (req, res) =>{
  res.send('Update Profile');
};

module.exports = {
  getAllProfile,
  getSingleProfile,
  updateProfile,
};