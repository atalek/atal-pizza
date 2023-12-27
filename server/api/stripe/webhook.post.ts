import Stripe from 'stripe'

export default defineEventHandler(async event => {
  const body = await readRawBody(event)
  const stripeSignature = getHeader(event, 'stripe-signature')

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: '2023-10-16',
  })

  if (!body || !stripeSignature) {
    throw createError({
      statusCode: 400,
      message: 'Invalid request body',
    })
  }

  try {
    const stripeEvent = stripe.webhooks.constructEvent(
      body,
      stripeSignature,
      process.env.STRIPE_WEBHOOK_SECRET as string
    )
    if (stripeEvent.type === 'checkout.session.completed') {
      const orderId = stripeEvent?.data?.object?.metadata?.orderId
      const isPaid = stripeEvent?.data?.object?.payment_status === 'paid'

      if (isPaid) {
        await Order.updateOne({ _id: orderId }, { isPaid: true })
      }
    }
    return 'ok'
  } catch (error) {
    throw createError({
      statusCode: 400,
      message: 'Invalid request body',
    })
  }
})
