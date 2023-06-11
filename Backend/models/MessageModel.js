const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema(
  {
    orderId: {
      type: Object,
      required: true
    },

    chatId_from: String,

    senderId_to: String,

    price: {
      type: Number,
      float: true
    },

    quantity: {
      type: Number,
      // required: true
    },

    address: String,

    transporter: String
  },
  
  {
    timestamps: true,
    

  }
);



module.exports = mongoose.model("MessageModel", MessageSchema);
