import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  const { portalId } = await request.json();

  if (!portalId) {
    return new NextResponse('Missing portalId', { status: 400 });
  }

  const cookieStore = cookies();
  cookieStore.set(`portal-session-${portalId}`, 'true', {
    path: '/',
    maxAge: 60 * 60 * 24, // 24 hours
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
  });

  return new NextResponse('Session created', { status: 200 });
}
