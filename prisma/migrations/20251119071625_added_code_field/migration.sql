/*
  Warnings:

  - A unique constraint covering the columns `[code]` on the table `url_maps` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `code` to the `url_maps` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "url_maps" ADD COLUMN     "code" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "url_maps_code_key" ON "url_maps"("code");
