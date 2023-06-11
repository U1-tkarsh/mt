const express = require('express');
var jwt = require('jsonwebtoken');
const auth = express.Router();
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');

const UserModal = require("../models/UserModel")

require('dotenv').config();
var verifyToken = require("../middleware/verifyToken")
//javascript dsetructioring method is used here 



//for SIGN UP  this is not a authemticate endpoint "api/auth/signup"

auth.post('/signup', [
    body('email', "this email already used").isEmail(),
    body('password', 'use a atleast 8 digit password').isLength({ min: 8 }),   //these array is given for validation at the middle as a parameter to the function
    body('username', 'dont use a unvalid name ').isLength({ min: 4, max: 15 }),
    body('Address', 'dont use a Long address').isLength({ min: 4, max: 15 }),
], async (req, res) => {
    let success = false;
    const errors = validationResult(req);

    if (!errors.isEmpty) {
        success = false;
        return res.status(400).json({ success, error: errors.array() });
    }

    try {
        let user = await UserModal.findOne({ email: req.body.email })
        if (user) {

            return res.status(400).json({ success, error: "Your email already exsist" })
        }

        //generating solt
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt)

        //taking data from request body and storign to monogdb 

        user = await UserModal.create({
            username: req.body.username,
            password: secPass,
            email: req.body.email,
            address: req.body.address,
            role: req.body.role,

        })

        const data = {
            user: {
                id: user.id
            }
        }

        const user_from = user.id;
        const data3 = user.role;
        const name = user.username;
        const address = user.address;

        const authToken = jwt.sign(data, "secret-key");
        success = true;


        res.status(200).send({ success, authToken, user_from, data3, name, address });  //here is user id




    } catch (error) {

        console.log(error.message);
        res.status(500).send("Some error occured");
    }

});





//for LOGIN 

auth.post('/login', [
    body('email', "plsese type you email correctly").isEmail(),
    body('password', 'please enter a password').isLength({ min: 5 }).exists(),
], async (req, res) => {


    let success = false;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });   //its chaking the req is validate or not 
    }

    const { password, email } = req.body;

    try {

        let user = await UserModal.findOne({ email });

        if (!user) {

            return res.status(400).json({ error: "Please try to log with correct credentials" });

        }


        const passwordCompare = await bcrypt.compare(password, user.password);

        if (!passwordCompare) {
            success = false;
            return res.status(400).json({ success, error: "Please try with correct credentials" });
        }

        const data = {
            user: {
                id: user.id
            }
        }
        const role = user.role

        
            const name_ = user.username;
            const address = user.address;
         



        const authToken = jwt.sign(data, "secret-key");
        success = true;
        res.json({ success, authToken,role,name_,address});


    } catch (error) {

        console.log(error);
        res.status(500).send("some Error occured");

    }



});

//to get all user data

auth.get('/getalluser', verifyToken, async (req, res) => {

    try {
        const user = await UserModal.find()
        res.send(user) 
    } catch (error) {
        console.error(error.message);
        res.status(500).send("internal sever error");
    }

})

//it is to get loged user details

auth.get('/getuser', verifyToken, async (req, res) => {

    try {
        const user = await UserModal.findById(req.user.id).select("-password")
        res.send(user) //its for just testing 
    } catch (error) {
        console.error(error.message);
        res.status(500).send("internal sever error");
    }

})

module.exports = auth