const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API IntegraStore',
            version: '1.0.0',
            description: 'IntegraStore é uma aplicação full-stack de e-commerce construída do zero, utilizando o MERN stack (MongoDB, Express, React, Node.js).',
        },
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
        servers: [
            {
                url: 'http://localhost:5001',
            },
        ],
    },
    apis: ['./routes/*.js'], // ou ajuste conforme sua pasta
};

const swaggerSpec = swaggerJSDoc(options);

const swaggerDocs = (app) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    console.log('Swagger disponível em http://localhost:5001/api-docs');
};

module.exports = swaggerDocs;
