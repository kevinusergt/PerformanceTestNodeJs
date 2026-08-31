import { SupplyRequest, SupplyRequestCreationAttributes} from "../models/SupplyRequest";
import { Clinic } from "../models/Clinic";
import { Medication } from "../models/Medication";
import { Warehouse } from "../models/Warehouse";
import { ISupplyRequestRepository } from "./interfaces/supplyRequest.repository.interface";

const includeRelations = [
  { model: Clinic, as: "clinic", attributes: ["id", "name", "nit"] },
  { model: Medication, as: "medication", attributes: ["id", "name"] },
  { model: Warehouse, as: "warehouse", attributes: ["id", "name"] },
];

export class SupplyRequestRepository implements ISupplyRequestRepository {
  async create(data: SupplyRequestCreationAttributes): Promise<SupplyRequest> {
    return SupplyRequest.create(data);
  }

  async findAllActive(): Promise<SupplyRequest[]> {
    return SupplyRequest.findAll({ where: { isDeleted: false }, include: includeRelations });
  }

  async findById(id: number): Promise<SupplyRequest | null> {
    return SupplyRequest.findOne({
      where: { id, isDeleted: false },
      include: includeRelations,
    });
  }

  async findByClinicId(clinicId: number): Promise<SupplyRequest[]> {
    return SupplyRequest.findAll({
      where: { clinicId, isDeleted: false },
      include: includeRelations,
      order: [["createdAt", "DESC"]],
    });
  }

  async updateStatus(id: number, status: string): Promise<SupplyRequest | null> {
    const request = await SupplyRequest.findByPk(id);
    if (!request) return null;
    return request.update({ status: status as SupplyRequest["status"] });
  }

  // Eliminación LÓGICA: marca isDeleted = true, nunca borra la fila
  async softDelete(id: number): Promise<boolean> {
    const [affectedRows] = await SupplyRequest.update({ isDeleted: true }, { where: { id } });
    return affectedRows > 0;
  }
}
