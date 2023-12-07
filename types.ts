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

export type User = {
  _id: Types.ObjectId
  name?: string
  email: string
  image: string
  admin: boolean
}

export type UserData = {
  user: {
    name?: string
    email: string
    image: string
    admin: string
  }
  userInfo: {
    email: string
    streetAddress: string
    postalCode: string
    city: string
    country: string
    phone: string
    admin: boolean
  }
}

export type CategoryOrOptional = Category | null
