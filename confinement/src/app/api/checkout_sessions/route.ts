import { NextResponse } from "next/server"
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
import addonData from '@/data/addon.json';

export const POST = async (request: any) => {
  const { products } = await request.json();

  let activeProducts = await stripe.products.list({ active: true });
  
  const allItems = products.map((item: any) => ({
    name: item.name,
    price: item.totalprice,
    quantity: 1,
  }));

  try {
    for (const product of allItems) {
      const matchedProduct = activeProducts.data.find((p: any) =>
        p.name.toLowerCase() === product.name.toLowerCase()
      );

      let isMatched = false;

      if (matchedProduct) {
        try {
          const priceObj = await stripe.prices.retrieve(matchedProduct.default_price);
          isMatched = priceObj.unit_amount === product.price * 100;
        } catch (err) {
          console.warn(`Could not retrieve price for product: ${product.name}`);
        }
      }

      if (!isMatched) {
        await stripe.products.create({
          name: product.name,
          default_price_data: {
            currency: 'sgd',
            unit_amount: product.price * 100,
          },
        });
      }
    }
  } catch (error) {
    console.error('Error in creating a new product:', error);
    return NextResponse.json({ error: 'Stripe product creation failed' }, { status: 500 });
  }

  // Re-fetch updated product list
  activeProducts = await stripe.products.list({ active: true });

  const stripeProducts = [];

  for (const item of allItems) {
    const stripeProduct = activeProducts.data.find((p: any) =>
      p.name.toLowerCase() === item.name.toLowerCase()
    );

    if (stripeProduct) {
      stripeProducts.push({
        price: stripeProduct.default_price,
        quantity: 1,
      });
    }
  }

  if (stripeProducts.length === 0) {
    return NextResponse.json({ error: 'No products found for checkout' }, { status: 400 });
  }

  const session = await stripe.checkout.sessions.create({
    line_items: stripeProducts,
    mode: 'payment',
    shipping_address_collection: {
      allowed_countries: ['SG'],
    },
    phone_number_collection: {
      enabled: true,
    },
    success_url: `http://localhost:3000/success`,
    cancel_url: `http://localhost:3000/`,
  });

  return NextResponse.json({ url: session.url });
}
