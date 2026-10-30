import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

const MENTOR_SELECT = {
  isMentor: true,
  mentorshipFocus: true,
  mentoringAreas: true,
  mentorshipStyle: true,
  maxMentees: true,
} as const;

// GET /api/profile — Get the current user's own profile
export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
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
        ...MENTOR_SELECT,
        projects: {
          orderBy: { createdAt: 'desc' },
        },
        _count: {
          select: {
            sentRequests: true,
            receivedRequests: true,
          },
        },
      },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ data: user });
  } catch (error) {
    console.error('Error fetching profile:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// PUT /api/profile — Update the current user's own profile
export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
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
      // Mentor fields
      isMentor,
      mentorshipFocus,
      mentoringAreas,
      mentorshipStyle,
      maxMentees,
    } = body;

    const updated = await prisma.user.update({
      where: { id: session.user.id },
      data: {
        ...(name && { name }),
        ...(department !== undefined && { department }),
        ...(university !== undefined && { university }),
        ...(bio !== undefined && { bio }),
        ...(expertiseTags !== undefined && { expertiseTags }),
        ...(collaborationNeeds !== undefined && { collaborationNeeds }),
        ...(contactInfo !== undefined && { contactInfo }),
        ...(avatarUrl !== undefined && { avatarUrl }),
        // Mentor fields
        ...(isMentor !== undefined && { isMentor }),
        ...(mentorshipFocus !== undefined && { mentorshipFocus }),
        ...(mentoringAreas !== undefined && { mentoringAreas }),
        ...(mentorshipStyle !== undefined && { mentorshipStyle }),
        ...(maxMentees !== undefined && {
          maxMentees: maxMentees === '' || maxMentees === null ? null : Number(maxMentees),
        }),
      },
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
        updatedAt: true,
        ...MENTOR_SELECT,
      },
    });

    return NextResponse.json({ data: updated });
  } catch (error) {
    console.error('Error updating profile:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
