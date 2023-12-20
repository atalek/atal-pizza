import { getServerSession } from '#auth'

export default defineEventHandler(async event => {
  const body = event.context.params
  const session = await getServerSession(event)

  if (body) {
    try {
      const order = await Order.findById({ _id: body?.id })
      if (order) {
        return order
      }
    } catch (error) {
      throw createError({
        statusCode: 404,
        message: 'Order not found',
      })
    }
  }
})
