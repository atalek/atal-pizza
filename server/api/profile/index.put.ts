import { getServerSession } from '#auth'

type ProfileUpdateData = {
  name?: string
  userInfo: {
    streetAddress?: string
    postalCode?: string
    city?: string
    country?: string
    phone?: string
    admin?: boolean
  }
}

export default defineEventHandler(async event => {
  const body = await readBody<ProfileUpdateData>(event)
  const session = await getServerSession(event)
  console.log(body)

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
