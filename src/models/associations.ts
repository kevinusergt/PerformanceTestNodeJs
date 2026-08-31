import { User } from "./User";
import { Clinic } from "./Clinic";
import { Warehouse } from "./Warehouse";
import { Medication } from "./Medication";
import { SupplyRequest } from "./SupplyRequest";

// Warehouse 1:N Medication (un almacén tiene muchos medicamentos con stock)
Warehouse.hasMany(Medication, { foreignKey: "warehouseId", as: "medications" });
Medication.belongsTo(Warehouse, { foreignKey: "warehouseId", as: "warehouse" });

// Clinic 1:N SupplyRequest
Clinic.hasMany(SupplyRequest, { foreignKey: "clinicId", as: "requests" });
SupplyRequest.belongsTo(Clinic, { foreignKey: "clinicId", as: "clinic" });

// Medication 1:N SupplyRequest
Medication.hasMany(SupplyRequest, { foreignKey: "medicationId", as: "requests" });
SupplyRequest.belongsTo(Medication, { foreignKey: "medicationId", as: "medication" });

// Warehouse 1:N SupplyRequest
Warehouse.hasMany(SupplyRequest, { foreignKey: "warehouseId", as: "requests" });
SupplyRequest.belongsTo(Warehouse, { foreignKey: "warehouseId", as: "warehouse" });

export { User, Clinic, Warehouse, Medication, SupplyRequest };
