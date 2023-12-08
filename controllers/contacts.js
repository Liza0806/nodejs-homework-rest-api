 const {Contact} = require('../models/contact')
const { HttpError } = require('../helpers/HttpError')

async function listContacts(req, res) {
  const {_id: owner} = req.user;
  const{page=1, limit=10}=req.query;
  const skip=(page-1)*limit;
  const data = await Contact.find({owner}, "", {skip, limit})
  return data
}

async function getContactById(id) {
    const result = await Contact.findOne({_id: id})
    return result
}
async function removeContact(id) {
     const result = await Contact.findByIdAndDelete(id)
    return result
}

async function addContact(req) {
  const {_id: owner} = req.user;
  const newContact = await Contact.create({...req.body, owner});
  return newContact;
}

async function updateContact(id, req) {
  const result = await Contact.findByIdAndUpdate(id, req, { new: true });
  if (!result) {
    throw HttpError(404, 'not found');
  }
  return result;
}

  
  async function updateStatusContact(id, req, res) {
    const result = await Contact.findByIdAndUpdate(id, req)
    if(!result){
      throw HttpError(404, 'not found')
    }
    return result
  }


module.exports = {
  listContacts,
  updateStatusContact,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
