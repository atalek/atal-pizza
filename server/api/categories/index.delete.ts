import { Types } from 'mongoose'

export default defineEventHandler(async event => {
  const body = getQuery<{ _id: Types.ObjectId }>(event)

  const loggedInUser = event.context.loggedInUser
  if (loggedInUser && loggedInUser.admin) {
    if (body._id) {
      const categoryHasItems = await MenuItem.exists({ category: body._id })

      if (categoryHasItems) {
        throw createError({
          statusCode: 400,
          message: 'Cannot delete category with associated items',
        })
      }
      await Category.findByIdAndDelete(body._id)
      return 'Category deleted'
    } else {
      throw createError({
        statusCode: 404,
        statusMessage: 'Category not found',
      })
    }
  } else {
    throw createError({
      statusCode: 403,
      message: 'Unauthorized,not an admin',
    })
  }
})
