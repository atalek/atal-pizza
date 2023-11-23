import User from '../models/User'

export default defineEventHandler(async event => {
  const body = await readBody<{ email: string; password: string }>(event)

  try {
    const userExists = await User.findOne({ email: body.email })

    if (userExists) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Bad Request',
        message: 'User with that email already exists',
      })
    }

    const user = await User.create({ ...body })

    return { ...user.toObject(), password: undefined }
  } catch (error: any) {
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map(
        err => (err as { message: string }).message
      )
      const errorMessage = validationErrors.join(', ')

      throw createError({
        statusCode: 400,
        statusMessage: 'Bad Request',
        message: errorMessage,
      })
    }

    throw error
  }
})
