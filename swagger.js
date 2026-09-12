const swaggerAutogen = require('swagger-autogen')()

const outputFile = './swagger.json'
const endpointsFiles = ['./routes/*.js']
const renderHost = process.env.RENDER_EXTERNAL_HOSTNAME
const isProduction = Boolean(renderHost || process.env.NODE_ENV === 'production')
const productionHost = renderHost || 'cse341-contacts.onrender.com'

const document = {
  info: {
    title: 'Contacts API',
    description: 'API for managing contacts.',
    version: '1.0.0',
  },
  host: isProduction ? productionHost : 'localhost:8080',
  schemes: isProduction ? ['https'] : ['http', 'https'],
  basePath: '/contacts',
}

swaggerAutogen(outputFile, endpointsFiles, document)
