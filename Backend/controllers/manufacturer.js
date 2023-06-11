const Message  = require("../models/MessageModel")
const {validationResult}  = require("express-validator");
const User = require("../models/UserModel");


// GET URLS ENDPOINTS



const fetchMessages = async (req,res)=>{

        //here i graping all messages 

        try{

            const message = await Message.find();
            res.status(200).send(message);



        }

        catch(error){

            res.status(500).json(error)

        }
}

const messege = async (req,res)=>{

    const messageId = req.params.orderId;

    try {
        const msg = await Message.findOne({ "orderId.orderId": messageId });
    
       
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


//1234545

// POST URLs ENDPOINTS

const M_sendOrderMessage = async (req,res)=>{

          try {
            
          

            const user = await User.findById(req.user.id);
            const username = user.username;

            const  {quantity,address,transporter} = req.body;
            const orderId = req.params;
            const msg = new Message({
                orderId,
    
                quantity,
    
                address,
                
                transporter,
                
                chatId_from:username,

                senderId_to:transporter

            })
    
            const saveOrder = await msg.save();
    
            res.json(saveOrder);

            //here transporter use id of that transporter



          } catch (error) {
            
            res.status(500).json(error)

          }  



}



module.exports = {fetchMessages,messege,M_sendOrderMessage};