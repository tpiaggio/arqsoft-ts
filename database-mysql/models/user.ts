import { DataTypes, Model } from "sequelize";
import sequelize from "../db";

export class User extends Model {
  public id!: number;
  public firstName!: string;
  public lastName?: string;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'Users',
  }
);

export default User;
