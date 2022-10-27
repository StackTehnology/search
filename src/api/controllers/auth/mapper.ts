import {IUser} from '../../interfaces'
import User, { UserOutput } from '../../../db/models/User'

export const toRegisterUser = (user: UserOutput): IUser => {
  return {
    email: user.email,
    name: user.name,
    password: user.passwordHash,
  }
}
export type TokenPayload = Pick<User,'id'|'name'>
export const toSignToken = (user: UserOutput): TokenPayload  => {
  return {
    id: user.id,
    name: user.name,
  }
}