// lib/authMiddleware.js
import { verify } from 'jsonwebtoken';
import { parse } from 'cookie';
import prisma from './prisma'; // Adjust the import based on your project structure

const JWT_SECRET = process.env.JWT_SECRET;

export const authMiddleware = async (request) => {
  const cookies = request.headers.get('cookie');
  const parsedCookies = parse(cookies || '');
  const token = parsedCookies.token;

  if (!token) {
    return { error: 'Not authenticated', status: 401 };
  }

  try {
    const decoded = verify(token, JWT_SECRET);
    const userId = decoded.id;

    // Optionally, you can fetch the user from the database to ensure they exist
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      return { error: 'User  not found', status: 404 };
    }

    return { userId, user }; // Return the userId and user object
  } catch (error) {
    return { error: 'Invalid token', status: 401 };
  }
};