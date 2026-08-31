import { Request, Response, NextFunction } from "express";
import { IWarehouseService } from "../services/interfaces/warehouse.service.interface";

export class WarehouseController {
  constructor(private warehouseService: IWarehouseService) {}

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const warehouse = await this.warehouseService.createWarehouse(req.body);
      res.status(201).json({ success: true, data: warehouse });
    } catch (error) {
      next(error);
    }
  };

  getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const warehouses = await this.warehouseService.getAllWarehouses();
      res.status(200).json({ success: true, data: warehouses });
    } catch (error) {
      next(error);
    }
  };

  getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const warehouse = await this.warehouseService.getWarehouseById(Number(req.params.id));
      res.status(200).json({ success: true, data: warehouse });
    } catch (error) {
      next(error);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const warehouse = await this.warehouseService.updateWarehouse(Number(req.params.id), req.body);
      res.status(200).json({ success: true, data: warehouse });
    } catch (error) {
      next(error);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.warehouseService.deleteWarehouse(Number(req.params.id));
      res.status(200).json({ success: true, message: "Almacén eliminado correctamente." });
    } catch (error) {
      next(error);
    }
  };
}
