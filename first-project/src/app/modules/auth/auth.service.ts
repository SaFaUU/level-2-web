import httpStatus from 'http-status'
import AppError from '../../errors/AppError'
import { User } from '../user/user.model'
import { TLoginUser } from './auth.interface'
import jwt from 'jsonwebtoken'
import config from '../../config'

const loginUser = async (payload: TLoginUser) => {
  const userData = await User.isUserExistsByCustomId(payload?.id)

  // checking if the user exists
  if (!userData) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found!')
  }
  // checking if the user is already deleted
  if (userData.isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is already deleted!')
  }
  // checking if the user is blocked
  if (userData.status === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked!')
  }

  //  checking if the password is correct
  if (!(await User.isPasswordMatched(payload?.password, userData?.password))) {
    throw new AppError(httpStatus.FORBIDDEN, 'Password is incorrect!')
  }
  // create a token for the user
  const jwtPayload = {
    userId: userData.id,
    role: userData.role,
  }
  const accessToken = jwt.sign(jwtPayload, config.JWT_ACCESS_SECRET as string, {
    expiresIn: '10d',
  })

  return {
    accessToken,
    needsPasswordChange: userData.needsPasswordChange,
  }
}

export const AuthServices = {
  loginUser,
}
