-- DropForeignKey
ALTER TABLE "Abstract" DROP CONSTRAINT "Abstract_participantId_fkey";

-- AddForeignKey
ALTER TABLE "Abstract" ADD CONSTRAINT "Abstract_participantId_fkey" FOREIGN KEY ("participantId") REFERENCES "Participant"("id") ON DELETE CASCADE ON UPDATE CASCADE;
