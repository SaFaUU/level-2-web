/* eslint-disable no-unused-vars */
import { Model } from 'mongoose'
import { USER_ROLE } from './user.constant'

export interface TUser {
  id: string
  email: string
  password: string
  needsPasswordChange: boolean
  passwordChangedAt?: Date
  role: 'super-admin' | 'admin' | 'student' | 'faculty'
  status: 'in-progress' | 'blocked'
  isDeleted: boolean
}

export type NewUser = {
  id: string
  password: string
  role: string
}

export interface UserModel extends Model<TUser> {
  // myStaticMethod(): string
  isUserExistsByCustomId(id: string): Promise<TUser>
  isUserDeletedByCustomId(id: string): Promise<TUser>
  isUserBlockedByCustomId(id: string): Promise<TUser>
  isPasswordMatched(
    candidatePassword: string,
    hashedPassword: string,
  ): Promise<boolean>
  isJWTIssuedBeforePasswordChanged: (
    passwordChangedTimeStamp: Date,
    jwtIssuedTimestamp: number,
  ) => boolean
}

export type TUserRole = keyof typeof USER_ROLE
