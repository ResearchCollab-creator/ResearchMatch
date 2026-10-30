import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

// GET /api/requests — Get all sent and received requests for the current user
export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const [sent, received] = await Promise.all([
      prisma.collabRequest.findMany({
        where: { fromUserId: session.user.id },
        include: {
          toUser: {
            select: {
              id: true,
              name: true,
              department: true,
              university: true,
              avatarUrl: true,
            },
          },
          project: {
            select: {
              id: true,
              title: true,
              status: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
      }),
      prisma.collabRequest.findMany({
        where: { toUserId: session.user.id },
        include: {
          fromUser: {
            select: {
              id: true,
              name: true,
              department: true,
              university: true,
              avatarUrl: true,
            },
          },
          project: {
            select: {
              id: true,
              title: true,
              status: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
      }),
    ]);

    return NextResponse.json({ data: { sent, received } });
  } catch (error) {
    console.error('Error fetching requests:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST /api/requests — Send a collaboration request
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { toUserId, projectId, message } = body;

    if (!toUserId) {
      return NextResponse.json(
        { error: 'toUserId is required' },
        { status: 400 }
      );
    }

    // Prevent sending request to yourself
    if (toUserId === session.user.id) {
      return NextResponse.json(
        { error: 'Cannot send a request to yourself' },
        { status: 400 }
      );
    }

    // Check if the target user exists
    const targetUser = await prisma.user.findUnique({
      where: { id: toUserId },
      select: { id: true },
    });

    if (!targetUser) {
      return NextResponse.json(
        { error: 'Target user not found' },
        { status: 404 }
      );
    }

    // Prevent duplicate pending requests
    const existing = await prisma.collabRequest.findFirst({
      where: {
        fromUserId: session.user.id,
        toUserId,
        ...(projectId && { projectId }),
        status: 'pending',
      },
    });

    if (existing) {
      return NextResponse.json(
        { error: 'A pending request already exists' },
        { status: 409 }
      );
    }

    const newRequest = await prisma.collabRequest.create({
      data: {
        fromUserId: session.user.id,
        toUserId,
        projectId: projectId || null,
        message: message || null,
      },
      include: {
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

    return NextResponse.json({ data: newRequest }, { status: 201 });
  } catch (error) {
    console.error('Error creating request:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
