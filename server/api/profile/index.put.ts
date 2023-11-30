import { getServerSession } from '#auth'

export default defineEventHandler(async event => {
  const body = await readBody<{ name: string }>(event)
  const session = await getServerSession(event)

  const user = await User.findOne({ email: session?.user?.email })
  if (user) {
    user.name = body.name
    await user?.save()
    return { ...user.toObject(), password: undefined }
  } else {
    throw createError({
      statusCode: 404,
      statusMessage: 'Bad request',
      message: 'User does not exist',
    })
  }
})
