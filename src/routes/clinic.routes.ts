import { Router } from "express";
import { ClinicController } from "../controllers/clinic.controller";
import { ClinicService } from "../services/clinic.service";
import { ClinicRepository } from "../repositories/clinic.repository";
import { authMiddleware } from "../middlewares/auth.middleware";
import { roleMiddleware } from "../middlewares/role.middleware";
import { validateBody } from "../middlewares/validate.middleware";

const router = Router();

const clinicRepository = new ClinicRepository();
const clinicService = new ClinicService(clinicRepository);
const clinicController = new ClinicController(clinicService);

// CRUD completo de clínicas: SOLO ADMIN, según el enunciado
const requiredFields = ["name", "nit", "address", "responsibleName", "responsiblePhone"];

/**
 * @swagger
 * /api/clinics:
 *   post:
 *     summary: Crear una clínica (solo ADMIN)
 *     tags: [Clinics]
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name: { type: string }
 *               nit: { type: string }
 *               address: { type: string }
 *               responsibleName: { type: string }
 *               responsiblePhone: { type: string }
 *     responses:
 *       201: { description: Clínica creada }
 *       409: { description: NIT ya registrado }
 */
router.post(
  "/",
  authMiddleware,
  roleMiddleware(["ADMIN"]),
  validateBody(requiredFields),
  clinicController.create
);

/**
 * @swagger
 * /api/clinics:
 *   get:
 *     summary: Listar clínicas activas
 *     tags: [Clinics]
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200: { description: Lista de clínicas }
 */
router.get("/", authMiddleware, clinicController.getAll);

/**
 * @swagger
 * /api/clinics/{id}:
 *   get:
 *     summary: Obtener una clínica por id
 *     tags: [Clinics]
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200: { description: Clínica encontrada }
 *       404: { description: No encontrada }
 */
router.get("/:id", authMiddleware, clinicController.getById);

/**
 * @swagger
 * /api/clinics/{id}:
 *   put:
 *     summary: Actualizar una clínica (solo ADMIN)
 *     tags: [Clinics]
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200: { description: Clínica actualizada }
 */
router.put("/:id", authMiddleware, roleMiddleware(["ADMIN"]), clinicController.update);

/**
 * @swagger
 * /api/clinics/{id}:
 *   delete:
 *     summary: Eliminar (lógicamente) una clínica (solo ADMIN)
 *     tags: [Clinics]
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200: { description: Clínica eliminada }
 */
router.delete("/:id", authMiddleware, roleMiddleware(["ADMIN"]), clinicController.delete);

export default router;
