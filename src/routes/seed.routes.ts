import { Router } from "express";
import { SeedController } from "../controllers/seed.controller";
import { SeedService } from "../services/seed.service";
import { authMiddleware } from "../middlewares/auth.middleware";
import { roleMiddleware } from "../middlewares/role.middleware";
import { upload } from "../config/multer";

const router = Router();

const seedService = new SeedService();
const seedController = new SeedController(seedService);

/**
 * @swagger
 * /api/seed/upload:
 *   post:
 *     summary: Cargar datos base subiendo un archivo JSON (solo ADMIN)
 *     description: >
 *       Recibe un archivo JSON en el campo "file" (multipart/form-data) con
 *       las llaves opcionales "users", "clinics", "warehouses" y "medications".
 *       Actúa como seeder: usa findOrCreate, así que se puede subir el mismo
 *       archivo varias veces sin duplicar información.
 *     tags: [Seed]
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201: { description: Datos cargados correctamente }
 *       400: { description: Archivo inválido o ausente }
 */
router.post(
  "/upload",
  authMiddleware,
  roleMiddleware(["ADMIN"]),
  upload.single("file"),
  seedController.uploadSeed
);

export default router;
