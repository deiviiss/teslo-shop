/*
  Warnings:

  - You are about to drop the column `paidtAt` on the `Order` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Order" DROP COLUMN "paidtAt",
ADD COLUMN     "paidAt" TIMESTAMP(3);
