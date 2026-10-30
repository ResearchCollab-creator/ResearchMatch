import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const [sent, received] = await Promise.all([
      prisma.mentorRequest.findMany({
        where: { fromUserId: session.user.id },
        include: {
          toUser: {
            select: {
              id: true,
              name: true,
              email: true,
              department: true,
              university: true,
              bio: true,
              expertiseTags: true,
              collaborationNeeds: true,
              contactInfo: true,
              avatarUrl: true,
              createdAt: true,
              updatedAt: true,
              isMentor: true,
              mentorshipFocus: true,
              mentoringAreas: true,
              mentorshipStyle: true,
              maxMentees: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
      }),
      prisma.mentorRequest.findMany({
        where: { toUserId: session.user.id },
        include: {
          fromUser: {
            select: {
              id: true,
              name: true,
              email: true,
              department: true,
              university: true,
              bio: true,
              expertiseTags: true,
              collaborationNeeds: true,
              contactInfo: true,
              avatarUrl: true,
              createdAt: true,
              updatedAt: true,
              isMentor: true,
              mentorshipFocus: true,
              mentoringAreas: true,
              mentorshipStyle: true,
              maxMentees: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
      }),
    ]);

    return NextResponse.json({ data: { sent, received } });
  } catch (error) {
    console.error('GET /api/mentor-requests error:', error);
    return NextResponse.json(
      { error: 'Failed to load mentor requests' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { toUserId, stage, goals, workDesc, message } = body;

    if (!toUserId || !stage || !goals || !workDesc) {
      return NextResponse.json(
        { error: 'toUserId, stage, goals, and workDesc are required' },
        { status: 400 }
      );
    }

    if (toUserId === session.user.id) {
      return NextResponse.json(
        { error: 'You cannot send a mentorship request to yourself' },
        { status: 400 }
      );
    }

    // Verify target is actually a mentor
    const mentor = await prisma.user.findUnique({
      where: { id: toUserId },
      select: { isMentor: true },
    });
    if (!mentor?.isMentor) {
      return NextResponse.json(
        { error: 'This user is not listed as a mentor' },
        { status: 400 }
      );
    }

    // Prevent duplicate pending requests
    const existing = await prisma.mentorRequest.findFirst({
      where: { fromUserId: session.user.id, toUserId, status: 'pending' },
    });
    if (existing) {
      return NextResponse.json(
        { error: 'You already have a pending mentorship request with this mentor' },
        { status: 400 }
      );
    }

    const mentorRequest = await prisma.mentorRequest.create({
      data: {
        fromUserId: session.user.id,
        toUserId,
        stage,
        goals,
        workDesc,
        message: message || null,
      },
      include: {
        fromUser: {
          select: {
            id: true, name: true, email: true, department: true,
            university: true, bio: true, expertiseTags: true,
            collaborationNeeds: true, contactInfo: true, avatarUrl: true,
            createdAt: true, updatedAt: true, isMentor: true,
            mentorshipFocus: true, mentoringAreas: true,
            mentorshipStyle: true, maxMentees: true,
          },
        },
        toUser: {
          select: {
            id: true, name: true, email: true, department: true,
            university: true, bio: true, expertiseTags: true,
            collaborationNeeds: true, contactInfo: true, avatarUrl: true,
            createdAt: true, updatedAt: true, isMentor: true,
            mentorshipFocus: true, mentoringAreas: true,
            mentorshipStyle: true, maxMentees: true,
          },
        },
      },
    });

    return NextResponse.json({ data: mentorRequest }, { status: 201 });
  } catch (error) {
    console.error('POST /api/mentor-requests error:', error);
    return NextResponse.json(
      { error: 'Failed to send mentorship request' },
      { status: 500 }
    );
  }
}
