import { NextResponse } from 'next/server';
import prisma from '../../../../lib/prisma';
import { authMiddleware } from '../../../../lib/middleware';
export async function GET(request, { params }) {
  const { documentType } = params;
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page')) || 1;
  const limit = parseInt(searchParams.get('limit')) || 10;

  const authResult = await authMiddleware(request);
  if (authResult.error) {
    return NextResponse.json({ error: authResult.error }, { status: authResult.status });
  }

  const skip = (page - 1) * limit;
  
  const [records, total] = await prisma.$transaction([
    prisma.record.findMany({
      where: { documentType },
      skip,
      take: limit,
      include: {
        user: true,
        classification: true,
      },
      orderBy: { createdAt: 'desc' }
    }),
    prisma.record.count({ where: { documentType } })
  ]);

  return NextResponse.json({
    data: records,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit)
    }
  });
}