import { RequestStatus } from "../models/SupplyRequest";

export interface CreateSupplyRequestDTO {
  clinicId: number;
  medicationId: number;
  warehouseId: number;
  quantityRequested: number;
}

export interface UpdateSupplyRequestStatusDTO {
  status: RequestStatus;
}
