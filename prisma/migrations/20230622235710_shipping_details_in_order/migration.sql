/*
  Warnings:

  - Added the required column `shippingDetailsId` to the `Orders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Orders" ADD COLUMN     "shippingDetailsId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Orders" ADD CONSTRAINT "Orders_shippingDetailsId_fkey" FOREIGN KEY ("shippingDetailsId") REFERENCES "ShippingDetails"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
