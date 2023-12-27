// file: ~/server/middleware/auth.ts
import { getServerSession } from '#auth'

export default eventHandler(async event => {
  const session = await getServerSession(event)

  if (session) {
    const loggedInUser = await UserInfo.findOne({ email: session?.user?.email })

    if (loggedInUser) {
      event.context.loggedInUser = loggedInUser
    }
  }
})
