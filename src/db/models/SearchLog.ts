import { DataTypes, Model, Optional } from 'sequelize'
import sequelizeConnection from '../config'
import User from './User'

interface SearchLogAttributes {
  id: number;
  userId: number;
  //@todo input is need to be type of searchFilter
  input: string;
  client: string;
  ipAddress: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export interface SearchLogInput extends Optional<SearchLogAttributes, 'id'> {}
export interface SearchLogOutput extends Required<SearchLogAttributes> {}

class SearchLog extends Model<SearchLogAttributes, SearchLogInput> implements SearchLogAttributes {
  public id!: number;
  public userId!: number;
  public input!: string;
  public client!: string;
  public ipAddress!: string;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;
}

SearchLog.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id'
    },
  },
  input: {
    type:DataTypes.STRING,
    allowNull: false
  },
  client: {
    type:DataTypes.STRING,
    allowNull: false
  },
  ipAddress: {
    type:DataTypes.STRING,
    allowNull: false
  },
}, {
  sequelize: sequelizeConnection,
  paranoid: true,
  timestamps: true,
  freezeTableName: true,
  tableName: 'searchLogs',
})

User.hasMany(SearchLog,
  {
    sourceKey: 'id',
    foreignKey: 'userId',
    as: 'searchLogs'
  })

export default SearchLog