import { getServerSession } from '#auth'

export default defineEventHandler(async event => {
  const session = await getServerSession(event)

  const user = await User.findOne({ email: session?.user?.email })
  if (user) {
    return {
      _id: user._id,
      name: user.name,
      email: user.email,
      image: user.image,
    }
  } else {
    throw createError({
      statusCode: 404,
      statusMessage: 'Bad request',
      message: 'User does not exist',
    })
  }
})
