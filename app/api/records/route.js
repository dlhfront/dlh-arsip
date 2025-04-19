import { NextResponse } from "next/server";
import prisma from "../../lib/prisma";
import { authMiddleware } from "../../lib/middleware";
import { monthToRoman } from "@/app/lib/romanMonths";

const JWT_SECRET = process.env.JWT_SECRET; // Ensure this is set in your environment variables


export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 10;
    const documentType = searchParams.get('type');
    
    const skip = (page - 1) * limit;
    
    const whereClause = documentType ? { documentType } : {};
    
    const [records, total] = await prisma.$transaction([
      prisma.record.findMany({
        where: whereClause,
        skip,
        take: limit,
        include: {
          user: { select: { username: true } },
          classification: { select: { title: true } }
        },
        orderBy: { createdAt: 'desc' }
      }),
      prisma.record.count({ where: whereClause })
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
    
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch records" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  const authResult = await authMiddleware(request);
  const userId = authResult.userId;
  if (authResult.error) {
    return NextResponse.json(
      { error: authResult.error },
      { status: authResult.status }
    );
  }
  const { documentType, index, classificationCode, summary, origin, date } =
    await request.json();

  const lastRecord = await prisma.record.findFirst({
    where: { documentType },
    orderBy: { serialNumber: "desc" },
  });

  const nextSerialNumber = lastRecord ? lastRecord.serialNumber + 1 : 0;

  let formatNumber;
  const newDate = new Date(date);
  const month = newDate.getMonth() + 1;
  const monthRoman = monthToRoman(month);
  const year = new Date(date).getFullYear();

  switch (documentType) {
    case "SURAT_KELUAR":
      formatNumber = `${classificationCode}/${nextSerialNumber
        .toString()
        .padStart(3, "0")}`;
      break;
    case "BERITA_ACARA":
      formatNumber = `${classificationCode}/${nextSerialNumber}/BA/${monthRoman}/${year}`;
      break;
    case "SURAT_TUGAS":
      formatNumber = `${classificationCode}/${nextSerialNumber}/ST/${monthRoman}/${year}`;
      break;
    case "SURAT_KETERANGAN":
      formatNumber = `${classificationCode}/${nextSerialNumber}/SK/${monthRoman}/${year}`;
      break;
    case "SURAT_MASUK":
      formatNumber = `${classificationCode}/${nextSerialNumber
        .toString()
        .padStart(3, "0")}`;
      break;
    default:
      return NextResponse.json(
        { error: "Invalid document type" },
        { status: 400 }
      );
  }

  const record = await prisma.record.create({
    data: {
      userId, // Use the extracted userId
      documentType,
      index,
      classificationCode,
      serialNumber: nextSerialNumber,
      summary,
      origin,
      date: new Date(date),
      //   attachment,
      formatNumber,
    },
  });

  return NextResponse.json(record, { status: 201 });
}
