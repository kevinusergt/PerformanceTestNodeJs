import { Router } from "express";
import { SupplyRequestController } from "../controllers/supplyRequest.controller";
import { SupplyRequestService } from "../services/supplyRequest.service";
import { SupplyRequestRepository } from "../repositories/supplyRequest.repository";
import { ClinicRepository } from "../repositories/clinic.repository";
import { MedicationRepository } from "../repositories/medication.repository";
import { WarehouseRepository } from "../repositories/warehouse.repository";
import { authMiddleware } from "../middlewares/auth.middleware";
import { roleMiddleware } from "../middlewares/role.middleware";
import { validateBody } from "../middlewares/validate.middleware";

const router = Router();

const supplyRequestRepository = new SupplyRequestRepository();
const clinicRepository = new ClinicRepository();
const medicationRepository = new MedicationRepository();
const warehouseRepository = new WarehouseRepository();
const supplyRequestService = new SupplyRequestService(
  supplyRequestRepository,
  clinicRepository,
  medicationRepository,
  warehouseRepository
);
const supplyRequestController = new SupplyRequestController(supplyRequestService);

/**
 * @swagger
 * /api/requests:
 *   post:
 *     summary: Registrar una solicitud de abastecimiento (ADMIN o GESTOR)
 *     tags: [Requests]
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               clinicId: { type: integer }
 *               medicationId: { type: integer }
 *               warehouseId: { type: integer }
 *               quantityRequested: { type: integer }
 *     responses:
 *       201: { description: Solicitud creada }
 *       400: { description: Inventario insuficiente o datos inválidos }
 */
router.post(
  "/",
  authMiddleware,
  validateBody(["clinicId", "medicationId", "warehouseId", "quantityRequested"]),
  supplyRequestController.create
);

/**
 * @swagger
 * /api/requests/active:
 *   get:
 *     summary: Consultar solicitudes activas (cualquier usuario autenticado)
 *     tags: [Requests]
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200: { description: Lista de solicitudes activas }
 */
// Va ANTES de /:id para que Express no confunda "active" con un id.
router.get("/active", authMiddleware, supplyRequestController.getActive);

/**
 * @swagger
 * /api/requests/clinic/{clinicId}/history:
 *   get:
 *     summary: Historial de solicitudes de una clínica (cualquier usuario autenticado)
 *     tags: [Requests]
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: clinicId
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200: { description: Historial de la clínica }
 */
router.get(
  "/clinic/:clinicId/history",
  authMiddleware,
  supplyRequestController.getHistoryByClinic
);

/**
 * @swagger
 * /api/requests/{id}:
 *   get:
 *     summary: Obtener una solicitud por id
 *     tags: [Requests]
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200: { description: Solicitud encontrada }
 */
router.get("/:id", authMiddleware, supplyRequestController.getById);

/**
 * @swagger
 * /api/requests/{id}/status:
 *   put:
 *     summary: Actualizar el estado de una solicitud (ADMIN o GESTOR)
 *     tags: [Requests]
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status: { type: string, enum: [PENDIENTE, APROBADA, RECHAZADA, ENTREGADA] }
 *     responses:
 *       200: { description: Estado actualizado }
 *       400: { description: Estado no válido }
 */
router.put(
  "/:id/status",
  authMiddleware,
  validateBody(["status"]),
  supplyRequestController.updateStatus
);

/**
 * @swagger
 * /api/requests/{id}:
 *   delete:
 *     summary: Eliminar (lógicamente) una solicitud (solo ADMIN)
 *     tags: [Requests]
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200: { description: Solicitud eliminada }
 */
router.delete("/:id", authMiddleware, roleMiddleware(["ADMIN"]), supplyRequestController.delete);

export default router;
