import User from '../models/User'

export default defineEventHandler(async event => {
  const body = await readBody<{ email: string; password: string }>(event)

  try {
    const user = await User.findOne({ email: body.email })

    if (user && (await user.matchPassword(body.password))) {
      return { ...user.toObject(), password: undefined }
    } else {
      throw createError({
        statusCode: 401,
        statusMessage: 'Bad request',
        message: 'Invalid email or password',
      })
    }
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 401,
      statusMessage: error.statusMessage || 'Bad Request',
      message: error.message || 'Invalid email or password',
    })
  }
})
