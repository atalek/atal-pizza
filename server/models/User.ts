import mongoose, { Schema } from 'mongoose'
import bcrypt from 'bcrypt'

export interface UserDocument extends Document {
  email: string
  password: string
  matchPassword(enteredPassword: string): Promise<boolean>
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const userSchema = new Schema<UserDocument>({
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
    required: true,
    trim: true,
    validate: {
      validator: function (value: string) {
        /* Password must be at least 8 characters long, contain at least 1 number, 1 uppercase letter, and 1 symbol */
        const passwordRegex = /^(?=.*\d)(?=.*[A-Z])(?=.*\W).{8,}$/
        return passwordRegex.test(value)
      },
      message:
        'Password must be at least 8 characters long with 1 number, 1 uppercase letter, and 1 symbol',
    },
  },
})

// Match user entered password to hashed password in database
userSchema.methods.matchPassword = async function (enteredPassword: string) {
  return await bcrypt.compare(enteredPassword, this.password)
}

// Encrypt password using bcrypt
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next()
  }

  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

const User = mongoose.model<UserDocument>('User', userSchema)

export default User
