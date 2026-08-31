export interface CreateMedicationDTO {
  name: string;
  description?: string;
  warehouseId: number;
  stock: number;
}

export interface UpdateMedicationDTO {
  name?: string;
  description?: string;
  warehouseId?: number;
  stock?: number;
}
