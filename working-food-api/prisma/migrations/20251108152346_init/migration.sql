-- CreateEnum
CREATE TYPE "Role" AS ENUM ('COSTUMER', 'RESTAURANT');

-- CreateTable
CREATE TABLE "User" (
    "id" BIGSERIAL NOT NULL,
    "role" "Role" NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Costumer" (
    "id" BIGSERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "birthDate" DATE NOT NULL,
    "cellphone" TEXT NOT NULL,
    "userId" BIGINT NOT NULL,

    CONSTRAINT "Costumer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Restaurant" (
    "id" BIGSERIAL NOT NULL,
    "companyName" TEXT NOT NULL,
    "cnpj" TEXT NOT NULL,
    "userId" BIGINT NOT NULL,

    CONSTRAINT "Restaurant_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Costumer_userId_key" ON "Costumer"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Restaurant_cnpj_key" ON "Restaurant"("cnpj");

-- CreateIndex
CREATE UNIQUE INDEX "Restaurant_userId_key" ON "Restaurant"("userId");

-- AddForeignKey
ALTER TABLE "Costumer" ADD CONSTRAINT "Costumer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Restaurant" ADD CONSTRAINT "Restaurant_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
