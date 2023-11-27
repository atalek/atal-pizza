import { NuxtAuthHandler } from '#auth'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import { MongoDBAdapter } from '@auth/mongodb-adapter'
import clientPromise from '~/server/utils/dbConnect'
import { Adapter } from 'next-auth/adapters'
import User from '~/server/models/User'

export default NuxtAuthHandler({
  secret: process.env.AUTH_SECRET,
  adapter: MongoDBAdapter(clientPromise) as Adapter,

  pages: {
    signIn: '/login',
  },
  providers: [
    // @ts-expect-error
    GoogleProvider.default({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
        },
      },
    }),
    // @ts-expect-error
    CredentialsProvider.default({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email Address', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      // async authorize(credentials: { email: string; password: string }) {
      //   const user = await User.findOne({ email: credentials.email })

      //   if (!user) {
      //     throw createError({
      //       statusCode: 401,
      //       statusMessage: 'Unauthorized',
      //       message: 'User with that email does not exist',
      //     })
      //   }

      //   if (user && (await user.matchPassword(credentials.password))) {
      //     return {
      //       ...user.toObject(),
      //       password: undefined,
      //     }
      //   } else {
      //     throw createError({
      //       statusCode: 401,
      //       statusMessage: 'Unauthorized',
      //       message: 'Invalid email or password',
      //     })
      //   }
      // },
      async authorize(credentials: { email: string; password: string }) {
        if (!credentials) throw new Error('Missing credentials')
        const user = await User.findOne({ email: credentials.email })
        if (!user) throw new Error('User with that email does not exist')
        const passwordOk =
          user && (await user.matchPassword(credentials.password))

        if (!passwordOk) throw new Error('Invalid email or password')

        console.log(user)
        if (passwordOk) {
          return {
            ...user.toObject(),
            password: undefined,
          }
        }

        return null
      },
    }),
  ],
})
