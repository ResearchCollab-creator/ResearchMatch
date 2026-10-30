import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/search?q=&tags=&department= — Search researchers
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const q = searchParams.get('q') || '';
    const tags = searchParams.get('tags') || '';
    const department = searchParams.get('department') || '';

    // Parse comma-separated tags
    const tagList = tags
      ? tags
          .split(',')
          .map((t) => t.trim().toLowerCase())
          .filter(Boolean)
      : [];

    // Build where clause for Prisma
    // Using OR for text search across name, bio, and department
    const users = await prisma.user.findMany({
      where: {
        AND: [
          // Text search: match name, bio, or department (case-insensitive)
          q
            ? {
                OR: [
                  { name: { contains: q, mode: 'insensitive' } },
                  { bio: { contains: q, mode: 'insensitive' } },
                  { department: { contains: q, mode: 'insensitive' } },
                  { university: { contains: q, mode: 'insensitive' } },
                ],
              }
            : {},
          // Department filter (exact, case-insensitive)
          department
            ? { department: { contains: department, mode: 'insensitive' } }
            : {},
        ],
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
        createdAt: true,
      },
      orderBy: { name: 'asc' },
    });

    // Filter by tags in application code (Prisma doesn't have native array contains for case-insensitive matching)
    const filtered =
      tagList.length > 0
        ? users.filter((user) => {
            const userTags = user.expertiseTags.map((t) => t.toLowerCase());
            // User must have at least one of the requested tags
            return tagList.some((tag) =>
              userTags.some((ut) => ut.includes(tag))
            );
          })
        : users;

    return NextResponse.json({ data: filtered });
  } catch (error) {
    console.error('Error searching researchers:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
