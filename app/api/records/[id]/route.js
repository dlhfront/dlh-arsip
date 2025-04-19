import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';
import { authMiddleware } from '../../../lib/middleware';

export async function GET(request, { params }) {
  const { id } = params;

  // Use the auth middleware
  const authResult = await authMiddleware(request);
  if (authResult.error) {
    return NextResponse.json({ error: authResult.error }, { status: authResult.status });
  }

  const record = await prisma.record.findUnique({
    where: { id },
    include: {
      user: true,
      classification: true,
    },
  });

  if (!record) {
    return NextResponse.json({ error: 'Record not found' }, { status: 404 });
  }

  return NextResponse.json(record);
}

export async function PUT(request, { params }) {
  const { id } = params;

  // Authentication and authorization
  const authResult = await authMiddleware(request);
  if (authResult.error) {
    return NextResponse.json({ error: authResult.error }, { status: authResult.status });
  }

  // Fetch existing record
  const existingRecord = await prisma.record.findUnique({
    where: { id },
  });

  if (!existingRecord) {
    return NextResponse.json({ error: 'Record not found' }, { status: 404 });
  }

  // Authorization check
  if (existingRecord.userId !== authResult.userId) {
    return NextResponse.json(
      { error: 'You are not authorized to update this record' },
      { status: 403 }
    );
  }

  // Parse request body
  const {
    documentType,
    index,
    classificationCode,
    summary,
    origin,
    date,
    attachment,
  } = await request.json();

  // Generate updated formatNumber using original serialNumber
  const monthRoman = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(new Date(date));
  const year = new Date(date).getFullYear();
  
  let formatNumber;
  switch (documentType) {
    case 'SURAT_KELUAR':
      formatNumber = `${classificationCode}/${existingRecord.serialNumber.toString().padStart(3, '0')}`;
      break;
    case 'BERITA_ACARA':
      formatNumber = `${classificationCode}/${existingRecord.serialNumber}/BA/${monthRoman}/${year}`;
      break;
    case 'SURAT_TUGAS':
      formatNumber = `${classificationCode}/${existingRecord.serialNumber}/ST/${monthRoman}/${year}`;
      break;
    case 'SURAT_KETERANGAN':
      formatNumber = `${classificationCode}/${existingRecord.serialNumber}/SK/${monthRoman}/${year}`;
      break;
    case 'SURAT_MASUK':
      formatNumber = `${classificationCode}/${existingRecord.serialNumber.toString().padStart(3, '0')}`;
      break;
    default:
      return NextResponse.json({ error: 'Invalid document type' }, { status: 400 });
  }

  // Update record
  const updatedRecord = await prisma.record.update({
    where: { id },
    data: {
      documentType,
      index,
      classificationCode,
      summary,
      origin,
      date: new Date(date),
      attachment,
      formatNumber,
      updatedAt: new Date(),
    },
  });

  return NextResponse.json(updatedRecord);
}

export async function DELETE(request, { params }) {
  const { id } = params;

  // Use the auth middleware
  const authResult = await authMiddleware(request);
  if (authResult.error) {
    return NextResponse.json({ error: authResult.error }, { status: authResult.status });
  }

  const userId = authResult.userId; // Get the authenticated user's ID

  // Fetch the record to check the author
  const record = await prisma.record.findUnique({
    where: { id },
  });

  if (!record) {
    return NextResponse.json({ error: 'Record not found' }, { status: 404 });
  }

  // Check if the authenticated user is the author of the record
  if (record.userId !== userId) {
    return NextResponse.json({ error: 'You are not authorized to delete this record' }, { status: 403 });
  }

  const deletedRecord = await prisma.record.delete({
    where: { id },
  });

  return NextResponse.json({ message: 'Record deleted successfully', deletedRecord });
}   