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
  host: renderHost || 'localhost:8080',
  schemes: renderHost ? ['https'] : ['http', 'https'],
  basePath: '/contacts',
}

swaggerAutogen(outputFile, endpointsFiles, document)
