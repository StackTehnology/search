import { DataTypes, Model, Optional } from 'sequelize'
import sequelizeConnection from '../config'
import User from './User'
import Role from './Role'


interface OrganizationAttributes {
  id: number;
  name: string
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export interface OrganizationInput extends Optional<OrganizationAttributes, 'id'> {}
export interface OrganizationOutput extends Required<OrganizationAttributes> {}

class Organization extends Model<OrganizationAttributes, OrganizationInput> implements OrganizationAttributes {
  public id!: number;
  public name!: string;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;
}

Organization.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
  },

}, {
  sequelize: sequelizeConnection,
  paranoid: true,
  timestamps: true,
  freezeTableName: true
})

export default Organization