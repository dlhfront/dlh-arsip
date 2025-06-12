import { NextResponse } from 'next/server'
import prisma from '../../../lib/prisma'

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const documentType = searchParams.get('documentType')
  const query = searchParams.get('query') || ''

  try {
    const where = {
      documentType,
      OR: query ? [
        { index: { contains: query, mode: 'insensitive' } },
        { origin: { contains: query, mode: 'insensitive' } },
        { summary: { contains: query, mode: 'insensitive' } },
        { formatNumber: { contains: query, mode: 'insensitive' } },
        { classification: { title: { contains: query, mode: 'insensitive' } } }
      ] : undefined
    }

    const records = await prisma.record.findMany({
      where,
      include: {
        classification: { select: { title: true } },
        user: { select: { username: true } }
      },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json(records)
  } catch (error) {
    return NextResponse.json(
      { error: "Search failed" },
      { status: 500 }
    )
  }
}