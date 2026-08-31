import dotenv from "dotenv";
import { ensureDatabaseExists } from "./config/createDatabase";
dotenv.config();

import app from "./app";
import { connectDB, sequelize } from "./config/database";

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  await ensureDatabaseExists();
  await connectDB();
  await sequelize.sync({ alter: true });

  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
    console.log(`Documentación Swagger en http://localhost:${PORT}/api-docs`);
  });
};

startServer();
