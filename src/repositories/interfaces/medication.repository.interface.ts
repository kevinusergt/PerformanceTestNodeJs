import { Medication, MedicationCreationAttributes } from "../../models/Medication";

export interface IMedicationRepository {
  create(data: MedicationCreationAttributes): Promise<Medication>;
  findAll(): Promise<Medication[]>;
  findById(id: number): Promise<Medication | null>;
  update(id: number, data: Partial<MedicationCreationAttributes>): Promise<Medication | null>;
  softDelete(id: number): Promise<boolean>;
}
 