import { Medication } from "../../models/Medication";
import { CreateMedicationDTO, UpdateMedicationDTO } from "../../dtos/medication.dto";

export interface IMedicationService {
  createMedication(data: CreateMedicationDTO): Promise<Medication>;
  getAllMedications(): Promise<Medication[]>;
  getMedicationById(id: number): Promise<Medication>;
  updateMedication(id: number, data: UpdateMedicationDTO): Promise<Medication>;
  deleteMedication(id: number): Promise<void>;
}
