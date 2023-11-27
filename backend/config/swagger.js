const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
  },
  apis: ["swagger.yaml"],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
