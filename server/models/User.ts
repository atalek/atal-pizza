import mongoose, { Schema } from 'mongoose'

type UserDocument = Document & {
  name?: string
  email: string
  password: string
  image: string
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const userSchema = new Schema<UserDocument>({
  name: {
    type: String,
    lowercase: true,
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
  },
})

const User = mongoose.model<UserDocument>('User', userSchema)

export default User
