import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

// PUT /api/requests/[id] — Update request status (accept or decline)
// Only the recipient of the request can update its status
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { status } = body;

    // Validate status value
    if (!status || !['accepted', 'declined'].includes(status)) {
      return NextResponse.json(
        { error: 'Status must be "accepted" or "declined"' },
        { status: 400 }
      );
    }

    // Fetch the request
    const collabRequest = await prisma.collabRequest.findUnique({
      where: { id: params.id },
    });

    if (!collabRequest) {
      return NextResponse.json({ error: 'Request not found' }, { status: 404 });
    }

    // Only the recipient can accept or decline
    if (collabRequest.toUserId !== session.user.id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    // Can only update pending requests
    if (collabRequest.status !== 'pending') {
      return NextResponse.json(
        { error: 'Request has already been responded to' },
        { status: 400 }
      );
    }

    const updated = await prisma.collabRequest.update({
      where: { id: params.id },
      data: { status },
      include: {
        fromUser: {
          select: {
            id: true,
            name: true,
            department: true,
            university: true,
          },
        },
        toUser: {
          select: {
            id: true,
            name: true,
            department: true,
            university: true,
          },
        },
        project: {
          select: {
            id: true,
            title: true,
          },
        },
      },
    });

    return NextResponse.json({ data: updated });
  } catch (error) {
    console.error('Error updating request:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
