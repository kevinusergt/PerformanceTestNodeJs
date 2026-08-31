import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/database";

// El medicamento pertenece a un almacén específico y tiene un stock ahí.
// Así "administrar el inventario de medicamentos en los almacenes" queda
// resuelto: cada fila = "este medicamento, en este almacén, tiene X unidades".
export interface MedicationAttributes {
  id: number;
  name: string;
  description: string | null;
  warehouseId: number;
  stock: number;
  isDeleted: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface MedicationCreationAttributes
  extends Optional<
    MedicationAttributes,
    "id" | "description" | "isDeleted" | "createdAt" | "updatedAt"
  > {}

export class Medication
  extends Model<MedicationAttributes, MedicationCreationAttributes>
  implements MedicationAttributes
{
  declare id: number;
  declare name: string;
  declare description: string | null;
  declare warehouseId: number;
  declare stock: number;
  declare isDeleted: boolean;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

Medication.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.STRING, allowNull: true },
    warehouseId: { type: DataTypes.INTEGER, allowNull: false, field: "warehouse_id" },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: { min: 0 },
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      field: "is_deleted",
    },
  },
  { sequelize, tableName: "medications", timestamps: true }
);
