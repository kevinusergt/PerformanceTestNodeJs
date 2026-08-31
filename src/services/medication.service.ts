import { IMedicationService } from "./interfaces/medication.service.interface";
import { IMedicationRepository } from "../repositories/interfaces/medication.repository.interface";
import { IWarehouseRepository } from "../repositories/interfaces/warehouse.repository.interface";
import { CreateMedicationDTO, UpdateMedicationDTO } from "../dtos/medication.dto";
import { Medication } from "../models/Medication";
import { AppError } from "../utils/AppError";

export class MedicationService implements IMedicationService {
  constructor(
    private medicationRepository: IMedicationRepository,
    private warehouseRepository: IWarehouseRepository
  ) {}

  async createMedication(data: CreateMedicationDTO): Promise<Medication> {
    if (!data.name || data.warehouseId === undefined || data.stock === undefined) {
      throw new AppError("Nombre, warehouseId y stock son obligatorios.", 400);
    }
    if (data.stock < 0) {
      throw new AppError("El stock no puede ser negativo.", 400);
    }

    // El almacén al que pertenece el medicamento debe existir
    const warehouse = await this.warehouseRepository.findById(data.warehouseId);
    if (!warehouse) {
      throw new AppError("El almacén indicado no existe.", 404);
    }

    return this.medicationRepository.create(data);
  }

  async getAllMedications(): Promise<Medication[]> {
    return this.medicationRepository.findAll();
  }

  async getMedicationById(id: number): Promise<Medication> {
    const medication = await this.medicationRepository.findById(id);
    if (!medication) {
      throw new AppError("Medicamento no encontrado.", 404);
    }
    return medication;
  }

  async updateMedication(id: number, data: UpdateMedicationDTO): Promise<Medication> {
    const existingMedication = await this.medicationRepository.findById(id);
    if (!existingMedication) {
      throw new AppError("Medicamento no encontrado.", 404);
    }
    if (data.stock !== undefined && data.stock < 0) {
      throw new AppError("El stock no puede ser negativo.", 400);
    }
    const updatedMedication = await this.medicationRepository.update(id, data);
    return updatedMedication as Medication;
  }

  async deleteMedication(id: number): Promise<void> {
    const existingMedication = await this.medicationRepository.findById(id);
    if (!existingMedication) {
      throw new AppError("Medicamento no encontrado.", 404);
    }
    await this.medicationRepository.softDelete(id);
  }
}
