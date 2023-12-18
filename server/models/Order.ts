import mongoose, { Schema } from 'mongoose'

type OrderSchemaDocument = Document & {
  userEmail: string
  phoneNumber: number
  streetAddress: string
  city: string
  country: string
  orderItems: {}
  isPaid: boolean
}

const orderSchema = new Schema<OrderSchemaDocument>(
  {
    userEmail: { type: String },
    phoneNumber: { type: Number },
    streetAddress: { type: String },
    city: { type: String },
    country: { type: String },
    orderItems: { type: Object },
    isPaid: { type: Boolean, default: false },
  },
  { timestamps: true }
)

const Order = mongoose.model<OrderSchemaDocument>('Order', orderSchema)

export default Order
