/*
  Warnings:

  - You are about to drop the column `userId` on the `usercard` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `usercard` DROP FOREIGN KEY `UserCard_userId_fkey`;

-- AlterTable
ALTER TABLE `usercard` DROP COLUMN `userId`;

-- AddForeignKey
ALTER TABLE `UserCard` ADD CONSTRAINT `UserCard_id_fkey` FOREIGN KEY (`id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
