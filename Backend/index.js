const connectToMongo  = require('./db')
const cors = require('cors');
const express = require('express')
require("dotenv").config();
connectToMongo();
const app = express()


//middleware
app.use(express.json());
app.use(cors());
app.use(express.json())


app.use('/auth',require('./routes/authRoute'));
app.use('/transporterChat', require('./routes/TransporterRoute'))
app.use('/manifacturerChat', require('./routes/ManufacturerRoute'))







app.listen(5000, () => {
  console.log(`Example app listening on port 5000`)
})