/*
  Warnings:

  - You are about to drop the `Student_Password` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Student_Section` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Teacher_Course` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Teacher_Password` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Student_Password";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Student_Section";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Teacher_Course";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Teacher_Password";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Student_password" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "value" TEXT NOT NULL,
    "student_id" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Teacher_password" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "value" TEXT NOT NULL,
    "teacher_id" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Student_section" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "student_id" TEXT NOT NULL,
    "section_id" TEXT NOT NULL,
    CONSTRAINT "Student_section_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "Student" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Student_section_section_id_fkey" FOREIGN KEY ("section_id") REFERENCES "Section" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Teacher_course" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "teacher_id" TEXT NOT NULL,
    "course_id" TEXT NOT NULL,
    CONSTRAINT "Teacher_course_teacher_id_fkey" FOREIGN KEY ("teacher_id") REFERENCES "Teacher" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Teacher_course_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "Course" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Student_password_id_key" ON "Student_password"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Student_password_student_id_key" ON "Student_password"("student_id");

-- CreateIndex
CREATE UNIQUE INDEX "Teacher_password_id_key" ON "Teacher_password"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Teacher_password_teacher_id_key" ON "Teacher_password"("teacher_id");

-- CreateIndex
CREATE UNIQUE INDEX "Student_section_id_key" ON "Student_section"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Teacher_course_id_key" ON "Teacher_course"("id");
