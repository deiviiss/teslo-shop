-- CreateEnum
CREATE TYPE "Status" AS ENUM ('unpaid', 'paided', 'shipped', 'delivered');

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'unpaid';
