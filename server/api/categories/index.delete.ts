import { Types } from 'mongoose'

export default defineEventHandler(async event => {
  const body = getQuery<{ _id: Types.ObjectId }>(event)

  if (body._id) {
    await Category.findByIdAndDelete(body._id)
    return 'Category deleted'
  } else {
    throw createError({
      statusCode: 404,
      statusMessage: 'Category not found',
    })
  }
})
