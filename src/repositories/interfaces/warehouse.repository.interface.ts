import { Warehouse, WarehouseCreationAttributes } from "../../models/Warehouse";

export interface IWarehouseRepository {
  create(data: WarehouseCreationAttributes): Promise<Warehouse>;
  findAll(): Promise<Warehouse[]>;
  findById(id: number): Promise<Warehouse | null>;
  update(id: number, data: Partial<WarehouseCreationAttributes>): Promise<Warehouse | null>;
  softDelete(id: number): Promise<boolean>;
}
