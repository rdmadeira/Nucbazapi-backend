/*
  Warnings:

  - A unique constraint covering the columns `[state]` on the table `Status` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Status_state_key" ON "Status"("state");
