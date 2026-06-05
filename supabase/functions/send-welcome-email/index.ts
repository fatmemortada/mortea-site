Deno.serve(async (req) => {
  const { email, business_name, plan } = await req.json()
  const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')
  if (!RESEND_API_KEY) return new Response('RESEND_API_KEY not set', { status: 500 })
  const planLabels: Record<string,string> = { independent: 'Single User — $10/month', professional: 'Professional — $35/month', creator: 'Beauty Creator — $30/month' }
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${RESEND_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: 'Mortéa <hello@mortea.ca>',
      to: email,
      subject: `Welcome to Mortéa, ${business_name}! Your profile is live.`,
      html: `<div style="font-family:Inter,sans-serif;max-width:600px;margin:0 auto;background:#070504;color:#f5eee7;padding:40px 32px;border-radius:24px">
        <h1 style="font-family:Georgia,serif;font-size:36px;margin:0 0 8px">Welcome to Mortéa.</h1>
        <p style="color:#d9b7a2;font-size:16px;margin:0 0 28px">Your profile is live and visible to clients worldwide.</p>
        <div style="border:1px solid rgba(234,214,198,.16);border-radius:18px;padding:20px;background:rgba(255,255,255,.04);margin-bottom:24px">
          <div style="font-size:13px;color:#bca89a;margin-bottom:12px;text-transform:uppercase;letter-spacing:.12em">YOUR PROFILE</div>
          <div style="font-size:18px;font-weight:700;color:#f5eee7;margin-bottom:4px">${business_name}</div>
          <div style="font-size:14px;color:#d9b7a2">Plan: ${planLabels[plan] || plan}</div>
        </div>
        <p style="color:#d4c4b8;font-size:15px;line-height:1.7;margin-bottom:20px">Clients searching for beauty and aesthetic services near you can now find your profile on <a href="https://www.mortea.ca" style="color:#d9b7a2">www.mortea.ca</a>.</p>
        <a href="https://www.mortea.ca/provider-dashboard.html" style="background:#f5eee7;color:#130d0a;padding:13px 24px;border-radius:999px;text-decoration:none;font-weight:700;font-size:15px;display:inline-block">Go to my dashboard →</a>
        <p style="color:#bca89a;font-size:13px;border-top:1px solid rgba(234,214,198,.12);padding-top:20px;margin:28px 0 0">Mortéa · www.mortea.ca · Global luxury beauty discovery</p>
      </div>`
    })
  })
  const data = await res.json()
  return new Response(JSON.stringify(data), { headers: { 'Content-Type': 'application/json' }, status: res.ok ? 200 : 500 })
})
