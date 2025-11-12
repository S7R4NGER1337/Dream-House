const express = require('express')
const cors =  require('cors')
const mongoose = require('mongoose')
require('dotenv').config()
const propertyController = require('./propertyController')

const app = express()

const corsOptions = {
  origin: process.env.FRONTEND,
  credentials: true,
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded());
app.use('/property', propertyController)

mongoose.connect(process.env.MONGODB_MONGODB_URI)
    .then(() => console.log('Db connected'))
    .catch(error => console.log(error))

app.listen(3030, () => console.log("test"));