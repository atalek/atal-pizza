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

  const user = await User.findOne({ email: session?.user?.email }).select(
    '-password'
  )
  const userInfo = await UserInfo.findOneAndUpdate(
    { email: session?.user?.email },
    {
      $set: {
        streetAddress: body.userInfo.streetAddress,
        postalCode: body.userInfo.postalCode,
        city: body.userInfo.city,
        country: body.userInfo.country,
        phone: body.userInfo.phone,
        admin: body.userInfo.admin,
      },
    },
    { upsert: true, new: true }
  )

  if (user || userInfo) {
    user!.name = body.name
    await user?.save()
    return { user, userInfo }
  } else {
    throw createError({
      statusCode: 404,
      statusMessage: 'Bad request',
      message: 'User does not exist',
    })
  }
})
