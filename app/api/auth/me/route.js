import { NextResponse } from 'next/server';
import { verify } from 'jsonwebtoken'; // Make sure to install jsonwebtoken
import prisma from '../../../lib/prisma'; // Adjust the import based on your project structure
import { parse } from 'cookie'; // To parse cookies

const JWT_SECRET = process.env.JWT_SECRET; // Ensure this is set in your environment variables

export async function GET(request) {
  // Extract the token from cookies
  const cookies = request.headers.get('cookie');
  const parsedCookies = parse(cookies || '');
  const token = parsedCookies.token;

  if (!token) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  try {
    // Verify the token
    const decoded = verify(token, JWT_SECRET);

    // Fetch the user from the database
    const user = await prisma.user.findUnique({
      where: { id: decoded.id }, // Assuming the token contains the user ID
    });

    if (!user) {
      return NextResponse.json({ error: 'User  not found' }, { status: 404 });
    }

    // Return the user data (excluding sensitive information)
    const { password, ...userData } = user; // Exclude password from the response
    return NextResponse.json(userData);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  }
}