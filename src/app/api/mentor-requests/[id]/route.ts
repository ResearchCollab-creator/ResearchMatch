import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { status } = body;

    if (!['accepted', 'declined'].includes(status)) {
      return NextResponse.json(
        { error: 'Status must be "accepted" or "declined"' },
        { status: 400 }
      );
    }

    // Fetch the request to verify the current user is the recipient
    const mentorRequest = await prisma.mentorRequest.findUnique({
      where: { id: params.id },
    });

    if (!mentorRequest) {
      return NextResponse.json({ error: 'Request not found' }, { status: 404 });
    }

    if (mentorRequest.toUserId !== session.user.id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    if (mentorRequest.status !== 'pending') {
      return NextResponse.json(
        { error: 'Only pending requests can be updated' },
        { status: 400 }
      );
    }

    const updated = await prisma.mentorRequest.update({
      where: { id: params.id },
      data: { status },
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

    return NextResponse.json({ data: updated });
  } catch (error) {
    console.error('PUT /api/mentor-requests/[id] error:', error);
    return NextResponse.json(
      { error: 'Failed to update mentorship request' },
      { status: 500 }
    );
  }
}
