-- CreateEnum
CREATE TYPE "Participation" AS ENUM ('ONSITE', 'ONLINE');

-- CreateTable
CREATE TABLE "Participant" (
    "id" SERIAL NOT NULL,
    "fullName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "affiliation" TEXT NOT NULL,
    "participation" "Participation" NOT NULL DEFAULT 'ONSITE',
    "mailingAddress" TEXT,
    "student" BOOLEAN NOT NULL DEFAULT false,
    "additionalMessage" TEXT,
    "registeredAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Participant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Abstract" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "poster" BOOLEAN NOT NULL DEFAULT false,
    "additionalAuthors" TEXT,
    "affiliationAuthors" TEXT,
    "abstract" TEXT,
    "participantId" INTEGER NOT NULL,

    CONSTRAINT "Abstract_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Abstract_participantId_key" ON "Abstract"("participantId");

-- AddForeignKey
ALTER TABLE "Abstract" ADD CONSTRAINT "Abstract_participantId_fkey" FOREIGN KEY ("participantId") REFERENCES "Participant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
