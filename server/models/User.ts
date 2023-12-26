import mongoose, { Schema } from 'mongoose'

type UserDocument = Document & {
  name?: string
  email: string
  password: string
  image: string
  admin: boolean
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const userSchema = new Schema<UserDocument>(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate: {
        validator: function (value: string) {
          return emailRegex.test(value)
        },
        message: 'Invalid email format',
      },
    },
    password: {
      type: String,
      trim: true,
    },
    image: {
      type: String,
      lowercase: true,
      default: '86fd7bcf-7c0b-45e0-92d2-f71f143c1eb7.webp',
    },
    admin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
)

const User = mongoose.model<UserDocument>('User', userSchema)

export default User
