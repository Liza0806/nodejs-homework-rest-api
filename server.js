const app = require('./app')
const dotenv = require('dotenv')
dotenv.config();

const mongoose = require('mongoose')
// const Mongo = 'mongodb+srv://Liza:asX11J89YYmgZCbI@cluster0.v1ocvyh.mongodb.net/contacts-base?retryWrites=true&w=majority'
const {DB_HOST} = process.env
mongoose.connect(DB_HOST)
.then(()=> 
{
  app.listen(3002, () => {
    console.log("Server running. Use our API on port: 3002")
  })
  console.log("Database connect success")})
.catch(error=> console.log(error.message))
// app.listen(3002, () => {
//   console.log("Server running. Use our API on port: 3002")
// })
