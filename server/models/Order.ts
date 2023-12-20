import mongoose, { Schema } from 'mongoose'
import { MenuItem } from '~/types'

type OrderSchemaDocument = Document & {
  userEmail: string
  phoneNumber: number
  streetAddress: string
  city: string
  postalCode: string
  country: string
  orderItems: MenuItem[]
  isPaid: boolean
}

const orderSchema = new Schema<OrderSchemaDocument>(
  {
    userEmail: { type: String },
    phoneNumber: { type: Number },
    streetAddress: { type: String },
    city: { type: String },
    postalCode: { type: String },
    country: { type: String },
    orderItems: { type: [MenuItem] },
    isPaid: { type: Boolean, default: false },
  },
  { timestamps: true }
)

const Order = mongoose.model<OrderSchemaDocument>('Order', orderSchema)

export default Order
