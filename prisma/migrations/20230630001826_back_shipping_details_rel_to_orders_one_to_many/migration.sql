/*
  Warnings:

  - You are about to drop the column `ordersId` on the `ShippingDetails` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "ShippingDetails" DROP CONSTRAINT "ShippingDetails_ordersId_fkey";

-- AlterTable
ALTER TABLE "ShippingDetails" DROP COLUMN "ordersId";

-- AddForeignKey
ALTER TABLE "Orders" ADD CONSTRAINT "Orders_shippingDetailsId_fkey" FOREIGN KEY ("shippingDetailsId") REFERENCES "ShippingDetails"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
