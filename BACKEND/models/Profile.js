const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({

  user:{
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
  profileImage:{
    type: String,
    default: '/uploads/example.jpeg',
  },
  adress:{
    type: String,
    required: true,
  },
  profile_view: {
    type: Number,
    default: 0,
  },
  social_media:{
    type: Array,
    default: [],
  },
  followers:{
    type: Array,
    default: [],
  },

  followings:{
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

module.exports = mongoose.model('Profile', ProfileSchema);