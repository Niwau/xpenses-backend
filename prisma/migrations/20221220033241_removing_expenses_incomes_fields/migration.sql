/*
  Warnings:

  - You are about to drop the column `expenses` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `incomes` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `user` DROP COLUMN `expenses`,
    DROP COLUMN `incomes`;
