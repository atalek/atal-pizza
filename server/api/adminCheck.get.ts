import { getServerSession } from '#auth'

export default defineEventHandler(async event => {
  const loggedInUser = event.context.loggedInUser

  if (loggedInUser) {
    return loggedInUser.admin
  } else {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
      message: 'Not authenticated',
    })
  }
})
