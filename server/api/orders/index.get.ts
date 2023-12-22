import { getServerSession } from '#auth'

export default defineEventHandler(async event => {
  const session = await getServerSession(event)
  const userInfo = await UserInfo.findOne({ email: session?.user?.email })

  if (userInfo?.admin) {
    const orders = await Order.find().sort({ createdAt: -1 })
    return orders
  } else {
    return await Order.find({ email: session?.user?.email }).sort({
      createdAt: -1,
    })
  }
})
