export default defineEventHandler(async event => {
  const body = await readBody<{ name: string }>(event)

  const loggedInUser = event.context.loggedInUser
  if (loggedInUser && loggedInUser.admin) {
    if (body) {
      const category = await Category.create({ name: body.name })
      return category
    }
  } else {
    throw createError({
      statusCode: 403,
      message: 'Unauthorized,not an admin',
    })
  }
})
