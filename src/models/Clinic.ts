import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/database";

export interface ClinicAttributes {
  id: number;
  name: string;
  nit: string; // identificador único de la clínica (regla de negocio: no duplicados)
  address: string;
  responsibleName: string;
  responsiblePhone: string;
  isDeleted: boolean; // eliminación lógica
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ClinicCreationAttributes
  extends Optional<ClinicAttributes, "id" | "isDeleted" | "createdAt" | "updatedAt"> {}

export class Clinic
  extends Model<ClinicAttributes, ClinicCreationAttributes>
  implements ClinicAttributes
{
  declare id: number;
  declare name: string;
  declare nit: string;
  declare address: string;
  declare responsibleName: string;
  declare responsiblePhone: string;
  declare isDeleted: boolean;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

Clinic.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    nit: { type: DataTypes.STRING, allowNull: false, unique: true },
    address: { type: DataTypes.STRING, allowNull: false },
    responsibleName: { type: DataTypes.STRING, allowNull: false, field: "responsible_name" },
    responsiblePhone: { type: DataTypes.STRING, allowNull: false, field: "responsible_phone" },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      field: "is_deleted",
    },
  },
  { sequelize, tableName: "clinics", timestamps: true }
);
