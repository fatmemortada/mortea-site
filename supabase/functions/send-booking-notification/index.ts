Deno.serve(async (req) => {
  const { provider_email, provider_name, client_name, client_email, service, preferred_date, preferred_time, message } = await req.json()
  const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')
  if (!RESEND_API_KEY) return new Response('RESEND_API_KEY not set', { status: 500 })
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${RESEND_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: 'Mortéa <hello@mortea.ca>',
      to: provider_email,
      subject: `New booking request from ${client_name} — Mortéa`,
      html: `<div style="font-family:Inter,sans-serif;max-width:600px;margin:0 auto;background:#070504;color:#f5eee7;padding:40px 32px;border-radius:24px">
        <h1 style="font-family:Georgia,serif;font-size:30px;margin:0 0 8px">New booking request.</h1>
        <p style="color:#d9b7a2;font-size:16px;margin:0 0 24px">You have a new booking request on Mortéa.</p>
        <div style="border:1px solid rgba(234,214,198,.16);border-radius:18px;padding:20px;background:rgba(255,255,255,.04);margin-bottom:24px">
          <div style="display:grid;gap:10px;font-size:15px;color:#d4c4b8">
            <div><span style="color:#bca89a">From:</span> <strong style="color:#f5eee7">${client_name}</strong> (${client_email})</div>
            ${service ? `<div><span style="color:#bca89a">Service:</span> ${service}</div>` : ''}
            ${preferred_date ? `<div><span style="color:#bca89a">Date:</span> ${preferred_date}</div>` : ''}
            ${preferred_time ? `<div><span style="color:#bca89a">Time:</span> ${preferred_time}</div>` : ''}
            ${message ? `<div><span style="color:#bca89a">Message:</span><br><em style="color:#d4c4b8">${message}</em></div>` : ''}
          </div>
        </div>
        <a href="https://www.mortea.ca/provider-inbox.html" style="background:#f5eee7;color:#130d0a;padding:13px 24px;border-radius:999px;text-decoration:none;font-weight:700;font-size:15px;display:inline-block">View in inbox →</a>
        <p style="color:#bca89a;font-size:13px;border-top:1px solid rgba(234,214,198,.12);padding-top:20px;margin:28px 0 0">Mortéa · www.mortea.ca</p>
      </div>`
    })
  })
  const data = await res.json()
  return new Response(JSON.stringify(data), { headers: { 'Content-Type': 'application/json' }, status: res.ok ? 200 : 500 })
})
