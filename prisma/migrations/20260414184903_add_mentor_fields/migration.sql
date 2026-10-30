-- AlterTable
ALTER TABLE "User" ADD COLUMN     "isMentor" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "maxMentees" INTEGER,
ADD COLUMN     "mentoringAreas" TEXT[],
ADD COLUMN     "mentorshipFocus" TEXT[],
ADD COLUMN     "mentorshipStyle" TEXT;

-- CreateTable
CREATE TABLE "MentorRequest" (
    "id" TEXT NOT NULL,
    "stage" TEXT NOT NULL,
    "goals" TEXT NOT NULL,
    "workDesc" TEXT NOT NULL,
    "message" TEXT,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "fromUserId" TEXT NOT NULL,
    "toUserId" TEXT NOT NULL,

    CONSTRAINT "MentorRequest_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "MentorRequest" ADD CONSTRAINT "MentorRequest_fromUserId_fkey" FOREIGN KEY ("fromUserId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MentorRequest" ADD CONSTRAINT "MentorRequest_toUserId_fkey" FOREIGN KEY ("toUserId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
