const { MongoClient } = require('mongodb')

const connectionString = process.env.MONGODB_URI
const databaseName = process.env.MONGODB_DB || 'contacts'

if (!connectionString) {
	throw new Error('MONGODB_URI is not defined in the environment.')
}

const client = new MongoClient(connectionString)
let database

async function connectToDatabase() {
	if (database) {
		return database
	}

	await client.connect()
	database = client.db(databaseName)
	await database.command({ ping: 1 })
	console.log(`Connected to MongoDB database: ${databaseName}`)

	return database
}

function getDatabase() {
	if (!database) {
		throw new Error('Database connection has not been initialized.')
	}

	return database
}

module.exports = {
	connectToDatabase,
	getDatabase,
}
