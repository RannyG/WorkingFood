-- CreateEnum
CREATE TYPE "OrderSituation" AS ENUM ('RECEIVED', 'INPROGRESS', 'SHIPPEDTODELIVERY', 'DELIVERED');

-- CreateTable
CREATE TABLE "Product" (
    "id" BIGSERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "price" DECIMAL(65,30) NOT NULL,
    "isAvailable" BOOLEAN NOT NULL,
    "restaurantId" BIGINT NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" BIGSERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductCategory" (
    "idProduct" BIGINT NOT NULL,
    "idCategory" BIGINT NOT NULL,

    CONSTRAINT "ProductCategory_pkey" PRIMARY KEY ("idProduct","idCategory")
);

-- CreateTable
CREATE TABLE "Cart" (
    "idCostumer" BIGINT NOT NULL,
    "idProduct" BIGINT NOT NULL,
    "amount" INTEGER NOT NULL,

    CONSTRAINT "Cart_pkey" PRIMARY KEY ("idCostumer","idProduct")
);

-- CreateTable
CREATE TABLE "PurchaseItem" (
    "id" BIGSERIAL NOT NULL,
    "amount" INTEGER NOT NULL,
    "unitaryPrice" DECIMAL(65,30) NOT NULL,
    "idProduct" BIGINT NOT NULL,
    "idOrder" BIGINT NOT NULL,

    CONSTRAINT "PurchaseItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" BIGSERIAL NOT NULL,
    "situation" "OrderSituation" NOT NULL,
    "requestDate" TIMESTAMP(3) NOT NULL,
    "cepToDelivery" TEXT NOT NULL,
    "numberToDelivery" TEXT NOT NULL,
    "idCostumer" BIGINT NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES "Restaurant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductCategory" ADD CONSTRAINT "ProductCategory_idProduct_fkey" FOREIGN KEY ("idProduct") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductCategory" ADD CONSTRAINT "ProductCategory_idCategory_fkey" FOREIGN KEY ("idCategory") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cart" ADD CONSTRAINT "Cart_idCostumer_fkey" FOREIGN KEY ("idCostumer") REFERENCES "Costumer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cart" ADD CONSTRAINT "Cart_idProduct_fkey" FOREIGN KEY ("idProduct") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchaseItem" ADD CONSTRAINT "PurchaseItem_idProduct_fkey" FOREIGN KEY ("idProduct") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchaseItem" ADD CONSTRAINT "PurchaseItem_idOrder_fkey" FOREIGN KEY ("idOrder") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_idCostumer_fkey" FOREIGN KEY ("idCostumer") REFERENCES "Costumer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
