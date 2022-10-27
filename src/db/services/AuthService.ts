import { UserInput, UserOutput } from '../models/User'
import * as userDal from '../dal/user'
import { User } from '../models'
import getOrThrowAsync from '../../utils/getOrThrow'
import { signJwt } from '../../utils/jwt'
import config from 'config'
import { TokenPayload } from '../../api/controllers/auth/mapper'

export const createUser = async (payload: UserInput) => {
  return userDal.create(payload)
}
//https://jasonwatmore.com/post/2020/07/20/nodejs-hash-and-verify-passwords-with-bcrypt
export const authenticateUser = async (email: string, password: string) => {
       userDal.checkUserByEmail(email).then((user)=> {
              if(user?.email) {
                return User.comparePasswords(password, user.passwordHash)
              }
              return false
  })
}

export const findUserRegister = async (email: string) => {
    const user = await userDal.checkUserByEmail(email)
    if(user) {
      return user
    }
    return false
}

export const signToken = async (tokenPayload: TokenPayload) => {
  const access_token = signJwt(
    { sub: tokenPayload.id },
    {
      expiresIn: `${config.get<number>('accessTokenExpiresIn')}m`,
    }
  );
    return access_token
}

//https://codevoweb.com/node-typescript-mongodb-jwt-authentication/