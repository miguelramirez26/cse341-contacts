const express = require('express')
const { getAllContacts } = require('../controllers/contacts')

const router = express.Router()

router.get('/', getAllContacts)

module.exports = router
