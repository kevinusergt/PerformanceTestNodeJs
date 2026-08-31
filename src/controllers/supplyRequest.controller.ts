import { Request, Response, NextFunction } from "express";
import { ISupplyRequestService } from "../services/interfaces/supplyRequest.service.interface";

export class SupplyRequestController {
  constructor(private supplyRequestService: ISupplyRequestService) {}

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const request = await this.supplyRequestService.createRequest(req.body);
      res.status(201).json({ success: true, data: request });
    } catch (error) {
      next(error);
    }
  };

  // Solicitudes activas (no eliminadas lógicamente), visible para todos los autenticados
  getActive = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const requests = await this.supplyRequestService.getActiveRequests();
      res.status(200).json({ success: true, data: requests });
    } catch (error) {
      next(error);
    }
  };

  getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const request = await this.supplyRequestService.getRequestById(Number(req.params.id));
      res.status(200).json({ success: true, data: request });
    } catch (error) {
      next(error);
    }
  };

  // Historial de solicitudes de una clínica específica
  getHistoryByClinic = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const requests = await this.supplyRequestService.getHistoryByClinic(
        Number(req.params.clinicId)
      );
      res.status(200).json({ success: true, data: requests });
    } catch (error) {
      next(error);
    }
  };

  updateStatus = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const request = await this.supplyRequestService.updateStatus(
        Number(req.params.id),
        req.body
      );
      res.status(200).json({ success: true, data: request });
    } catch (error) {
      next(error);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.supplyRequestService.deleteRequest(Number(req.params.id));
      res.status(200).json({ success: true, message: "Solicitud eliminada correctamente." });
    } catch (error) {
      next(error);
    }
  };
}
