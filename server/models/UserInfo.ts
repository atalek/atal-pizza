import mongoose, { Document, Schema } from 'mongoose'

export type UserInfoDocument = Document & {
  email: string
  streetAddress: string
  postalCode: string
  city: string
  country: string
  phone: string
  admin: boolean
}

const userInfoSchema = new Schema<UserInfoDocument>(
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

const UserInfo = mongoose.model<UserInfoDocument>('UserInfo', userInfoSchema)

export default UserInfo
