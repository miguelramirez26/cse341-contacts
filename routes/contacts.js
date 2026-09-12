const express = require('express')
const {
	getAllContacts,
	getContactById,
	createContact,
	updateContact,
	deleteContact,
} = require('../controllers/contacts')

const router = express.Router()

router.get('/', getAllContacts)
router.get('/:id', getContactById)
router.post('/', createContact)
router.put('/:id', (req, res, next) => {
  /* #swagger.parameters['body'] = {
    in: 'body',
    required: true,
    schema: {
      firstName: 'test',
      lastName: 'test',
      email: 'test@test.com',
      favoriteColor: 'test',
      birthday: '1999-09-26'
    }
  } */
  updateContact(req, res, next)
})
router.delete('/:id', deleteContact)

module.exports = router
