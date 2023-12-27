export default defineEventHandler(async event => {
  const body = event.context.params
  const user = await User.findById({ _id: body?.id }).select('-password')

  const loggedInUser = event.context.loggedInUser
  if (loggedInUser && loggedInUser.admin) {
    let userInfo
    if (user?.email) {
      userInfo = await UserInfo.findOne({ email: user.email })
    }

    return { user, userInfo }
  } else {
    throw createError({
      statusCode: 403,
      message: 'Unauthorized,not an admin',
    })
  }
})
