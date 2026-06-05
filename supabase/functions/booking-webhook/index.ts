import Stripe from 'https://esm.sh/stripe@13'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const stripe   = new Stripe(Deno.env.get('STRIPE_SECRET_KEY')!)
const supabase = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!)

Deno.serve(async (req) => {
  const sig  = req.headers.get('stripe-signature')!
  const body = await req.text()

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(body, sig, Deno.env.get('STRIPE_BOOKING_WEBHOOK_SECRET')!)
  } catch (err) {
    return new Response(`Webhook error: ${err.message}`, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session
    const bookingId = session.metadata?.booking_id

    if (bookingId) {
      // Mark booking as paid + confirmed
      await supabase.from('booking_requests')
        .update({
          payment_status:       'paid',
          status:               'confirmed',
          stripe_checkout_id:   session.id,
          stripe_payment_intent: session.payment_intent as string,
          amount_charged:       (session.amount_total || 0) / 100,
          updated_at:           new Date().toISOString()
        })
        .eq('id', bookingId)

      // Get booking details for notification
      const { data: booking } = await supabase
        .from('booking_requests')
        .select('*, professionals(email, business_name)')
        .eq('id', bookingId)
        .single()

      // Notify provider by email
      if (booking?.professionals?.email) {
        await fetch(`${Deno.env.get('SUPABASE_URL')}/functions/v1/send-booking-notification`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${Deno.env.get('SUPABASE_ANON_KEY')}` },
          body: JSON.stringify({
            provider_email: booking.professionals.email,
            provider_name:  booking.professionals.business_name,
            client_name:    booking.client_name,
            client_email:   booking.client_email,
            service:        booking.service,
            preferred_date: booking.preferred_date,
            preferred_time: booking.preferred_time,
            message:        booking.message
          })
        })
      }
    }
  }

  if (event.type === 'payment_intent.payment_failed') {
    const pi = event.data.object as Stripe.PaymentIntent
    const bookingId = pi.metadata?.booking_id
    if (bookingId) {
      await supabase.from('booking_requests')
        .update({ payment_status: 'failed', status: 'declined' })
        .eq('id', bookingId)
    }
  }

  return new Response('ok', { status: 200 })
})
