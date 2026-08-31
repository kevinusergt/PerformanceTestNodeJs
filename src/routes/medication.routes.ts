import { Router } from "express";
import { MedicationController } from "../controllers/medication.controller";
import { MedicationService } from "../services/medication.service";
import { MedicationRepository } from "../repositories/medication.repository";
import { WarehouseRepository } from "../repositories/warehouse.repository";
import { authMiddleware } from "../middlewares/auth.middleware";
import { roleMiddleware } from "../middlewares/role.middleware";
import { validateBody } from "../middlewares/validate.middleware";

const router = Router();

const medicationRepository = new MedicationRepository();
const warehouseRepository = new WarehouseRepository();
const medicationService = new MedicationService(medicationRepository, warehouseRepository);
const medicationController = new MedicationController(medicationService);

/**
 * @swagger
 * /api/medications:
 *   post:
 *     summary: Crear un medicamento (solo ADMIN)
 *     tags: [Medications]
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name: { type: string }
 *               description: { type: string }
 *               warehouseId: { type: integer }
 *               stock: { type: integer }
 *     responses:
 *       201: { description: Medicamento creado }
 */
router.post(
  "/",
  authMiddleware,
  roleMiddleware(["ADMIN"]),
  validateBody(["name", "warehouseId", "stock"]),
  medicationController.create
);

/**
 * @swagger
 * /api/medications:
 *   get:
 *     summary: Listar medicamentos activos
 *     tags: [Medications]
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200: { description: Lista de medicamentos }
 */
router.get("/", authMiddleware, medicationController.getAll);

/**
 * @swagger
 * /api/medications/{id}:
 *   get:
 *     summary: Obtener un medicamento por id
 *     tags: [Medications]
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200: { description: Medicamento encontrado }
 */
router.get("/:id", authMiddleware, medicationController.getById);

/**
 * @swagger
 * /api/medications/{id}:
 *   put:
 *     summary: Actualizar un medicamento (solo ADMIN)
 *     tags: [Medications]
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200: { description: Medicamento actualizado }
 */
router.put("/:id", authMiddleware, roleMiddleware(["ADMIN"]), medicationController.update);

/**
 * @swagger
 * /api/medications/{id}:
 *   delete:
 *     summary: Eliminar (lógicamente) un medicamento (solo ADMIN)
 *     tags: [Medications]
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200: { description: Medicamento eliminado }
 */
router.delete("/:id", authMiddleware, roleMiddleware(["ADMIN"]), medicationController.delete);

export default router;
