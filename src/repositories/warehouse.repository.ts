import { Warehouse, WarehouseCreationAttributes } from "../models/Warehouse";
import { IWarehouseRepository } from "./interfaces/warehouse.repository.interface";

export class WarehouseRepository implements IWarehouseRepository {
  async create(data: WarehouseCreationAttributes): Promise<Warehouse> {
    return Warehouse.create(data);
  }

  async findAll(): Promise<Warehouse[]> {
    return Warehouse.findAll({ where: { isDeleted: false } });
  }

  async findById(id: number): Promise<Warehouse | null> {
    return Warehouse.findOne({ where: { id, isDeleted: false } });
  }

  async update(id: number, data: Partial<WarehouseCreationAttributes>): Promise<Warehouse | null> {
    const warehouse = await Warehouse.findByPk(id);
    if (!warehouse) return null;
    return warehouse.update(data);
  }

  async softDelete(id: number): Promise<boolean> {
    const [affectedRows] = await Warehouse.update({ isDeleted: true }, { where: { id } });
    return affectedRows > 0;
  }
} 
