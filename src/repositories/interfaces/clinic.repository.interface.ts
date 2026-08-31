import { Clinic, ClinicCreationAttributes } from "../../models/Clinic";

export interface IClinicRepository {
  create(data: ClinicCreationAttributes): Promise<Clinic>;
  findAll(): Promise<Clinic[]>;
  findById(id: number): Promise<Clinic | null>;
  findByNit(nit: string): Promise<Clinic | null>;
  update(id: number, data: Partial<ClinicCreationAttributes>): Promise<Clinic | null>;
  softDelete(id: number): Promise<boolean>;
}
