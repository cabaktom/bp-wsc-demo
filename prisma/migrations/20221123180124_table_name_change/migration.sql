/*
  Warnings:

  - You are about to drop the `page` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "page";

-- CreateTable
CREATE TABLE "Page" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(250) NOT NULL,
    "title" VARCHAR(250) NOT NULL,
    "content" TEXT NOT NULL,

    CONSTRAINT "Page_pkey" PRIMARY KEY ("id")
);
