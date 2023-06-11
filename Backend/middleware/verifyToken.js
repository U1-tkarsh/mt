var jwt = require('jsonwebtoken');
require('dotenv').config();

const VerifyToken  = (req,res,next)=>{

// get token from the hadear and id to the request objcet 
//this is a header token we will validate it then we get the value for the user data 
const token = req.header('auth-token');
if(!token){
    res.status(401).send({error:"Please authenticate using a valid token"})
}

try {
    const decoded = jwt.verify(token, "secret-key"); //its varifying is the passed user token
    req.user = decoded.user;
    next();

  } catch(err) {
    res.status(401).send({error:"Please authenticate using a valid token"})

  }

}
module.exports = VerifyToken