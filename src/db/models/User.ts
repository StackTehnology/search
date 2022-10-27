import { DataTypes, Model, Optional } from 'sequelize'
import sequelizeConnection from '../config'
import Role from './Role'
import bcrypt from 'bcrypt'
import Organization from './Organization'


export enum UserStatus  {
   Active = 'Active',
   Pending = 'Pending',
   Disabled = 'Disable'
}

interface UserAttributes {
  id: number;
  name: string;
  email: string;
  status: UserStatus;
  roleId: number;
  organizationId: number;
  passwordHash: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export interface UserInput extends Optional<UserAttributes, 'id'|'status'> {}
export interface UserOutput extends Required<UserAttributes> {}

class User extends Model<UserAttributes, UserInput> implements UserAttributes {
  public id!: number;
  public name!: string;
  public email!: string;
  public status!: UserStatus;
  public roleId!: number;
  public organizationId!: number;
  public passwordHash!: string;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;

   static async comparePasswords(hashedPassword: string, candidatePassword: string) {
     return bcrypt.compareSync(candidatePassword, hashedPassword);
   }
}

User.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  status: {
    type: DataTypes.ENUM(UserStatus.Active,UserStatus.Disabled,UserStatus.Pending),
    defaultValue: UserStatus.Pending
  },

  roleId: {
    type: DataTypes.INTEGER,
    references: {
      model: Role,
      key: 'id'
    },
  },

  organizationId: {
    type: DataTypes.INTEGER,
    references: {
      model: Organization,
      key: 'id'
    },
  },

  passwordHash: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },



}, {
  sequelize: sequelizeConnection,
  paranoid: true,
  timestamps: true,
  freezeTableName: true
})

 User.beforeSave(async (user, options) => {
   if (user.changed("passwordHash"))
     user.passwordHash = bcrypt.hashSync(user.passwordHash, bcrypt.genSaltSync(10))
   })

Role.belongsToMany(Organization, { through: User})

export default User

