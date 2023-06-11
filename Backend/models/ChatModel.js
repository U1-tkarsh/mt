const mongoose = require('mongoose');

const ChatSchema = new mongoose.Schema(
  {
    members: {
      type: Array,
    },
  },
  {
    timestamps: true,
  },
  {
    user_type:String,
  }
);

module.exports = mongoose.model("Chat", ChatSchema);
