import swaggerJSDoc from "swagger-jsdoc";

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "RiwiMediCare Plus - API de Solicitudes de Abastecimiento",
      version: "1.0.0",
      description:
        "API REST para gestionar clínicas, almacenes, medicamentos y solicitudes de abastecimiento.",
    },
    servers: [{ url: "http://localhost:3000", description: "Servidor local", }],
    components: { // esto agrega el boton de "Authorize" en Swagger UI para autenticación con JWT
      securitySchemes: {
        bearerAuth: { type: "http", scheme: "bearer", bearerFormat: "JWT" },
      },
    },
  },
  apis: ["./src/routes/*.ts"],
};

export const swaggerSpec = swaggerJSDoc(options);
