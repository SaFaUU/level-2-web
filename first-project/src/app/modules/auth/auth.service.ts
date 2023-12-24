import httpStatus from 'http-status'
import AppError from '../../errors/AppError'
import { User } from '../user/user.model'
import { TLoginUser } from './auth.interface'
import jwt, { JwtPayload } from 'jsonwebtoken'
import config from '../../config'
import bcrypt from 'bcrypt'
import { createToken, verifyToken } from './auth.utils'
import { sendEmail } from '../../utils/sendEmail'

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
  const accessToken = createToken(
    jwtPayload,
    config.JWT_ACCESS_SECRET as string,
    config.JWT_ACCESS_EXPIRES_IN as string,
  )

  const refreshToken = createToken(
    jwtPayload,
    config.JWT_REFRESH_SECRET as string,
    config.JWT_REFRESH_EXPIRES_IN as string,
  )

  return {
    accessToken,
    refreshToken,
    needsPasswordChange: userData.needsPasswordChange,
  }
}

const changePassword = async (
  user: JwtPayload,
  payload: {
    oldPassword: string
    newPassword: string
  },
) => {
  const userData = await User.isUserExistsByCustomId(user?.userId)

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
  if (
    !(await User.isPasswordMatched(payload?.oldPassword, userData?.password))
  ) {
    throw new AppError(httpStatus.FORBIDDEN, 'Password is incorrect!')
  }

  // hash password
  const newHashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcrypt_salt_rounds),
  )

  await User.findOneAndUpdate(
    {
      id: user.userId,
      role: user.role,
    },
    {
      password: newHashedPassword,
      needsPasswordChange: false,
      passwordChangedAt: Date.now(),
    },
  )
  return null
}
const refreshToken = async (token: string) => {
  // checking if the given token is valid
  const decoded = verifyToken(token, config.JWT_REFRESH_SECRET as string)

  const { userId, iat } = decoded

  const user = await User.isUserExistsByCustomId(userId)

  // checking if the user exists
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found!')
  }
  // checking if the user is already deleted
  if (user.isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is already deleted!')
  }
  // checking if the user is blocked
  if (user.status === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked!')
  }

  if (
    user.passwordChangedAt &&
    User.isJWTIssuedBeforePasswordChanged(user.passwordChangedAt, iat as number)
  ) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!')
  }

  const jwtPayload = {
    userId: user.id,
    role: user.role,
  }
  const accessToken = createToken(
    jwtPayload,
    config.JWT_ACCESS_SECRET as string,
    config.JWT_ACCESS_EXPIRES_IN as string,
  )

  return {
    accessToken,
  }
}

const forgetPassword = async (userId: string) => {
  const user = await User.isUserExistsByCustomId(userId)
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found!')
  }
  // checking if the user is already deleted
  if (user.isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is already deleted!')
  }
  // checking if the user is blocked
  if (user.status === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked!')
  }

  const jwtPayload = {
    userId: user.id,
    role: user.role,
  }
  const resetToken = createToken(
    jwtPayload,
    config.JWT_ACCESS_SECRET as string,
    '15m',
  )

  const resetUILink = `${config.RESET_PASSWORD_UI_LINK}?id=${user.id}&token=${resetToken}`
  sendEmail(user.email, resetUILink)
}

const resetPassword = async (
  payload: { id: string; newPassword: string },
  token: string,
) => {
  const user = await User.isUserExistsByCustomId(payload.id)
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found!')
  }
  // checking if the user is already deleted
  if (user.isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is already deleted!')
  }
  // checking if the user is blocked
  if (user.status === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked!')
  }

  const decoded = jwt.verify(
    token,
    config.JWT_ACCESS_SECRET as string,
  ) as JwtPayload

  if (decoded.userId !== payload.id) {
    throw new AppError(httpStatus.FORBIDDEN, 'You are not forbidden!')
  }

  // hash password
  const newHashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcrypt_salt_rounds),
  )

  await User.findOneAndUpdate(
    {
      id: decoded.userId,
      role: decoded.role,
    },
    {
      password: newHashedPassword,
      needsPasswordChange: false,
      passwordChangedAt: Date.now(),
    },
  )
}

export const AuthServices = {
  loginUser,
  changePassword,
  refreshToken,
  forgetPassword,
  resetPassword,
}
