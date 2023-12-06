import { Types } from 'mongoose'

export type MenuItem = {
  _id: Types.ObjectId
  image: string
  name: string
  description: string
  category: string
  basePrice: number
  sizes: string[]
  extraIngredientPrices?: string[]
}

export type Category = {
  _id: Types.ObjectId
  name: string
}

export type CategoryOrOptional = Category | null
