/*
  Warnings:

  - A unique constraint covering the columns `[shortURL]` on the table `url` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "url_shortURL_key" ON "url"("shortURL");
