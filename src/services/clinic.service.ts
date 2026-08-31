import { IClinicService } from "./interfaces/clinic.service.interface";
import { IClinicRepository } from "../repositories/interfaces/clinic.repository.interface";
import { CreateClinicDTO, UpdateClinicDTO } from "../dtos/clinic.dto";
import { Clinic } from "../models/Clinic";
import { AppError } from "../utils/AppError";

export class ClinicService implements IClinicService {
  constructor(private clinicRepository: IClinicRepository) {}

  async createClinic(data: CreateClinicDTO): Promise<Clinic> {
    if (!data.name || !data.nit || !data.address || !data.responsibleName || !data.responsiblePhone) {
      throw new AppError("Todos los campos de la clínica son obligatorios.", 400);
    }

    // Regla de negocio: no permitir dos clínicas con el mismo NIT
    const existingClinic = await this.clinicRepository.findByNit(data.nit);
    if (existingClinic) {
      throw new AppError("Ya existe una clínica registrada con ese NIT.", 409);
    }

    return this.clinicRepository.create(data);
  }

  async getAllClinics(): Promise<Clinic[]> {
    return this.clinicRepository.findAll();
  }

  async getClinicById(id: number): Promise<Clinic> {
    const clinic = await this.clinicRepository.findById(id);
    if (!clinic) {
      throw new AppError("Clínica no encontrada.", 404);
    }
    return clinic;
  }

  async updateClinic(id: number, data: UpdateClinicDTO): Promise<Clinic> {
    const existingClinic = await this.clinicRepository.findById(id);
    if (!existingClinic) {
      throw new AppError("Clínica no encontrada.", 404);
    }

    if (data.nit && data.nit !== existingClinic.nit) {
      const nitTaken = await this.clinicRepository.findByNit(data.nit);
      if (nitTaken) {
        throw new AppError("Ya existe una clínica registrada con ese NIT.", 409);
      }
    }

    const updatedClinic = await this.clinicRepository.update(id, data);
    return updatedClinic as Clinic;
  }

  async deleteClinic(id: number): Promise<void> {
    const existingClinic = await this.clinicRepository.findById(id);
    if (!existingClinic) {
      throw new AppError("Clínica no encontrada.", 404);
    }
    // Eliminación lógica, no física
    await this.clinicRepository.softDelete(id);
  }
}
