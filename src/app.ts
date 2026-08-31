import express, { Application, Request, Response } from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger";
import routes from "./routes";
import { errorMiddleware } from "./middlewares/error.middleware";
import "./models/associations";

const app: Application = express();

app.use(cors());
app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/api", routes);

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "API RiwiMediCare Plus funcionando correctamente." });
});

app.use(errorMiddleware);

export default app;
