-- CreateEnum
CREATE TYPE "DocumentType" AS ENUM ('SURAT_KELUAR', 'BERITA_ACARA', 'SURAT_TUGAS', 'SURAT_KETERANGAN', 'SURAT_MASUK');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Record" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "documentType" "DocumentType" NOT NULL,
    "index" TEXT,
    "classificationCode" TEXT NOT NULL,
    "serialNumber" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "origin" TEXT,
    "date" TIMESTAMP(3) NOT NULL,
    "attachment" TEXT,
    "formatNumber" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Record_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Classification" (
    "code" TEXT NOT NULL,
    "content" TEXT NOT NULL,

    CONSTRAINT "Classification_pkey" PRIMARY KEY ("code")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Record" ADD CONSTRAINT "Record_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Record" ADD CONSTRAINT "Record_classificationCode_fkey" FOREIGN KEY ("classificationCode") REFERENCES "Classification"("code") ON DELETE RESTRICT ON UPDATE CASCADE;
