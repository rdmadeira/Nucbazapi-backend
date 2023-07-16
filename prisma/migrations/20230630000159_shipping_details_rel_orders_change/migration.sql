/*
  Warnings:

  - Added the required column `ordersId` to the `ShippingDetails` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Orders" DROP CONSTRAINT "Orders_shippingDetailsId_fkey";

-- AlterTable
ALTER TABLE "ShippingDetails" ADD COLUMN     "ordersId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "ShippingDetails" ADD CONSTRAINT "ShippingDetails_ordersId_fkey" FOREIGN KEY ("ordersId") REFERENCES "Orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
