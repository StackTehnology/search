import { Optional } from "sequelize/types"

export type CreateUserDTO = {
  name: string;
  email: string;
  passwordHash: string;
}

export type LoginUserDTO = Optional<CreateUserDTO, 'name'>
