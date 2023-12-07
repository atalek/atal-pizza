import mongoose, { Document, Schema, Types } from 'mongoose'

type ExtraPriceDocument = Document & {
  name: string
  extraPrice: number
}

const extraPriceSchema = new Schema<ExtraPriceDocument>({
  name: String,
  extraPrice: Number,
})

type MenuItemsDocument = Document & {
  image: string
  name: string
  description: string
  category: Types.ObjectId
  basePrice: number
  sizes: ExtraPriceDocument[]
  extraIngredients: ExtraPriceDocument[]
}

const menuItemsSchema = new Schema<MenuItemsDocument>(
  {
    image: {
      type: String,
      default: 'dfe55978-03b7-4ab8-89e3-d4b005d2edf5.jpg',
    },
    name: { type: String },
    description: { type: String },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
    },
    basePrice: { type: Number },
    sizes: { type: [extraPriceSchema], default: [] },
    extraIngredients: { type: [extraPriceSchema], default: [] },
  },
  { timestamps: true }
)

const MenuItem = mongoose.model<MenuItemsDocument>('MenuItem', menuItemsSchema)

export default MenuItem
