const mongoose = require('mongoose')


const PostSchema = new mongoose.Schema({

  user:{
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
  profile:{
    type: mongoose.Schema.ObjectId,
    ref: 'Profile',
    required: true,
  },
  comment:{
    type: String,
    required: true,
  },
  postImage: {
    type: String
  },
  likes:{
    type: Array,
    default: [],
  },
  isAdmin:{
    type: Boolean,
    default: true,
  },
},

{timestamps: true}

);

module.exports = mongoose.model('Post', PostSchema);
