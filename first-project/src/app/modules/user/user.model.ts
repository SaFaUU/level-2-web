import { Schema, model } from 'mongoose'
import { TUser, UserModel } from './user.interface'
import bcrypt from 'bcrypt'
import config from '../../config'

const userSchema = new Schema<TUser, UserModel>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    needsPasswordChange: {
      type: Boolean,
      default: true,
    },
    role: {
      type: String,
      enum: ['student', 'faculty', 'admin'],
    },
    status: {
      type: String,
      enum: ['in-progress', 'blocked'],
      default: 'in-progress',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
)

// presave middleware/ hook
userSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salf_rounds),
  )
  next()
})

// set '' after saving password
userSchema.post('save', function (doc, next) {
  doc.password = ''
  next()
})

userSchema.statics.isUserExistsByCustomId = async function (id: string) {
  return await User.findOne({
    id,
  })
}

userSchema.statics.isUserDeletedByCustomId = async function (id: string) {
  return await User.findOne({
    id,
  })
}

userSchema.statics.isUserBlockedByCustomId = async function (id: string) {
  return await User.findOne({
    id,
  })
}

userSchema.statics.isPasswordMatched = async function (
  candidatePassword: string,
  hashedPassword: string,
) {
  return await bcrypt.compare(candidatePassword, hashedPassword)
}

export const User = model<TUser, UserModel>('User', userSchema)
