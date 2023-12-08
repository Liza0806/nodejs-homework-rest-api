const {Schema, model } = require('mongoose');
const { handleMongooseError } = require('../helpers/handleMongooseError')
const Joi = require("joi")
const userSchema = new Schema ({
    password: {
      type: String,
      required: [true, 'Set password for user'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter"
    },
    token: String
  }, {versionKe: false, timestamps: true} )

  userSchema.post("save", handleMongooseError)
  
  const registerSchema = Joi.object({
    password: Joi.string().required(),
    email: Joi.string().required(),
    subscription: Joi.string().valid("starter", "pro", "business").default("starter")

  })

//   const registerSchema = Joi.object({
//     password: Joi.string().required(),
//     email: Joi.string().required(),
//     subscription: Joi.string().pattern(["starter", "pro", "business"]).default("starter")
//   })

const schemas  = {
    registerSchema,
}

const User = model('user', userSchema)

module.exports = {
    User, 
    schemas
}