import { User } from '../models'
import { UserInput, UserOutput } from '../models/User'
import getOrThrowAsync from '../../utils/getOrThrow'


export const create = async (payload: UserInput): Promise<UserOutput> => {
  return getOrThrowAsync(User.create(payload))
}

export const update = async (id: number, payload: Partial<UserInput>): Promise<UserOutput> => {
  const user = await User.findByPk(id)

  if (!user) {
    // @todo throw custom error
    throw new Error('user not found')
  }

  return user.update(payload)
}

export const deleteById = async (id: number): Promise<boolean> => {
  const deletedUser = await User.destroy({
    where: {id}
  })

  return !!deletedUser
}

export const getAll = async (): Promise<UserOutput[]> => {
  return User.findAll()
}

export const checkUserByEmail = async (email: string): Promise<UserOutput | null>  => {
  return await User.findOne({ where: {email} })
}
