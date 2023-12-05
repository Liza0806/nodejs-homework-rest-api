const express = require('express')
const router = express.Router()
const contacts = require("../../models/contacts")
const {addSchema, updateFavoriteSchema} = require('../../models/contact')
const { HttpError } = require("../../helpers/HttpError")
const { isValidId } = require('../../middlewares/isValidId')

router.get('/', async (req, res, next) => {
  try {
     const result = await contacts.listContacts()
  res.json(result)
  }
 catch (error){
  res.status(500).json({
    message: "Server error"
  })
 }
})

router.get('/:id', isValidId, async (req, res, next) => {
  try{
const {id} = req.params;
console.log(req.params)
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

router.post('/', async (req, res, next) => {
  try{
   const {error} = addSchema.validate(req.body)
    if(error){
      throw HttpError(404, error.message)
    }
const result = await contacts.addContact(req.body);
res.status(201).json(result)
  }
  catch (error){
  next(error)
   }

})

router.delete('/:id', isValidId, async (req, res, next) => {
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

router.put('/:id', isValidId, async (req, res, next) => {
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
router.put('/:id/favorite', isValidId, async (req, res, next) => {
  console.log(req.body)
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
