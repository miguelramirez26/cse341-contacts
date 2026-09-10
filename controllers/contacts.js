const { getDatabase } = require('../config/db')
const { ObjectId } = require('mongodb')

async function getAllContacts(request, response, next) {
  try {
    const contacts = await getDatabase()
      .collection('contacts')
      .find()
      .toArray()

    response.status(200).json(contacts)
  } catch (error) {
    next(error)
  }
}

async function getContactById(request, response, next) {
  try {
    const { id } = request.params

    if (!ObjectId.isValid(id)) {
      return response.status(400).json({ error: 'Invalid contact ID.' })
    }

    const contact = await getDatabase()
      .collection('contacts')
      .findOne({ _id: new ObjectId(id) })

    if (!contact) {
      return response.status(404).json({ error: 'Contact not found.' })
    }

    response.status(200).json(contact)
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getAllContacts,
  getContactById,
}
