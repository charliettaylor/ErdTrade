/*
  Warnings:

  - The primary key for the `Posts` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Posts` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `authorId` to the `Posts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Posts" DROP CONSTRAINT "Posts_pkey",
ADD COLUMN     "authorId" INTEGER NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Posts_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "Posts" ADD CONSTRAINT "Posts_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
