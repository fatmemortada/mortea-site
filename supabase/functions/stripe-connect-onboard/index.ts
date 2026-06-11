import Stripe from 'https://esm.sh/stripe@13'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

const stripe   = new Stripe(Deno.env.get('STRIPE_SECRET_KEY')!)
const supabase = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!)

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { provider_id, email } = await req.json()

    const { data: provider } = await supabase
      .from('professionals')
      .select('stripe_account_id, business_name, country')
      .eq('id', provider_id)
      .single()

    let accountId = provider?.stripe_account_id

    if (!accountId) {
      const account = await stripe.accounts.create({
        type:  'express',
        email: email,
        capabilities: { card_payments: { requested: true }, transfers: { requested: true } },
        business_profile: { name: provider?.business_name || 'Beauty Professional' },
      })
      accountId = account.id
      await supabase.from('professionals')
        .update({ stripe_account_id: accountId })
        .eq('id', provider_id)
    }

    const link = await stripe.accountLinks.create({
      account:     accountId,
      refresh_url: `${Deno.env.get('SITE_URL')}/provider-dashboard.html?stripe_refresh=1`,
      return_url:  `${Deno.env.get('SITE_URL')}/provider-dashboard.html?stripe_connected=1`,
      type:        'account_onboarding',
    })

    return new Response(JSON.stringify({ url: link.url }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500
    })
  }
})
