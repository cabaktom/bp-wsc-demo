/*
  Warnings:

  - You are about to alter the column `title` on the `Abstract` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `username` on the `Admin` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `email` on the `Admin` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `fullName` on the `Participant` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `email` on the `Participant` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.

*/
-- AlterTable
ALTER TABLE "Abstract" ALTER COLUMN "title" SET DATA TYPE VARCHAR(255);

-- AlterTable
ALTER TABLE "Admin" ALTER COLUMN "username" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "email" SET DATA TYPE VARCHAR(255);

-- AlterTable
ALTER TABLE "Page" ALTER COLUMN "name" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "title" SET DATA TYPE VARCHAR(255);

-- AlterTable
ALTER TABLE "Participant" ALTER COLUMN "fullName" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "email" SET DATA TYPE VARCHAR(255);
