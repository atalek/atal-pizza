import { getServerSession } from '#auth'

type ProfileUpdateData = {
  name?: string
  image?: string
  streetAddress?: string
  postalCode?: string
  city?: string
  country?: string
  phoneNumber?: string
  admin?: boolean
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
        streetAddress: body.streetAddress,
        postalCode: body.postalCode,
        city: body.city,
        country: body.country,
        phone: body.phoneNumber,
        admin: body.admin,
      },
    },
    { upsert: true, new: true }
  )

  if (user || userInfo) {
    user.name = body.name
    user.image = body.image

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
