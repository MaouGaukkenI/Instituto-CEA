-- DropIndex
DROP INDEX "User_name_key";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "allowGoogle" BOOLEAN NOT NULL DEFAULT false;
