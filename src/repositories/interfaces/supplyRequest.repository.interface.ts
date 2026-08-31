import { SupplyRequest, SupplyRequestCreationAttributes } from "../../models/SupplyRequest";

export interface ISupplyRequestRepository {
  create(data: SupplyRequestCreationAttributes): Promise<SupplyRequest>;
  findAllActive(): Promise<SupplyRequest[]>;
  findById(id: number): Promise<SupplyRequest | null>;
  findByClinicId(clinicId: number): Promise<SupplyRequest[]>;
  updateStatus(id: number, status: string): Promise<SupplyRequest | null>;
  softDelete(id: number): Promise<boolean>;
}
