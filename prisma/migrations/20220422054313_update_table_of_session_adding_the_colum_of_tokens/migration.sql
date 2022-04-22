/*
  Warnings:

  - Added the required column `token` to the `sessions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "sessions" ADD COLUMN     "token" TEXT NOT NULL;
