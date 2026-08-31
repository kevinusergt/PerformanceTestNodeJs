import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/database";

// Estados válidos de una solicitud (regla de negocio: "estados válidos de la solicitud")
export type RequestStatus = "PENDIENTE" | "APROBADA" | "RECHAZADA" | "ENTREGADA";

export interface SupplyRequestAttributes {
  id: number;
  clinicId: number;
  medicationId: number;
  warehouseId: number;
  quantityRequested: number;
  status: RequestStatus;
  isDeleted: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface SupplyRequestCreationAttributes
  extends Optional<
    SupplyRequestAttributes,
    "id" | "status" | "isDeleted" | "createdAt" | "updatedAt"
  > {}

// Se llama "SupplyRequest" y no "Request" porque Request ya es un tipo
// reservado de Express/Node, y usarlo como nombre de modelo genera conflictos.
export class SupplyRequest
  extends Model<SupplyRequestAttributes, SupplyRequestCreationAttributes>
  implements SupplyRequestAttributes
{
  public id!: number;
  public clinicId!: number;
  public medicationId!: number;
  public warehouseId!: number;
  public quantityRequested!: number;
  public status!: RequestStatus;
  public isDeleted!: boolean;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

SupplyRequest.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    clinicId: { type: DataTypes.INTEGER, allowNull: false, field: "clinic_id" },
    medicationId: { type: DataTypes.INTEGER, allowNull: false, field: "medication_id" },
    warehouseId: { type: DataTypes.INTEGER, allowNull: false, field: "warehouse_id" },
    quantityRequested: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "quantity_requested",
      validate: { min: 1 }, // regla: cantidad debe ser mayor a cero
    },
    status: {
      type: DataTypes.ENUM("PENDIENTE", "APROBADA", "RECHAZADA", "ENTREGADA"),
      allowNull: false,
      defaultValue: "PENDIENTE",
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      field: "is_deleted",
    },
  },
  { sequelize, tableName: "supply_requests", timestamps: true }
);
