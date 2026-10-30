import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const area = searchParams.get('area') || '';
  const focus = searchParams.get('focus') || '';
  const department = searchParams.get('department') || '';

  try {
    const mentors = await prisma.user.findMany({
      where: {
        isMentor: true,
        ...(department && {
          department: { contains: department, mode: 'insensitive' },
        }),
        ...(area && {
          mentoringAreas: { hasSome: [area] },
        }),
        ...(focus && {
          mentorshipFocus: { hasSome: [focus] },
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
        createdAt: true,
        updatedAt: true,
        isMentor: true,
        mentorshipFocus: true,
        mentoringAreas: true,
        mentorshipStyle: true,
        maxMentees: true,
      },
      orderBy: { name: 'asc' },
    });

    return NextResponse.json({ data: mentors });
  } catch (error) {
    console.error('GET /api/mentors error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch mentors' },
      { status: 500 }
    );
  }
}
