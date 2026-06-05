import Stripe from 'https://esm.sh/stripe@13'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const stripe   = new Stripe(Deno.env.get('STRIPE_SECRET_KEY')!)
const supabase = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!)

Deno.serve(async (req) => {
  const {
    service_id, service_name, price_usd,
    provider_id, provider_stripe_account,
    client_email, booking_data,
    fee_percent, success_url, cancel_url
  } = await req.json()

  const amountCents      = Math.round(parseFloat(price_usd) * 100)
  const feeAmountCents   = Math.round(amountCents * (fee_percent / 100))

  // Create booking record first
  const { data: booking } = await supabase.from('booking_requests').insert([{
    provider_id,
    service_id,
    client_name:    booking_data.client_name,
    client_email:   client_email || booking_data.client_email,
    client_phone:   booking_data.client_phone,
    service:        service_name,
    preferred_date: booking_data.preferred_date,
    preferred_time: booking_data.preferred_time,
    message:        booking_data.message,
    price_usd:      price_usd,
    currency:       'usd',
    mortea_fee:     (feeAmountCents / 100).toFixed(2),
    provider_payout:((amountCents - feeAmountCents) / 100).toFixed(2),
    payment_status: 'pending',
    status:         'pending'
  }]).select('id').single()

  // Create Stripe Checkout session with Connect
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    mode: 'payment',
    customer_email: client_email || booking_data.client_email,
    line_items: [{
      price_data: {
        currency:     'usd',
        unit_amount:  amountCents,
        product_data: { name: service_name, description: `Booking via Mortéa` }
      },
      quantity: 1
    }],
    payment_intent_data: {
      application_fee_amount: feeAmountCents,
      transfer_data: { destination: provider_stripe_account },
      metadata: { booking_id: booking?.id || '', provider_id, service_id }
    },
    success_url: success_url + `&booking_id=${booking?.id || ''}`,
    cancel_url,
    // Adaptive pricing — Stripe shows client's local currency
    currency_conversion: { enabled: true } as any
  })

  // Update booking with Stripe session ID
  if (booking?.id) {
    await supabase.from('booking_requests')
      .update({ stripe_checkout_id: session.id })
      .eq('id', booking.id)
  }

  return new Response(JSON.stringify({ url: session.url }), {
    headers: { 'Content-Type': 'application/json' }
  })
})
