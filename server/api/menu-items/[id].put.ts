import { Types } from 'mongoose'

type ExtraStuff = {
  name: string
  extraPrice: number
}

type MenuItem = {
  _id: Types.ObjectId
  name: string
  description: string
  basePrice: string
  image: string
  category: string
  sizes: ExtraStuff[]
  extraIngredients: ExtraStuff[]
}

export default defineEventHandler(async event => {
  const params = event.context.params
  const body = await readBody<MenuItem>(event)

  if (body) {
    const menuItem = await MenuItem.findByIdAndUpdate(
      params?.id,
      {
        name: body.name,
        description: body.description,
        basePrice: body.basePrice,
        image: body.image,
        category: body.category,
        sizes: body.sizes,
        extraIngredients: body.extraIngredients,
      },
      { new: true }
    )

    return menuItem
  }
})
