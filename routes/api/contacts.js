const express = require('express')
const router = express.Router()
const contacts = require("../../controllers/contacts")
const {addSchema, updateFavoriteSchema} = require('../../models/contact')
const { HttpError } = require("../../helpers/HttpError")
const { isValidId } = require('../../middlewares/isValidId')
const authentificate = require('../../middlewares/authentificate')

router.get('/', authentificate, async (req, res, next) => {
  try {
     const result = await contacts.listContacts(req, res)
  res.json(result)
  }
 catch (error){
  res.status(500).json({
    message: "Server error"
  })
 }
})

router.get('/:id', authentificate, isValidId, async (req, res, next) => {
  try{
const {id} = req.params;
const result = await contacts.getContactById(id);
if (!result){
  throw HttpError(404, "Not found")
}
res.json(result)
  }
  catch (error){
   next(error)
   }

})

router.post('/', authentificate, async (req, res, next) => {
  try{
   const {error} = addSchema.validate(req.body)
    if(error){
      throw HttpError(404, error.message)
    }
const result = await contacts.addContact(req);
console.log(result, 'result in router.post')
res.status(201).json(result)
  }
  catch (error){
  next(error)
   }

})

router.delete('/:id', authentificate, isValidId, async (req, res, next) => {
try { 
  const { id } = req.params;
  const result = await contacts.removeContact(id);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json("Delete success");}
 catch (error) {
  next(error);
}
})

router.put('/:id', authentificate, isValidId, async (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.body);

    if (error) {
      throw HttpError(404, error.message); 
    }

    const { id } = req.params;
    const result = await contacts.updateContact(id, req.body);

    if (!result) {
      throw HttpError(404, "Not found");
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
});
router.put('/:id/favorite', authentificate, isValidId, async (req, res, next) => {
  try {
    const { error } = updateFavoriteSchema.validate(req.body);

    if (error) {
      throw HttpError(404, "missing field favorite"); 
    }

    const { id } = req.params;
 
    const result = await contacts.updateStatusContact(id, req.body);

    if (!result) {
      throw HttpError(404, "Not found");
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
});



module.exports = router
