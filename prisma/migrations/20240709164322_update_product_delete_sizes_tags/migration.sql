/*
  Warnings:

  - You are about to drop the column `sizes` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `tags` on the `products` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "products" DROP COLUMN "sizes",
DROP COLUMN "tags";
