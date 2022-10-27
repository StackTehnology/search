import { DataTypes, Model, Optional } from 'sequelize'
import sequelizeConnection from '../config'

export enum UserRole  {
  User = 'User',
  SuperUser = 'SuperUser',
  Admin = 'Admin',
}

interface RoleAttributes {
  id: number;
  name: UserRole;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export interface RoleInput extends Optional<RoleAttributes, 'id'> {}
export interface RoleOutput extends Required<RoleAttributes> {}

class Role extends Model<RoleAttributes, RoleInput> implements RoleAttributes {
  public id!: number;
  public name!: UserRole;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;
}

Role.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.ENUM(UserRole.User,UserRole.SuperUser,UserRole.Admin),
    defaultValue: UserRole.User
  },

}, {
  sequelize: sequelizeConnection,
  paranoid: true,
  timestamps: true,
  freezeTableName: true
})

export default Role