const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'CSE 341 Contacts API',
    description: 'API for interacting with the CSE 341 contacts database.',
  },
  host: 'dhayes-cse341-course-code-ogxh.onrender.com',
  schemes: ['http', 'https'],
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);