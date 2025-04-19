import { NextResponse } from 'next/server';
import { serialize } from 'cookie';

export async function POST() {
  const cookie = serialize('token', '', { httpOnly: true, path: '/', maxAge: -1 });
  return NextResponse.json({ message: 'Logged out' }, {
    headers: {
      'Set-Cookie': cookie,
    },
  });
}