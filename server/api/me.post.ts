export default eventHandler(async event => {
  const body = await readBody<{ email: string }>(event)
  const query = getQuery(event)

  if (query.API_ROUTE_SECRET !== process.env.API_ROUTE_SECRET) {
    throw createError({
      statusCode: 401,
      statusMessage: 'You are not authorized to call this API.',
    })
  }
  const user = await User.findOne({ email: body.email })

  return {
    _id: user?._id,
    email: user?.email,
    name: user?.name,
    image: user?.image,
  }
})
