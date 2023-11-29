import { NuxtAuthHandler } from '#auth'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import { MongoDBAdapter } from '@auth/mongodb-adapter'
import clientPromise from '~/server/utils/dbConnect'
import { Adapter } from 'next-auth/adapters'
import bcrypt from 'bcrypt'

async function getMe(session: any) {
  return await $fetch('/api/me', {
    method: 'POST',
    query: {
      API_ROUTE_SECRET: process.env.API_ROUTE_SECRET,
    },
    body: {
      email: session?.user?.email,
    },
  })
}

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
      async authorize(credentials: { email: string; password: string }) {
        const user = await User.findOne({ email: credentials.email })

        if (!user) {
          throw createError({
            statusCode: 404,
            statusMessage: 'Bad request',
            message: 'User with that email does not exist',
          })
        }

        if (user && bcrypt.compareSync(credentials.password, user.password)) {
          return {
            ...user.toObject(),
            password: undefined,
          }
        } else {
          throw createError({
            statusCode: 401,
            statusMessage: 'Unauthorized',
            message: 'Invalid email or password',
          })
        }
      },
      // async authorize(credentials: { email: string; password: string }) {
      //   if (!credentials) throw new Error('Missing credentials')
      //   const user = await User.findOne({ email: credentials.email })
      //   if (!user) throw new Error('User with that email does not exist')
      //   const passwordOk =
      //     user && (await user.matchPassword(credentials.password))

      //   if (!passwordOk) throw new Error('Invalid email or password')

      //   console.log(user)
      //   if (passwordOk) {
      //     return {
      //       ...user.toObject(),
      //       password: undefined,
      //     }
      //   }

      //   return null
      // },
    }),
  ],
  session: {
    strategy: 'jwt',
  },

  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token = {
          ...token,
          ...user,
        }
      }

      return token
    },

    async session({ session, token }) {
      const me = await getMe(session)

      if (me) {
        token = {
          ...token,
          ...me,
        }

        session.user = {
          ...token,
          ...me,
        }
      }

      return session
    },
  },
})
