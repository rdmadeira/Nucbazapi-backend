/*
  Warnings:

  - You are about to drop the `UserAddress` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `ShippingPrice` to the `Orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subTotal` to the `Orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total` to the `Orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Products` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "UserAddress" DROP CONSTRAINT "UserAddress_userId_fkey";

-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "imgTag" TEXT;

-- AlterTable
ALTER TABLE "Orders" ADD COLUMN     "ShippingPrice" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "subTotal" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "total" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "Products" ADD COLUMN     "description" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "roleId" SET DEFAULT 2;

-- DropTable
DROP TABLE "UserAddress";

-- CreateTable
CREATE TABLE "ShippingDetails" (
    "id" SERIAL NOT NULL,
    "domicilio" TEXT NOT NULL,
    "localidad" TEXT NOT NULL,

    CONSTRAINT "ShippingDetails_pkey" PRIMARY KEY ("id")
);
