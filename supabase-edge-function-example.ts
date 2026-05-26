// Mortéa Stripe Webhook Example
import Stripe from 'https://esm.sh/stripe@14.25.0?target=deno'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY')!, {
  apiVersion: '2024-04-10',
})

const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
)

Deno.serve(async (req) => {
  const body = await req.text()
  const signature = req.headers.get('stripe-signature')

  const event = stripe.webhooks.constructEvent(
    body,
    signature!,
    Deno.env.get('STRIPE_WEBHOOK_SECRET')!
  )

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object
    const email = session.customer_details?.email

    if (email) {
      await supabase
        .from('professionals')
        .update({
          subscription_status: 'active',
          payment_status: 'active',
        })
        .eq('email', email)
    }
  }

  return new Response('ok')
})
