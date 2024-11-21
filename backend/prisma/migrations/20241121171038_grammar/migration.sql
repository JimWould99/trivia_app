/*
  Warnings:

  - You are about to drop the column `AnswerFour` on the `Question` table. All the data in the column will be lost.
  - You are about to drop the column `AnswerOne` on the `Question` table. All the data in the column will be lost.
  - You are about to drop the column `AnswerThree` on the `Question` table. All the data in the column will be lost.
  - You are about to drop the column `AnswerTwo` on the `Question` table. All the data in the column will be lost.
  - You are about to drop the column `CorrectAnswer` on the `Question` table. All the data in the column will be lost.
  - You are about to drop the column `Question` on the `Question` table. All the data in the column will be lost.
  - Added the required column `answerFour` to the `Question` table without a default value. This is not possible if the table is not empty.
  - Added the required column `answerOne` to the `Question` table without a default value. This is not possible if the table is not empty.
  - Added the required column `answerThree` to the `Question` table without a default value. This is not possible if the table is not empty.
  - Added the required column `answerTwo` to the `Question` table without a default value. This is not possible if the table is not empty.
  - Added the required column `correctAnswer` to the `Question` table without a default value. This is not possible if the table is not empty.
  - Added the required column `question` to the `Question` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Question" DROP COLUMN "AnswerFour",
DROP COLUMN "AnswerOne",
DROP COLUMN "AnswerThree",
DROP COLUMN "AnswerTwo",
DROP COLUMN "CorrectAnswer",
DROP COLUMN "Question",
ADD COLUMN     "answerFour" TEXT NOT NULL,
ADD COLUMN     "answerOne" TEXT NOT NULL,
ADD COLUMN     "answerThree" TEXT NOT NULL,
ADD COLUMN     "answerTwo" TEXT NOT NULL,
ADD COLUMN     "correctAnswer" INTEGER NOT NULL,
ADD COLUMN     "question" TEXT NOT NULL;
