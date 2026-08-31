import { Request, Response, NextFunction } from "express";
import { SeedService } from "../services/seed.service";
import { AppError } from "../utils/AppError";

export class SeedController {
  constructor(private seedService: SeedService) {}

  // El archivo llega en req.file gracias al middleware de multer
  uploadSeed = async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.file) {
        throw new AppError("Debes adjuntar un archivo JSON en el campo 'file'.", 400);
      }
      const summary = await this.seedService.seedFromJsonBuffer(req.file.buffer);
      res.status(201).json({
        success: true,
        message: "Datos cargados correctamente.",
        data: summary,
      });
    } catch (error) {
      next(error);
    }
  };
}
