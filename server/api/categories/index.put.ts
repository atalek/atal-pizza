import { Types } from 'mongoose'

export default defineEventHandler(async event => {
  const body = await readBody<{ _id: Types.ObjectId; name: string }>(event)

  if (body) {
    const category = await Category.findOneAndUpdate(
      { _id: body._id },
      { name: body.name },
      { new: true }
    )

    return category
  }
})
