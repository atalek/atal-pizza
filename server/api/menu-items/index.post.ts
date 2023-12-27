type MenuItem = {
  name: string
  description: string
  basePrice: string
  image?: string
}

export default defineEventHandler(async event => {
  const body = await readBody<MenuItem>(event)

  const loggedInUser = event.context.loggedInUser
  if (loggedInUser && loggedInUser.admin) {
    if (body) {
      const menuItemData: MenuItem = {
        ...body,
        image: body.image || undefined,
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
