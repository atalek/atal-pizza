import { Types } from 'mongoose'
export type MenuItem = {
  _id?: Types.ObjectId
  image: string
  name: string
  description: string
  basePrice: number
  sizes?: string[]
  extraIngredientPrices?: string[]
}
