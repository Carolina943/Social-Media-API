const dotenv = require('dotenv');
dotenv.config();
require('express-async-errors');

//Express
const express = require('express');
const app = express();

//database
const connectDB = require('./db/connect');


//PORT

const port = process.env.PORT


const start = async() =>{
  try{
    await connectDB()
    app.listen(port, console.log(`Server is listening on port ${port}...`))
  }catch(error){
    console.log(error)
  }
}

start()