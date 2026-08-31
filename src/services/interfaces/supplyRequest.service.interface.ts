import { SupplyRequest } from "../../models/SupplyRequest";
import { CreateSupplyRequestDTO, UpdateSupplyRequestStatusDTO } from "../../dtos/supplyRequest.dto";

export interface ISupplyRequestService {
  createRequest(data: CreateSupplyRequestDTO): Promise<SupplyRequest>;
  getActiveRequests(): Promise<SupplyRequest[]>;
  getRequestById(id: number): Promise<SupplyRequest>;
  getHistoryByClinic(clinicId: number): Promise<SupplyRequest[]>;
  updateStatus(id: number, data: UpdateSupplyRequestStatusDTO): Promise<SupplyRequest>;
  deleteRequest(id: number): Promise<void>;
}
