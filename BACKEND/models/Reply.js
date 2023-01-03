const mongoose = require('mongoose'); 

const ReplySchema = mongoose.Schema({
   user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true,
   },
   
   profile: {
     type: mongoose.Schema.ObjectId,
     ref: 'Profile',
     required: true,
   },
   post:{
     type: mongoose.Schema.ObjectId,
     ref: 'Post',
     required: true,
   },
   comment: {
     type: String,
     required: [true, 'Please provide comment to the post'],
   },
},

{timestamp: true}

); 

module.exports = mongoose.model('Reply', ReplySchema);