const {Schema, model } = require('mongoose');
const { handleMongooseError } = require('../helpers/handleMongooseError')

const Joi = require("joi")

const addSchema = Joi.object({
  favorite: Joi.boolean(),
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
})

const updateFavoriteSchema = Joi.object ({
  favorite: Joi.boolean().required(),
})

const phoneRegexp = /^(\+\d{1,2}\s?)?(\(\d{1,4}\))?[0-9.\-\s]{6,}$/;
const contactSchema = new Schema ({
    name: {
      type: String,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
      match: phoneRegexp,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  })

  contactSchema.post("save", handleMongooseError)
 
  const Contact = model('contact', contactSchema)

  module.exports = {Contact, addSchema, updateFavoriteSchema, }