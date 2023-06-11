const express = require("express");
const router = express.Router();
const verifyToken =  require("../middleware/verifyToken")



const {fetchMessages,messege,T_sendOrderMessage} = require("../controllers/transporter");




//read posts

router.get("/all_messages",verifyToken,fetchMessages);
router.get("/message/:orderId",verifyToken,messege);




//Add post

router.put("/t_send/:orderId",verifyToken,T_sendOrderMessage);

//update post




module.exports = router;