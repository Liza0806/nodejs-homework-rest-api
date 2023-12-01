const app = require('./app')
require('dotenv').config(); 

const mongoose = require('mongoose')

const {DB_HOST} = process.env
console.log(process.env.DB_HOST)
mongoose.connect(DB_HOST)
.then(()=> 
{
  app.listen(3002, () => {
    console.log("Server running. Use our API on port: 3002")
  })
  console.log("Database connect success")})
.catch(error=> console.log(error.message))

