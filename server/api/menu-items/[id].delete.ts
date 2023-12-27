import { Types } from 'mongoose'

export default defineEventHandler(async event => {
  const body = event.context.params

  const loggedInUser = event.context.loggedInUser
  if (loggedInUser && loggedInUser.admin) {
    if (body?.id) {
      await MenuItem.findByIdAndDelete(body.id)
      return 'Menu item deleted'
    }
  } else {
    throw createError({
      statusCode: 403,
      message: 'Unauthorized,not an admin',
    })
  }
})
