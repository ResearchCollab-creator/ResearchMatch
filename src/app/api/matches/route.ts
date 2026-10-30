import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { computeMatches } from '@/lib/matching';

// GET /api/matches — Return top 10 matching researchers for the current user
export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Fetch the current user's profile
    const currentUser = await prisma.user.findUnique({
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
        avatarUrl: true,
      },
    });

    if (!currentUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Fetch all other users as potential matches
    const candidates = await prisma.user.findMany({
      where: {
        id: { not: session.user.id }, // Exclude current user
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
        avatarUrl: true,
      },
    });

    // Compute match scores
    const matches = computeMatches(currentUser, candidates, 10);

    return NextResponse.json({ data: matches });
  } catch (error) {
    console.error('Error computing matches:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
