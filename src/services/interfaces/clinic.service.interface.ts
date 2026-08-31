import { Clinic } from "../../models/Clinic";
import { CreateClinicDTO, UpdateClinicDTO } from "../../dtos/clinic.dto";

export interface IClinicService {
  createClinic(data: CreateClinicDTO): Promise<Clinic>;
  getAllClinics(): Promise<Clinic[]>;
  getClinicById(id: number): Promise<Clinic>;
  updateClinic(id: number, data: UpdateClinicDTO): Promise<Clinic>;
  deleteClinic(id: number): Promise<void>;
}
