/*
  Warnings:

  - You are about to drop the column `address` on the `ongs` table. All the data in the column will be lost.
  - Added the required column `country` to the `ongs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `number` to the `ongs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `street` to the `ongs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `avatar` to the `pets` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `size` on the `pets` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "ongs" DROP COLUMN "address",
ADD COLUMN     "country" TEXT NOT NULL,
ADD COLUMN     "number" INTEGER NOT NULL,
ADD COLUMN     "street" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "pets" ADD COLUMN     "avatar" TEXT NOT NULL,
DROP COLUMN "size",
ADD COLUMN     "size" INTEGER NOT NULL;
