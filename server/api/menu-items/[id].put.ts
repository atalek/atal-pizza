import { Types } from 'mongoose'

type MenuItem = {
  _id: Types.ObjectId
  name: string
  description: string
  basePrice: string
  image: string
}

export default defineEventHandler(async event => {
  const params = event.context.params
  const body = await readBody<MenuItem>(event)
  console.log(body)

  if (body) {
    const menuItem = await MenuItem.findByIdAndUpdate(
      params?.id,
      {
        name: body.name,
        description: body.description,
        basePrice: body.basePrice,
        image: body.image,
      },
      { new: true }
    )

    return menuItem
  }
})
