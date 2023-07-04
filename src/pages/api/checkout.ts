import { NextApiRequest, NextApiResponse } from 'next'
import { stripe } from '@/lib/stripe'
import { ProductProps } from '@/hook/cart'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { priceIds } = req.body

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  if (!priceIds) {
    return res.status(400).json({ error: 'Price not found.' })
  }

  const sucessUrl = `https://ignite-shop-fawn-five.vercel.app/success?session_id={CHECKOUT_SESSION_ID}`
  const cancelUrl = `https://ignite-shop-fawn-five.vercel.app`

  const lineItems = priceIds.map((priceId: ProductProps) => ({
    price: priceId.id,
    quantity: 1,
  }))

  const checkoutSession = await stripe.checkout.sessions.create({
    success_url: sucessUrl,
    cancel_url: cancelUrl,
    mode: 'payment',
    line_items: lineItems,
  })
  return res.status(201).json({
    checkoutUrl: checkoutSession.url,
  })
}
