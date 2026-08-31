import { Request, Response, NextFunction } from "express";
import { IClinicService } from "../services/interfaces/clinic.service.interface";

export class ClinicController {
  constructor(private clinicService: IClinicService) {}

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const clinic = await this.clinicService.createClinic(req.body);
      res.status(201).json({ success: true, data: clinic });
    } catch (error) {
      next(error);
    }
  };

  getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const clinics = await this.clinicService.getAllClinics();
      res.status(200).json({ success: true, data: clinics });
    } catch (error) {
      next(error);
    }
  };

  getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const clinic = await this.clinicService.getClinicById(Number(req.params.id));
      res.status(200).json({ success: true, data: clinic });
    } catch (error) {
      next(error);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const clinic = await this.clinicService.updateClinic(Number(req.params.id), req.body);
      res.status(200).json({ success: true, data: clinic });
    } catch (error) {
      next(error);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.clinicService.deleteClinic(Number(req.params.id));
      res.status(200).json({ success: true, message: "Clínica eliminada correctamente." });
    } catch (error) {
      next(error);
    }
  };
}
