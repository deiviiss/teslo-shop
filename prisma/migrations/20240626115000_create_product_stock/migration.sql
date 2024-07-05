-- CreateTable
CREATE TABLE "product_stocks" (
    "id" TEXT NOT NULL,
    "size" "Size" NOT NULL,
    "inStock" INTEGER NOT NULL,
    "productId" TEXT NOT NULL,

    CONSTRAINT "product_stocks_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "product_stocks" ADD CONSTRAINT "product_stocks_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
