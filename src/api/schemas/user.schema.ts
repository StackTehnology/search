import { number, object, string, TypeOf } from 'zod'

export const createUserSchema = object({
  body: object({
    name: string({ required_error: 'Name is required' }),
    email: string({ required_error: 'Email is required' }).email(
      'Invalid email'
    ),
    password: string({ required_error: 'Password is required' })
      .min(8, 'Password must be more than 8 characters')
      .max(32, 'Password must be less than 32 characters'),
  roleId: number({ required_error: 'Role is required' }),
  organizationId: number({ required_error: 'Organization is required' }),
  }),
});

export const loginUserSchema = object({
  body: object({
    email: string({ required_error: 'Email is required' }).email(
      'Invalid email'
    ),
    password: string({ required_error: 'Password is required' }).min(
      8,
      'Invalid password'
    ),
  }),
});

export type CreateUserInput = TypeOf<typeof createUserSchema>['body'];
export type LoginUserInput = TypeOf<typeof loginUserSchema>['body'];
