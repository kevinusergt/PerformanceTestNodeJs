import { IWarehouseService } from "./interfaces/warehouse.service.interface";
import { IWarehouseRepository } from "../repositories/interfaces/warehouse.repository.interface";
import { CreateWarehouseDTO, UpdateWarehouseDTO } from "../dtos/warehouse.dto";
import { Warehouse } from "../models/Warehouse";
import { AppError } from "../utils/AppError";

export class WarehouseService implements IWarehouseService {
  constructor(private warehouseRepository: IWarehouseRepository) {}

  async createWarehouse(data: CreateWarehouseDTO): Promise<Warehouse> {
    if (!data.name || !data.location) {
      throw new AppError("El nombre y la ubicación son obligatorios.", 400);
    }
    return this.warehouseRepository.create(data);
  }

  async getAllWarehouses(): Promise<Warehouse[]> {
    return this.warehouseRepository.findAll();
  }

  async getWarehouseById(id: number): Promise<Warehouse> {
    const warehouse = await this.warehouseRepository.findById(id);
    if (!warehouse) {
      throw new AppError("Almacén no encontrado.", 404);
    }
    return warehouse;
  }

  async updateWarehouse(id: number, data: UpdateWarehouseDTO): Promise<Warehouse> {
    const existingWarehouse = await this.warehouseRepository.findById(id);
    if (!existingWarehouse) {
      throw new AppError("Almacén no encontrado.", 404);
    }
    const updatedWarehouse = await this.warehouseRepository.update(id, data);
    return updatedWarehouse as Warehouse;
  }

  async deleteWarehouse(id: number): Promise<void> {
    const existingWarehouse = await this.warehouseRepository.findById(id);
    if (!existingWarehouse) {
      throw new AppError("Almacén no encontrado.", 404);
    }
    await this.warehouseRepository.softDelete(id);
  }
}
