const express = require('express')
const logger = require('morgan')
const cors = require('cors')

const contactsRouter = require('./routes/api/contacts')

const app = express()


const mongoose = require('mongoose')
// const Mongo = 'mongodb+srv://Liza:asX11J89YYmgZCbI@cluster0.v1ocvyh.mongodb.net/contacts-base?retryWrites=true&w=majority'
const {DB_HOST} = require('./config')
mongoose.connect(DB_HOST)
.then(()=> console.log("Database connect success"))
.catch(error=> console.log(error.message))

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())

app.use('/api/contacts', contactsRouter)

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
})

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message })
})

module.exports = app
