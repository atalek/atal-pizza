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
  image?: string
  category: string
  sizes: ExtraStuff[]
  extraIngredients: ExtraStuff[]
}

export default defineEventHandler(async event => {
  const body = await readBody<MenuItem>(event)

  const loggedInUser = event.context.loggedInUser
  if (loggedInUser && loggedInUser.admin) {
    if (body) {
      const menuItemData: MenuItem = {
        ...body,
        image: body.image || undefined,
        sizes: body?.sizes.filter(size => size.name !== ''),
        extraIngredients: body?.extraIngredients.filter(
          ingredient => ingredient.name && ingredient.extraPrice !== 0
        ),
      }

      const menuItem = await MenuItem.create(menuItemData)
      return menuItem
    }
  } else {
    throw createError({
      statusCode: 403,
      message: 'Unauthorized,not an admin',
    })
  }
})
