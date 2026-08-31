import { User, UserCreationAttributes } from "../models/User";
import { Clinic, ClinicCreationAttributes } from "../models/Clinic";
import { Warehouse, WarehouseCreationAttributes } from "../models/Warehouse";
import { Medication, MedicationCreationAttributes } from "../models/Medication";
import bcrypt from "bcryptjs";
import { AppError } from "../utils/AppError";

// Estructura esperada del JSON que se sube por el endpoint de seed.
// Todas las llaves son opcionales: puedes subir solo "clinics", o el archivo
// completo con las cuatro entidades a la vez.
export interface SeedFileShape {
  users?: UserCreationAttributes[];
  clinics?: ClinicCreationAttributes[];
  warehouses?: WarehouseCreationAttributes[];
  medications?: MedicationCreationAttributes[];
}

export interface SeedResultSummary {
  usersCreated: number;
  clinicsCreated: number;
  warehousesCreated: number;
  medicationsCreated: number;
}

export class SeedService {
  // Recibe el buffer del archivo subido con multer, lo parsea como JSON
  // y crea (o reutiliza si ya existe) cada registro descrito ahí.
  async seedFromJsonBuffer(fileBuffer: Buffer): Promise<SeedResultSummary> {
    let parsedContent: SeedFileShape;

    try {
      parsedContent = JSON.parse(fileBuffer.toString("utf-8"));
    } catch (error) {
      throw new AppError("El archivo no contiene un JSON válido.", 400);
    }

    const summary: SeedResultSummary = {
      usersCreated: 0,
      clinicsCreated: 0,
      warehousesCreated: 0,
      medicationsCreated: 0,
    };

    // --- Usuarios ---
    if (parsedContent.users) {
      for (const userData of parsedContent.users) {
        const [, created] = await User.findOrCreate({
          where: { email: userData.email },
          defaults: {
            ...userData,
            password: await bcrypt.hash(userData.password, 10),
          },
        });
        if (created) summary.usersCreated++;
      }
    }

    // --- Clínicas ---
    if (parsedContent.clinics) {
      for (const clinicData of parsedContent.clinics) {
        const [, created] = await Clinic.findOrCreate({
          where: { nit: clinicData.nit },
          defaults: clinicData,
        });
        if (created) summary.clinicsCreated++;
      }
    }

    // --- Almacenes ---
    if (parsedContent.warehouses) {
      for (const warehouseData of parsedContent.warehouses) {
        const [, created] = await Warehouse.findOrCreate({
          where: { name: warehouseData.name },
          defaults: warehouseData,
        });
        if (created) summary.warehousesCreated++;
      }
    }

    // --- Medicamentos ---
    // Se siembran después de los almacenes porque dependen de warehouseId
    if (parsedContent.medications) {
      for (const medicationData of parsedContent.medications) {
        const [, created] = await Medication.findOrCreate({
          where: { name: medicationData.name, warehouseId: medicationData.warehouseId },
          defaults: medicationData,
        });
        if (created) summary.medicationsCreated++;
      }
    }

    return summary;
  }
}
