/*
  Warnings:

  - Added the required column `phone` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "users" ADD COLUMN     "phone" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "PetCare" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL,
    "pet_id" TEXT NOT NULL,

    CONSTRAINT "PetCare_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PetCare" ADD CONSTRAINT "PetCare_pet_id_fkey" FOREIGN KEY ("pet_id") REFERENCES "pets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
