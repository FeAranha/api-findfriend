/*
  Warnings:

  - Added the required column `description` to the `pets` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `energy` on the `pets` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `independence` on the `pets` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "pets" ADD COLUMN     "description" TEXT NOT NULL,
DROP COLUMN "energy",
ADD COLUMN     "energy" INTEGER NOT NULL,
DROP COLUMN "independence",
ADD COLUMN     "independence" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "petimgs" (
    "id" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "pet_id" TEXT NOT NULL,

    CONSTRAINT "petimgs_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "petimgs" ADD CONSTRAINT "petimgs_pet_id_fkey" FOREIGN KEY ("pet_id") REFERENCES "pets"("id") ON DELETE CASCADE ON UPDATE CASCADE;
