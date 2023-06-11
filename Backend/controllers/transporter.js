const Message = require("../models/MessageModel")
const { validationResult } = require("express-validator");


// "GET" URL ENDPOINTS



const fetchMessages = async (req, res) => {

  //here i graping all messages 

  try {

    const message = await Message.find();
    res.status(200).send(message);



  }

  catch (error) {

    res.status(500).json(error)

  }
}

const messege = async (req, res) => {

  const messageId = req.params.orderId;

  try {
    const msg = await Message.findOne({ "orderId.orderId": messageId });
    
    console.log(msg)
    if (!msg) {
      return res.status(404).json({ message: 'Message not found' });
    }

    // Handle the found message
    res.status(200).json(msg);
  } catch (error) {
    // Handle error
    res.status(500).json(error)
  }

}


const T_sendOrderMessage = async (req, res) => {
  try {
  

    const { price } = req.body;
    const orderId = req.params.orderId; // Assuming orderId is a route parameter

    const updateMessage = {};
    if (price) {
      updateMessage.price = price;
    }

    const data = await Message.findOne({ "orderId.orderId": orderId });
    if (!data) {
      return res.status(401).send("Order Not found");
    }

    msg = await Message.findByIdAndUpdate(data._id, { $set: updateMessage }, { new: true });

    console.log(msg);
    res.status(201).json(msg);
  } catch (error) {
    res.status(500).json(error);
  }
};




module.exports = { fetchMessages, messege, T_sendOrderMessage };