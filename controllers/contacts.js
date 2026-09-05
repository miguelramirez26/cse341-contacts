const { getDatabase } = require('../config/db')

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

module.exports = {
  getAllContacts,
}
