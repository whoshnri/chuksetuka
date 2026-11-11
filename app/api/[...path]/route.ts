import { getCloudflareContext } from '@opennextjs/cloudflare'
import { NextRequest } from 'next/server'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

function sameOrigin(request: Request) {
  const expected = process.env.SITE_ORIGIN || new URL(request.url).origin
  const origin = request.headers.get('origin')
  if (!origin) return false
  try {
    if (new URL(origin).origin !== new URL(expected).origin) return false
  } catch { return false }
  const fetchSite = request.headers.get('sec-fetch-site')
  return !fetchSite || fetchSite === 'same-origin'
}

async function forward(request: NextRequest) {
  if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(request.method) && !sameOrigin(request)) {
    return Response.json({ error: 'This request could not be verified.' }, { status: 403, headers: { 'Cache-Control': 'no-store' } })
  }

  const path = request.nextUrl.pathname.replace(/^\/api/, '') + request.nextUrl.search
  const headers = new Headers(request.headers)
  headers.delete('host')
  headers.delete('cookie')
  let response: Response
  const requestInit = {
    method: request.method,
    headers,
    body: ['GET', 'HEAD'].includes(request.method) ? undefined : request.body,
    duplex: 'half' as const,
  }
  if (process.env.NODE_ENV === 'development') {
    const apiOrigin = process.env.HONO_API_URL || 'http://127.0.0.1:8787'
    response = await fetch(new Request(new URL(path, apiOrigin), {
      ...requestInit, cache: 'no-store', redirect: 'error',
    })).catch(() => Response.json({ error: 'The service is temporarily unavailable.' }, { status: 503 }))
  } else {
    try {
      const context = getCloudflareContext()
      response = await context.env.API.fetch(new Request(`https://api.internal${path}`, requestInit))
    } catch {
      const apiOrigin = process.env.HONO_API_URL || 'http://127.0.0.1:8787'
      response = await fetch(new Request(new URL(path, apiOrigin), {
        ...requestInit, cache: 'no-store', redirect: 'error',
      })).catch(() => Response.json({ error: 'The service is temporarily unavailable.' }, { status: 503 }))
    }
  }
  const outputHeaders = new Headers(response.headers)
  outputHeaders.delete('set-cookie')
  return new Response(response.body, { status: response.status, headers: outputHeaders })
}

export const GET = forward
export const POST = forward
export const PUT = forward
export const PATCH = forward
export const DELETE = forward
