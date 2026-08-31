import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/database";

export interface WarehouseAttributes {
  id: number;
  name: string;
  location: string;
  isDeleted: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface WarehouseCreationAttributes
  extends Optional<WarehouseAttributes, "id" | "isDeleted" | "createdAt" | "updatedAt"> {}

export class Warehouse
  extends Model<WarehouseAttributes, WarehouseCreationAttributes>
  implements WarehouseAttributes
{
  declare id: number;
  declare name: string;
  declare location: string;
  declare isDeleted: boolean;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

Warehouse.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    location: { type: DataTypes.STRING, allowNull: false },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      field: "is_deleted",
    },
  },
  { sequelize, tableName: "warehouses", timestamps: true }
);
