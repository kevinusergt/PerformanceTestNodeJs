import { ISupplyRequestService } from "./interfaces/supplyRequest.service.interface";
import { ISupplyRequestRepository } from "../repositories/interfaces/supplyRequest.repository.interface";
import { IClinicRepository } from "../repositories/interfaces/clinic.repository.interface";
import { IMedicationRepository } from "../repositories/interfaces/medication.repository.interface";
import { IWarehouseRepository } from "../repositories/interfaces/warehouse.repository.interface";
import {
  CreateSupplyRequestDTO,
  UpdateSupplyRequestStatusDTO,
} from "../dtos/supplyRequest.dto";
import { SupplyRequest, RequestStatus } from "../models/SupplyRequest";
import { AppError } from "../utils/AppError";

// Estados válidos permitidos para actualizar una solicitud
const VALID_STATUSES: RequestStatus[] = ["PENDIENTE", "APROBADA", "RECHAZADA", "ENTREGADA"];

export class SupplyRequestService implements ISupplyRequestService {
  constructor(
    private supplyRequestRepository: ISupplyRequestRepository,
    private clinicRepository: IClinicRepository,
    private medicationRepository: IMedicationRepository,
    private warehouseRepository: IWarehouseRepository
  ) {}

  async createRequest(data: CreateSupplyRequestDTO): Promise<SupplyRequest> {
    if (!data.clinicId || !data.medicationId || !data.warehouseId || !data.quantityRequested) {
      throw new AppError(
        "clinicId, medicationId, warehouseId y quantityRequested son obligatorios.",
        400
      );
    }

    // Regla: la cantidad solicitada debe ser mayor que cero
    if (data.quantityRequested <= 0) {
      throw new AppError("La cantidad solicitada debe ser mayor que cero.", 400);
    }

    // Regla: la clínica debe existir
    const clinic = await this.clinicRepository.findById(data.clinicId);
    if (!clinic) {
      throw new AppError("La clínica indicada no existe.", 404);
    }

    // Regla: el medicamento debe existir
    const medication = await this.medicationRepository.findById(data.medicationId);
    if (!medication) {
      throw new AppError("El medicamento indicado no existe.", 404);
    }

    // Regla: el almacén debe existir
    const warehouse = await this.warehouseRepository.findById(data.warehouseId);
    if (!warehouse) {
      throw new AppError("El almacén indicado no existe.", 404);
    }

    // Regla: el medicamento debe pertenecer a ese almacén
    if (medication.warehouseId !== data.warehouseId) {
      throw new AppError("Ese medicamento no pertenece al almacén indicado.", 400);
    }

    // Regla: debe haber inventario suficiente
    if (medication.stock < data.quantityRequested) {
      throw new AppError("El almacén no tiene inventario suficiente de ese medicamento.", 400);
    }

    // Se descuenta el stock reservado para esta solicitud
    await this.medicationRepository.update(medication.id, {
      stock: medication.stock - data.quantityRequested,
    });

    return this.supplyRequestRepository.create({
      clinicId: data.clinicId,
      medicationId: data.medicationId,
      warehouseId: data.warehouseId,
      quantityRequested: data.quantityRequested,
      status: "PENDIENTE",
    });
  }

  async getActiveRequests(): Promise<SupplyRequest[]> {
    return this.supplyRequestRepository.findAllActive();
  }

  async getRequestById(id: number): Promise<SupplyRequest> {
    const request = await this.supplyRequestRepository.findById(id);
    if (!request) {
      throw new AppError("Solicitud no encontrada.", 404);
    }
    return request;
  }

  async getHistoryByClinic(clinicId: number): Promise<SupplyRequest[]> {
    const clinic = await this.clinicRepository.findById(clinicId);
    if (!clinic) {
      throw new AppError("La clínica indicada no existe.", 404);
    }
    return this.supplyRequestRepository.findByClinicId(clinicId);
  }

  async updateStatus(id: number, data: UpdateSupplyRequestStatusDTO): Promise<SupplyRequest> {
    const existingRequest = await this.supplyRequestRepository.findById(id);
    if (!existingRequest) {
      throw new AppError("Solicitud no encontrada.", 404);
    }

    // Regla: no se puede actualizar a un estado no permitido
    if (!VALID_STATUSES.includes(data.status)) {
      throw new AppError(
        `Estado no válido. Los estados permitidos son: ${VALID_STATUSES.join(", ")}.`,
        400
      );
    }

    const updatedRequest = await this.supplyRequestRepository.updateStatus(id, data.status);
    return updatedRequest as SupplyRequest;
  }

  async deleteRequest(id: number): Promise<void> {
    const existingRequest = await this.supplyRequestRepository.findById(id);
    if (!existingRequest) {
      throw new AppError("Solicitud no encontrada.", 404);
    }
    // Eliminación lógica, no física: se conserva el histórico
    await this.supplyRequestRepository.softDelete(id);
  }
}
