const mongoose = require('mongoose');


const UserSchema = mongoose.Schema(
  {
    email:{
      type:String,
      required:true,

    },
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
   
    address:{
        type:String,
        required:true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
   profilePicture: String,
   
    role:{
      type:String,
      required:true,
    }
   
  },
  { timestamps: true }
);

module.exports = mongoose.model("Users", UserSchema);
