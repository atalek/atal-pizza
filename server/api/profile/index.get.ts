import { getServerSession } from '#auth'

export default defineEventHandler(async event => {
  const session = await getServerSession(event)

  const user = await User.findOne({ email: session?.user?.email }).select(
    '-password'
  )
  const userInfo = await UserInfo.findOne({ email: session?.user?.email })

  if (user || userInfo) {
    return { user, userInfo }
  } else {
    throw createError({
      statusCode: 404,
      statusMessage: 'Bad request',
      message: 'User or userinfo do not exist',
    })
  }
})
