import dotenv from "dotenv";
import app from "./app.ts";
import { connectDB, sequelize } from "./config/database";

dotenv.config();

const PORT = Number(process.env.PORT) || 3000;

const startServer = async (): Promise<void> => {
  try {
    await connectDB();
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
      console.log(`Swagger disponible en http://localhost:${PORT}/api-docs`)
    })
  } catch (error) {
    console.error("Error al iniciar el servidor:", error);
    process.exit(1);
  }
};

void startServer();