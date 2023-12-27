export default defineEventHandler(async event => {
  const loggedInUser = event.context.loggedInUser
  if (loggedInUser && loggedInUser.admin) {
    const categories = await Category.find()
    return categories
  } else {
    throw createError({
      statusCode: 403,
      message: 'Unauthorized,not an admin',
    })
  }
})
