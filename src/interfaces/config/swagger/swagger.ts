import path from 'path';
import swaggerJSDoc from 'swagger-jsdoc';

const options: swaggerJSDoc.Options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "go-fit API",
            version: "1.0.0",
            description: "Api documentation for the go-fit API",
        },
        servers: [
            {
                url: "http://localhost:3000/api/",
                description: "API version 1",
            },
        ],
    },
    apis: [
        path.join(__dirname, '../routes/*.routes.{js,ts}'),
        path.join(__dirname, '../models/*.ts'),
    ],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;