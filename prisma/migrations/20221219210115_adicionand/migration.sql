-- AlterTable
ALTER TABLE `user` ADD COLUMN `expenses` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `incomes` INTEGER NOT NULL DEFAULT 0;
