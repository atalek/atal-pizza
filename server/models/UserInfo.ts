import mongoose, { Schema } from 'mongoose'

type UserInfo = Document & {
  email: string
  streetAddress: string
  postalCode: string
  city: string
  country: string
  phone: string
  admin: boolean
}

const userInfoSchema = new Schema(
  {
    email: { type: String, required: true },
    streetAddress: { type: String },
    postalCode: { type: String },
    city: { type: String },
    country: { type: String },
    phone: { type: String },
    admin: { type: Boolean, default: false },
  },
  { timestamps: true }
)

const UserInfo = mongoose.model<UserInfo>('User', userInfoSchema)

export default UserInfo
