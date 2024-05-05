/*
  Warnings:

  - You are about to drop the column `transactioId` on the `Order` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Order" DROP COLUMN "transactioId",
ADD COLUMN     "transactionId" TEXT;
