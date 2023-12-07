export default defineEventHandler(async event => {
  const body = event.context.params
  const user = await User.findById({ _id: body?.id }).select('-password')

  let userInfo
  if (user?.email) {
    userInfo = await UserInfo.findOne({ email: user.email })
  }

  return { user, userInfo }
})
