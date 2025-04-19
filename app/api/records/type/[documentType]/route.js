import { NextResponse } from 'next/server';
import prisma from '../../../../lib/prisma';
import { authMiddleware } from '../../../../lib/middleware';

export async function GET(request, { params }) {
  const { documentType } = params;

  const authResult = await authMiddleware(request);
  if (authResult.error) {
    return NextResponse.json({ error: authResult.error }, { status: authResult.status });
  }

  const records = await prisma.record.findMany({
    where: { documentType },
    include: {
      user: true, 
      classification: true, 
    },
  });

  return NextResponse.json(records);
}