import { Request, Response, NextFunction } from "express";
import { IMedicationService } from "../services/interfaces/medication.service.interface";

export class MedicationController {
  constructor(private medicationService: IMedicationService) {}

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const medication = await this.medicationService.createMedication(req.body);
      res.status(201).json({ success: true, data: medication });
    } catch (error) {
      next(error);
    }
  };

  getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const medications = await this.medicationService.getAllMedications();
      res.status(200).json({ success: true, data: medications });
    } catch (error) {
      next(error);
    }
  };

  getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const medication = await this.medicationService.getMedicationById(Number(req.params.id));
      res.status(200).json({ success: true, data: medication });
    } catch (error) {
      next(error);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const medication = await this.medicationService.updateMedication(
        Number(req.params.id),
        req.body
      );
      res.status(200).json({ success: true, data: medication });
    } catch (error) {
      next(error);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.medicationService.deleteMedication(Number(req.params.id));
      res.status(200).json({ success: true, message: "Medicamento eliminado correctamente." });
    } catch (error) {
      next(error);
    }
  };
}
