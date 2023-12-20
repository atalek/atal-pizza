import { getServerSession } from '#auth'
import Stripe from 'stripe'

export default defineEventHandler(async event => {
  const body = await readBody(event)
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: '2023-10-16',
  })
  const session = await getServerSession(event)
  const userEmail = session?.user?.email

  const { addressInfo, orderItems } = body

  const orderDoc = await Order.create({
    userEmail,
    ...addressInfo,
    orderItems,
    paid: false,
  })

  const stripeLineItems = []

  for (const product of orderItems) {
    const productName = product.name
    const productInfo = await MenuItem.findById({ _id: product._id })
    let productPrice = productInfo!.basePrice

    if (product.size) {
      const size = productInfo?.sizes.find(
        size => size._id.toString() === product.size._id.toString()
      )

      productPrice += size!.extraPrice
    }

    if (product.extraIngredients.length > 0) {
      for (const cartProductExtraThing of product.extraIngredients) {
        const extraThingInfo = productInfo?.extraIngredients.find(
          extra => extra._id.toString() === cartProductExtraThing._id.toString()
        )

        productPrice += extraThingInfo!.extraPrice
      }
    }

    stripeLineItems.push({
      quantity: 1,
      price_data: {
        currency: 'USD',
        product_data: {
          name: productName,
        },
        unit_amount: productPrice * 100,
      },
    })
  }

  const stripeSession = await stripe.checkout.sessions.create({
    line_items: stripeLineItems,
    mode: 'payment',
    customer_email: userEmail?.toString(),
    success_url:
      process.env.AUTH_ORIGIN +
      `/orders/${orderDoc._id.toString()}?clear-cart=1`,
    cancel_url: process.env.AUTH_ORIGIN + '/cart?canceled=1',
    metadata: {
      orderId: orderDoc._id.toString(),
    },

    shipping_options: [
      {
        shipping_rate_data: {
          display_name: 'Delivery fee',
          type: 'fixed_amount',
          fixed_amount: { amount: 500, currency: 'USD' },
        },
      },
    ],
  })

  return stripeSession.url
})
