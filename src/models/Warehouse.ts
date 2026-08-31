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
  public id!: number;
  public name!: string;
  public location!: string;
  public isDeleted!: boolean;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
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
