const express = require('express')
const {HttpError} = require('../../helpers/HttpError')
const router = express.Router()
const vaildateBody = require('../../middlewares/vaildateBody')
const {schemas} = require('../../models/user')
const {User} = require('../../models/user')


router.post('/register', 
async (req, res, next) => {
    try{
     const {error} = vaildateBody(schemas.registerSchema)
      if(error){
        throw HttpError(404, error.message)
      }
      console.log(req.body)
      const newUser = await User.create(req.body)
      console.log(newUser, "vff")
      res.status(201).json({
        email: newUser.email,
        subscription: newUser.subscription,
      });
    }
    catch (error){
    next(error)
     }
  }


)

module.exports = router


// http://localhost:3002/api/auth/register