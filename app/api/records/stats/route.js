import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';

export async function GET() {
  try {
    const stats = await prisma.record.groupBy({
      by: ['documentType'],
      _count: {
        _all: true,
      },
      _max: {
        createdAt: true,
      },
    });

    // Format the response to match expected structure
    const formattedStats = stats.map(stat => ({
      documentType: stat.documentType,
      count: stat._count._all,
      latestDate: stat._max.createdAt,
    }));

    return NextResponse.json(formattedStats);
  } catch (error) {
    console.error('Dashboard stats error:', error);
    return NextResponse.json(
      { error: "Failed to fetch dashboard stats" },
      { status: 500 }
    );
  }
}