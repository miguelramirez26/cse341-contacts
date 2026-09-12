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

async function createContact(request, response, next) {
  try {
    const {
      firstName,
      lastName,
      email,
      favoriteColor,
      birthday,
    } = request.body

    const result = await getDatabase()
      .collection('contacts')
      .insertOne({
        firstName,
        lastName,
        email,
        favoriteColor,
        birthday,
      })

    response.status(201).json({ id: result.insertedId })
  } catch (error) {
    next(error)
  }
}

async function updateContact(request, response, next) {
  try {
    const contactId = new ObjectId(request.params.id)

    await getDatabase()
      .collection('contacts')
      .replaceOne({ _id: contactId }, request.body)

    response.status(204).send()
  } catch (error) {
    next(error)
  }
}

async function deleteContact(request, response, next) {
  try {
    const contactId = new ObjectId(request.params.id)

    await getDatabase()
      .collection('contacts')
      .deleteOne({ _id: contactId })

    response.status(204).send()
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact,
}
