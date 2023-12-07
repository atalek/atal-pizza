export default defineEventHandler(async event => {
  const users = await User.find().select('-password')

  return users
})
