import { Types } from 'mongoose'

export type ExtraStuff = {
  name: string
  extraPrice: number
}

export type MenuItemType = {
  _id?: Types.ObjectId
  image?: string
  name?: string
  description?: string
  category?: string
  basePrice?: number
  sizes?: ExtraStuff[]
  extraIngredients?: ExtraStuff[]
}

export type UserData = {
  user: {
    _id?: Types.ObjectId
    name?: string
    email: string
    image: string
    admin: boolean
  }
  userInfo: {
    _id?: Types.ObjectId
    email: string
    streetAddress?: string
    postalCode?: string
    city?: string
    country?: string
    phone?: number | undefined
    admin?: boolean
  }
}

export type UserType = {
  _id?: Types.ObjectId
  name?: string
  email: string
  image: string
  admin?: boolean
}

export type UserInfoType = {
  phoneNumber?: number | undefined
  streetAddress?: string
  postalCode?: string
  city?: string
  country?: string
}

export type UserDataType = UserType & UserInfoType

export type OrderType = {
  _id: Types.ObjectId
  userEmail: string
  phoneNumber: number
  streetAddress: string
  city: string
  postalCode: string
  country: string
  isPaid: boolean
  subtotal: number
  delivery: number
  total: number
  orderItems: MenuItemType[]
  createdAt: string
}

export type CategoryType = {
  _id: Types.ObjectId | string
  name: string
}

export type CategoryOrOptional = CategoryType | null
