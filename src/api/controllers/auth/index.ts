
import * as mapper from './mapper'
import * as service from '../../../db/services/AuthService'
import { CreateUserDTO } from '../../dto/user.dto'
import {CookieOptions, NextFunction, Request, Response } from 'express';
import { CreateUserInput, LoginUserInput } from '../../schemas/user.schema'
import AppError from '../../../utils/appError'
import User from '../../../db/models/User'
import { signToken } from '../../../db/services/AuthService'
import config from 'config'


// Cookie options
const accessTokenCookieOptions: CookieOptions = {
  expires: new Date(
    Date.now() + config.get<number>('accessTokenExpiresIn') * 60 * 1000
  ),
  maxAge: config.get<number>('accessTokenExpiresIn') * 60 * 1000,
  httpOnly: true,
  sameSite: 'lax',
};

export const registerHandler = async (
  req: Request<{}, {}, CreateUserInput>,
  res: Response,
  next: NextFunction
) => {

  try{

    const { email, name, organizationId, roleId, password: passwordHash} = req.body

    const checkUser = await service.findUserRegister(email)

    if(checkUser){
    return res.status(409).json({
      status: 'fail',
      message: 'Email already exist',
    });

    }

      const user = await service.createUser({
        organizationId,
        roleId,
        email,
        name,
        passwordHash
      })
    res.status(201).json({
      status: 'success',
      data: {
        user,
      },
    });
  }catch (err:any) {
    next(err);
  }
}

export const loginHandler = async (
  req: Request<{}, {}, LoginUserInput>,
  res: Response,
  next: NextFunction
) => {
  try {

      const {email, password} = req.body

      const user = await service.findUserRegister(email)
    console.log("user",user)
    if(!user) {
       return next(new AppError('User is not register', 401));
    }

     const checkPassword = await User.comparePasswords(user.passwordHash,password)

      if(!checkPassword) {
        return next(new AppError('Invalid password', 401));
      }

      const accessToken  = await signToken(mapper.toSignToken(user));

    // Send Access Token in Cookie
    res.cookie('accessToken', accessToken, accessTokenCookieOptions);
    res.cookie('logged_in', true, {
      ...accessTokenCookieOptions,
      httpOnly: false,
    });

 // Send Access Token
    res.status(200).json({
      status: 'success',
      accessToken,
    });


  }
  catch (err:any) {
    next(err);
  }
}