import { Clinic, ClinicCreationAttributes } from "../models/Clinic";
import { IClinicRepository } from "./interfaces/clinic.repository.interface";

export class ClinicRepository implements IClinicRepository {
  async create(data: ClinicCreationAttributes): Promise<Clinic> {
    return Clinic.create(data);
  }

  // Nunca se listan las eliminadas lógicamente (isDeleted = true)
  async findAll(): Promise<Clinic[]> {
    return Clinic.findAll({ where: { isDeleted: false } });
  }

  async findById(id: number): Promise<Clinic | null> {
    return Clinic.findOne({ where: { id, isDeleted: false } });
  }

  async findByNit(nit: string): Promise<Clinic | null> {
    return Clinic.findOne({ where: { nit, isDeleted: false } });
  }

  async update(id: number, data: Partial<ClinicCreationAttributes>): Promise<Clinic | null> {
    const clinic = await Clinic.findByPk(id);
    if (!clinic) return null;
    return clinic.update(data);
  }

  // Eliminación LÓGICA: no se borra la fila, solo se marca isDeleted = true
  async softDelete(id: number): Promise<boolean> {
    const [affectedRows] = await Clinic.update({ isDeleted: true }, { where: { id } });
    return affectedRows > 0;
  }
}
