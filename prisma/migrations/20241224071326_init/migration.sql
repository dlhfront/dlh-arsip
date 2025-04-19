/*
  Warnings:

  - You are about to drop the column `content` on the `Classification` table. All the data in the column will be lost.
  - Added the required column `title` to the `Classification` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Classification" DROP COLUMN "content",
ADD COLUMN     "title" TEXT NOT NULL;
