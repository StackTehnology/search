import { DataTypes, Model, Optional } from 'sequelize'
import sequelizeConnection from '../config'
import User from './User'

interface ViewLogAttributes {
  id: number;
  folderId: string;
  userId: string;
  reasonId: string;
  openDate: Date;
  closeDate: Date;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export interface ViewLogInput extends Optional<ViewLogAttributes, 'id'> {}
export interface ViewLogOutput extends Required<ViewLogAttributes> {}

class ViewLog extends Model<ViewLogAttributes, ViewLogInput> implements ViewLogAttributes {
  public id!: number;
  public folderId!: string;
  public userId!: string
  public reasonId!: string;
  public openDate!: Date;
  public closeDate!: Date;
  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;
}

ViewLog.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  folderId: {
    type:DataTypes.STRING,
  },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id'
    },
  },
  reasonId: {
    type:DataTypes.STRING,
  },
  openDate: {
    type:DataTypes.DATE,
  },
  closeDate: {
    type:DataTypes.DATE,
  },
}, {
  sequelize: sequelizeConnection,
  paranoid: true,
  timestamps: true,
  freezeTableName: true
})

//User.hasMany(ViewLog)

export default ViewLog