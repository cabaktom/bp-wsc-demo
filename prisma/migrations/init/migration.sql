-- CreateTable
CREATE TABLE "Page" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(250) NOT NULL,
    "title" VARCHAR(250) NOT NULL,
    "content" TEXT NOT NULL,

    CONSTRAINT "Page_pkey" PRIMARY KEY ("id")
);

