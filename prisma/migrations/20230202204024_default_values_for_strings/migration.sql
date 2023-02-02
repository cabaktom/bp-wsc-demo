-- AlterTable
ALTER TABLE "Abstract" ALTER COLUMN "additionalAuthors" SET DEFAULT '',
ALTER COLUMN "affiliationAuthors" SET DEFAULT '',
ALTER COLUMN "abstract" SET DEFAULT '';

-- AlterTable
ALTER TABLE "Participant" ALTER COLUMN "mailingAddress" SET DEFAULT '',
ALTER COLUMN "additionalMessage" SET DEFAULT '';
