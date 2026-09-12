const swaggerAutogen = require('swagger-autogen')()

const outputFile = './swagger.json'
const endpointsFiles = ['./routes/*.js']
const renderHost = process.env.RENDER_EXTERNAL_HOSTNAME

const document = {
  info: {
    title: 'Contacts API',
    description: 'API for managing contacts.',
    version: '1.0.0',
  },
  host: renderHost || 'cse341-contacts-x8g5.onrender.com',
  schemes: renderHost ? ['https'] : ['http', 'https'],
  basePath: '/contacts',
}

swaggerAutogen(outputFile, endpointsFiles, document)
