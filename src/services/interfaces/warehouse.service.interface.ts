import { Warehouse } from "../../models/Warehouse";
import { CreateWarehouseDTO, UpdateWarehouseDTO } from "../../dtos/warehouse.dto";

export interface IWarehouseService {
  createWarehouse(data: CreateWarehouseDTO): Promise<Warehouse>;
  getAllWarehouses(): Promise<Warehouse[]>;
  getWarehouseById(id: number): Promise<Warehouse>;
  updateWarehouse(id: number, data: UpdateWarehouseDTO): Promise<Warehouse>;
  deleteWarehouse(id: number): Promise<void>;
}
