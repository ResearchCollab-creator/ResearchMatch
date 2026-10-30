import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

// Public fields to return for user profiles
const PUBLIC_SELECT = {
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
  // Mentor fields
  isMentor: true,
  mentorshipFocus: true,
  mentoringAreas: true,
  mentorshipStyle: true,
  maxMentees: true,
};

// GET /api/users/[id] — Get public profile for a researcher
export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: params.id },
      select: {
        ...PUBLIC_SELECT,
        projects: {
          orderBy: { createdAt: 'desc' },
          select: {
            id: true,
            title: true,
            description: true,
            tags: true,
            neededExpertise: true,
            status: true,
            createdAt: true,
          },
        },
      },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ data: user });
  } catch (error) {
    console.error('Error fetching user:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// PUT /api/users/[id] — Update user (only allowed by the user themselves)
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Only allow users to update their own profile
    if (session.user.id !== params.id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const body = await request.json();
    const {
      name,
      department,
      university,
      bio,
      expertiseTags,
      collaborationNeeds,
      contactInfo,
      avatarUrl,
    } = body;

    const updated = await prisma.user.update({
      where: { id: params.id },
      data: {
        ...(name && { name }),
        ...(department !== undefined && { department }),
        ...(university && { university }),
        ...(bio !== undefined && { bio }),
        ...(expertiseTags !== undefined && { expertiseTags }),
        ...(collaborationNeeds !== undefined && { collaborationNeeds }),
        ...(contactInfo !== undefined && { contactInfo }),
        ...(avatarUrl !== undefined && { avatarUrl }),
      },
      select: PUBLIC_SELECT,
    });

    return NextResponse.json({ data: updated });
  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
