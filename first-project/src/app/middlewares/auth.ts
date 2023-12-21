import { NextFunction, Request, Response } from 'express'
import catchAsync from '../utils/catchAsync'
import AppError from '../errors/AppError'
import httpStatus from 'http-status'
import jwt from 'jsonwebtoken'

const auth = () => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization

    // if the token is sent from the client
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!')
    }

    // check if the token is valid
    jwt.verify(
      token,
      process.env.JWT_SECRET as string,
      (error, decoded: any) => {
        if (error) {
          throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!')
        }
        req.user = decoded
      },
    )

    next()
  })
}

export default auth
