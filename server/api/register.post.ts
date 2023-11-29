import bcrypt from 'bcrypt'

export default defineEventHandler(async event => {
  const body = await readBody<{ email: string; password: string }>(event)
  const passwordRegex = /^(?=.*\d)(?=.*[A-Z])(?=.*\W).{8,}$/

  try {
    const userExists = await User.findOne({ email: body.email })

    if (userExists) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Bad Request',
        message: 'User with that email already exists',
      })
    }
    if (!passwordRegex.test(body.password)) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Bad Request',
        message:
          'Password must be at least 8 characters long with 1 number, 1 uppercase letter, and 1 symbol',
      })
    } else {
      const salt = await bcrypt.genSalt(10)
      body.password = await bcrypt.hash(body.password, salt)

      const user = await User.create({ ...body })

      return { ...user.toObject(), password: undefined }
    }
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
