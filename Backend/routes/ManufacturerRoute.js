const express = require("express");
const router = express.Router();
const verifyToken =  require("../middleware/verifyToken")



const {fetchMessages,messege,M_sendOrderMessage} = require("../controllers/manufacturer");




//read posts

router.get("/all_messages",verifyToken,fetchMessages);
router.get("/message/:orderId",verifyToken,messege);




//Add post

router.post("/m_send/:orderId",verifyToken,M_sendOrderMessage);

//update post




module.exports = router;