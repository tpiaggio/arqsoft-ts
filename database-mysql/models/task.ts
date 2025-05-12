import { DataTypes, Model } from 'sequelize';
import sequelize from "../db";

export class Task extends Model {
  public id!: number;
  public title!: string;
  public completed!: boolean;
  public userId!: number;
}

Task.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    completed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    userId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: 'Users', // name of the User table
        key: 'id',
      },
    },
  },
  {
    sequelize,
    tableName: 'Tasks',
  }
);
