import type { NextRequest } from 'next/server'
import fetch from 'node-fetch'

export async function POST(req: NextRequest) {
  const secret = req.headers.get('x-seed-secret') || ''
  // Cloud Function URL - replace with your deployed function URL
  const fnUrl = process.env.SEED_FUNCTION_URL || 'https://us-central1-your-project.cloudfunctions.net/seedDemoData'
  try {
    const r = await fetch(fnUrl, { method: 'POST', headers: { 'x-seed-secret': secret } })
    const text = await r.text()
    return new Response(text, { status: r.status })
  } catch (e) {
    return new Response('Proxy failed', { status: 500 })
  }
}
