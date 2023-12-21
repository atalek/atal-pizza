import mongoose, { Schema } from 'mongoose'
import { MenuItemType } from '~/types'
import { menuItemsSchema } from './MenuItem'

type OrderSchemaDocument = Document & {
  userEmail: string
  phoneNumber: number
  streetAddress: string
  city: string
  postalCode: string
  country: string
  orderItems: MenuItemType[]
  isPaid: boolean
  subtotal: number
  delivery: number
  total: number
}

const orderSchema = new Schema<OrderSchemaDocument>(
  {
    userEmail: { type: String },
    phoneNumber: { type: Number },
    streetAddress: { type: String },
    city: { type: String },
    postalCode: { type: String },
    country: { type: String },
    orderItems: { type: [menuItemsSchema] },
    isPaid: { type: Boolean, default: false },
    subtotal: { type: Number },
    delivery: { type: Number, default: 5 },
    total: { type: Number },
  },
  { timestamps: true }
)

orderSchema.pre<OrderSchemaDocument>('save', function (next) {
  const subtotal = this.orderItems.reduce(
    (sum, item) => sum + calculateItemTotal(item),
    0
  )

  const delivery = 5

  const total = subtotal + delivery

  this.subtotal = subtotal
  this.delivery = delivery
  this.total = total

  next()
})

function calculateItemTotal(item: MenuItemType): number {
  let itemTotal = item.basePrice

  if (item?.sizes?.length! > 0) {
    const selectedSize = item.sizes![0]
    itemTotal += selectedSize.extraPrice || 0
  }

  if (item?.extraIngredients?.length! > 0) {
    itemTotal += item.extraIngredients!.reduce(
      (acc, extra) => acc + extra.extraPrice,
      0
    )
  }

  return itemTotal
}

const Order = mongoose.model<OrderSchemaDocument>('Order', orderSchema)

export default Order
