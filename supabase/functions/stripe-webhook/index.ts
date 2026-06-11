import Stripe from 'https://esm.sh/stripe@13'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, stripe-signature',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

const stripe   = new Stripe(Deno.env.get('STRIPE_SECRET_KEY')!)
const supabase = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!)

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  const sig  = req.headers.get('stripe-signature')!
  const body = await req.text()
  let event: Stripe.Event
  try { event = stripe.webhooks.constructEvent(body, sig, Deno.env.get('STRIPE_WEBHOOK_SECRET')!) }
  catch (err) { return new Response(`Webhook error: ${err.message}`, { status: 400 }) }

  try {
    if (event.type === 'checkout.session.completed' || event.type === 'customer.subscription.created') {
      const session = event.data.object as any
      const email   = session.customer_email || session.customer_details?.email || null
      const planMap: Record<string,string> = {
        'price_1Tb77R539sddq3X5B9n9xvjP': 'independent',
        'price_1Tb77j539sddq3X547jqdtoP': 'independent',
        'price_1Tb6z6539sddq3X57kkBtl7o': 'professional',
        'price_1Tb702539sddq3X5tRpGqlVy': 'professional',
        'price_1Tb76j539sddq3X5ekZxs7gk': 'creator',
        'price_1Tb773539sddq3X5ANymVwaa': 'creator',
      }
      const priceId = session.line_items?.data?.[0]?.price?.id || session.plan?.id || null
      const plan    = priceId ? (planMap[priceId] || 'professional') : 'professional'
      if (email) {
        const { data } = await supabase.from('professionals')
          .update({ status: 'approved', membership_plan: plan, updated_at: new Date().toISOString() })
          .eq('email', email).select('business_name').single()
        if (data) {
          await fetch(`${Deno.env.get('SUPABASE_URL')}/functions/v1/send-welcome-email`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${Deno.env.get('SUPABASE_ANON_KEY')}` },
            body: JSON.stringify({ email, business_name: data.business_name, plan })
          })
        }
      }
    }

    if (event.type === 'customer.subscription.deleted') {
      const sub = event.data.object as any
      const customer = await stripe.customers.retrieve(sub.customer) as any
      if (customer?.email) {
        await supabase.from('professionals').update({ status: 'pending', membership_plan: null }).eq('email', customer.email)
      }
    }
  } catch (err) {
    console.error('Webhook handler error:', err)
  }

  return new Response('ok', { status: 200 })
})
