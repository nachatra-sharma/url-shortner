/*
  Warnings:

  - You are about to drop the `URL` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "URL" DROP CONSTRAINT "URL_userId_fkey";

-- DropTable
DROP TABLE "URL";

-- CreateTable
CREATE TABLE "url" (
    "id" SERIAL NOT NULL,
    "originalURL" TEXT NOT NULL,
    "shortURL" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "url_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "url" ADD CONSTRAINT "url_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
