import { Types } from 'mongoose'

export type ExtraStuff = {
  name: string
  extraPrice: number
}

export type MenuItem = {
  _id: Types.ObjectId
  image: string
  name: string
  description: string
  category: string
  basePrice: number
  sizes?: ExtraStuff[]
  extraIngredients?: ExtraStuff[]
}

export type Category = {
  _id: Types.ObjectId
  name: string
}

export type CategoryOrOptional = Category | null
