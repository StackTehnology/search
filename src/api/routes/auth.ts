import { Router } from 'express'
import { loginHandler, registerHandler } from '../controllers/auth'
import { validate } from '../middlewares/validate'
import { createUserSchema, loginUserSchema } from '../schemas/user.schema'
const authRouter = Router()

authRouter.post('/login', validate(loginUserSchema), loginHandler)
authRouter.post('/register', validate(createUserSchema), registerHandler)

export default authRouter