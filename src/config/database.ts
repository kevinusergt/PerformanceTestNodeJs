import dotenev from "dotenv";
import {Sequelize} from "sequelize";

dotenev.config();

export const sequelize = new Sequelize(
    process.env.DB_NAME as string,
    process.env.DB_USER as string,
    process.env.DB_PASSWORD as string,
    {
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT) || 5432,
        dialect: "postgres",
        logging: false,
    }
);

export const connectDB = async (): Promise<void> =>{
    try {
        await sequelize.authenticate();
        console.log("Conexión a PostgreSQL establecida correctamente");
    } catch (error) {
        console.error("Error al conectar con PostgreSQL:", error);
        process.exit(1);
    }
};