require('dotenv').config()

const express = require('express')
const { connectToDatabase } = require('./config/db')
const contactsRoutes = require('./routes/contacts')

const app = express()
const port = process.env.PORT || 8080

app.use(express.json())
app.use('/contacts', contactsRoutes)

app.use((error, request, response, next) => {
	console.error(error)
	response.status(500).json({ error: 'An unexpected error occurred.' })
})

connectToDatabase()
	.then(() => {
		app.listen(port, () => {
			console.log(`Server running on port ${port}`)
		})
	})
	.catch((error) => {
		console.error('Unable to connect to MongoDB:', error.message)
		process.exit(1)
	})