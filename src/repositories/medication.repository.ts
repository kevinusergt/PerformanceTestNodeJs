import { Medication, MedicationCreationAttributes } from "../models/Medication";
import { IMedicationRepository } from "./interfaces/medication.repository.interface";

export class MedicationRepository implements IMedicationRepository {
  async create(data: MedicationCreationAttributes): Promise<Medication> {
    return Medication.create(data);
  }

  async findAll(): Promise<Medication[]> {
    return Medication.findAll({ where: { isDeleted: false } });
  }

  async findById(id: number): Promise<Medication | null> {
    return Medication.findOne({ where: { id, isDeleted: false } });
  }
 
  async update(
    id: number,
    data: Partial<MedicationCreationAttributes>
  ): Promise<Medication | null> {
    const medication = await Medication.findByPk(id);
    if (!medication) return null;
    return medication.update(data);
  }

  async softDelete(id: number): Promise<boolean> {
    const [affectedRows] = await Medication.update({ isDeleted: true }, { where: { id } });
    return affectedRows > 0;
  }
}
