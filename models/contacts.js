 const {Contact} = require('./contact')

const path = require("path")
const { HttpError } = require('../helpers/HttpError')

const contactsPath = path.join(__dirname, "contacts.json") 
console.log(contactsPath)

async function listContacts() {
    const data = await Contact.find()
    console.log("list")
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
    const newContact = await Contact.create(req);
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
