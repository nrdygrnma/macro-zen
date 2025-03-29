-- AlterTable
ALTER TABLE "User" ADD COLUMN     "activity" TEXT,
ADD COLUMN     "age" INTEGER,
ADD COLUMN     "fasting" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "fastingMethod" TEXT,
ADD COLUMN     "goal" TEXT,
ADD COLUMN     "goalWeight" DOUBLE PRECISION,
ADD COLUMN     "height" DOUBLE PRECISION,
ADD COLUMN     "sex" TEXT,
ADD COLUMN     "weight" DOUBLE PRECISION;
