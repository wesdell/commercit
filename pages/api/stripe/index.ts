import type { NextApiRequest, NextApiResponse } from 'next';

import Stripe from 'stripe';

import type { IProduct } from '@/interfaces';

const stripe = new Stripe(process.env.NEXT_STRIPE_SECRET_KEY ?? '', {
  apiVersion: '2022-11-15',
  typescript: true
});

type Data =
  | { message: string }
  | Stripe.Response<Stripe.Checkout.Session>


export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method === 'POST') {
    const { itemsInCart } = req.body as { itemsInCart: IProduct[] };

    try {
      const session = await stripe.checkout.sessions.create({
        submit_type: 'pay',
        payment_method_types: ['card'],
        mode: 'payment',
        billing_address_collection: 'auto',
        shipping_options: [
          {
            shipping_rate: 'shr_1NJaljLc1AC5kSLtp7vEev2L'
          },
          {
            shipping_rate: 'shr_1NJamULc1AC5kSLttMYiUNAV'
          }
        ],
        line_items: itemsInCart.map((item) => {
          const img = item.image[0].asset._ref;
          const newIMG = img.replace('image-', 'https://cdn.sanity.io/images/wtkrqp9y/production/').replace('-webp', '.webp');
          return {
            price_data: {
              currency: 'usd',
              product_data: {
                name: item.name,
                images: [newIMG]
              },
              unit_amount: item.price * 100
            },
            adjustable_quantity: {
              enabled: true,
              minimum: 1
            },
            quantity: item.quantity
          };
        }),
        success_url: `${req.headers.origin}/success`,
        cancel_url: `${req.headers.origin}/canceled`,
      });
      res.status(200).json(session);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}