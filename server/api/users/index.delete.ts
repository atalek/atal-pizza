import { Types } from 'mongoose'

export default defineEventHandler(async event => {
  const body = getQuery<{ _id: Types.ObjectId }>(event)
  console.log(body)
  if (body._id) {
    await User.findByIdAndDelete(body._id)
    return 'Category deleted'
  } else {
    throw createError({
      statusCode: 404,
      statusMessage: 'Category not found',
    })
  }
})
