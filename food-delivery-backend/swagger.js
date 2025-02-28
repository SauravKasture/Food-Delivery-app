// swagger.js
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Food Delivery API",
      version: "1.0.0",
      description: "API documentation for the Food Delivery Application",
      contact: {
        name: "Your Name",
        email: "your-email@example.com",
      },
    },
    servers: [
      {
        url: "http://localhost:5000", // Backend server URL
        description: "Development Server",
      },
    ],
  },
  apis: ["./routes/*.js"], // Path to API route files
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = { swaggerDocs, swaggerUi };