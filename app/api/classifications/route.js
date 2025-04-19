import { NextResponse } from 'next/server';
import prisma from '../../lib/prisma';

export async function GET() {
  const classifications = await prisma.classification.findMany();
  return NextResponse.json(classifications);
}