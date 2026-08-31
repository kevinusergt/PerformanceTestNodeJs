import { Router } from "express";
import { WarehouseController } from "../controllers/warehouse.controller";
import { WarehouseService } from "../services/warehouse.service";
import { WarehouseRepository } from "../repositories/warehouse.repository";
import { authMiddleware } from "../middlewares/auth.middleware";
import { roleMiddleware } from "../middlewares/role.middleware";
import { validateBody } from "../middlewares/validate.middleware";

const router = Router();

const warehouseRepository = new WarehouseRepository();
const warehouseService = new WarehouseService(warehouseRepository);
const warehouseController = new WarehouseController(warehouseService);

/**
 * @swagger
 * /api/warehouses:
 *   post:
 *     summary: Crear un almacén (solo ADMIN)
 *     tags: [Warehouses]
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name: { type: string }
 *               location: { type: string }
 *     responses:
 *       201: { description: Almacén creado }
 */
router.post(
  "/",
  authMiddleware,
  roleMiddleware(["ADMIN"]),
  validateBody(["name", "location"]),
  warehouseController.create
);

/**
 * @swagger
 * /api/warehouses:
 *   get:
 *     summary: Listar almacenes activos
 *     tags: [Warehouses]
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200: { description: Lista de almacenes }
 */
router.get("/", authMiddleware, warehouseController.getAll);

/**
 * @swagger
 * /api/warehouses/{id}:
 *   get:
 *     summary: Obtener un almacén por id
 *     tags: [Warehouses]
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200: { description: Almacén encontrado }
 */
router.get("/:id", authMiddleware, warehouseController.getById);

/**
 * @swagger
 * /api/warehouses/{id}:
 *   put:
 *     summary: Actualizar un almacén (solo ADMIN)
 *     tags: [Warehouses]
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200: { description: Almacén actualizado }
 */
router.put("/:id", authMiddleware, roleMiddleware(["ADMIN"]), warehouseController.update);

/**
 * @swagger
 * /api/warehouses/{id}:
 *   delete:
 *     summary: Eliminar (lógicamente) un almacén (solo ADMIN)
 *     tags: [Warehouses]
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200: { description: Almacén eliminado }
 */
router.delete("/:id", authMiddleware, roleMiddleware(["ADMIN"]), warehouseController.delete);

export default router;
