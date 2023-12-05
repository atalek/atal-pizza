import mongoose, { Document, Schema, Types } from 'mongoose'

type ExtraPriceDocument = Document & {
  name: string
  price: number
}

type MenuItemsDocument = Document & {
  image: string
  name: string
  description: string
  category: Types.ObjectId
  basePrice: number
  sizes: ExtraPriceDocument[]
  extraIngredientPrices: ExtraPriceDocument[]
}

const extraPriceSchema = new Schema<ExtraPriceDocument>({
  name: String,
  price: Number,
})

const menuItemsSchema = new Schema<MenuItemsDocument>(
  {
    image: { type: String },
    name: { type: String },
    description: { type: String },
    category: { type: Schema.Types.ObjectId },
    basePrice: { type: Number },
    sizes: { type: [extraPriceSchema], default: [] },
    extraIngredientPrices: { type: [extraPriceSchema], default: [] },
  },
  { timestamps: true }
)

const MenuItem = mongoose.model<MenuItemsDocument>('MenuItem', menuItemsSchema)

export default MenuItem
