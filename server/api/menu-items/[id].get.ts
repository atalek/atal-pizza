export default defineEventHandler(async event => {
  const body = event.context.params

  const loggedInUser = event.context.loggedInUser
  if (loggedInUser && loggedInUser.admin) {
    const menuItem = await MenuItem.findById({ _id: body?.id })

    return menuItem
  } else {
    throw createError({
      statusCode: 403,
      message: 'Unauthorized,not an admin',
    })
  }
})
