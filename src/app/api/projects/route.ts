import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

// GET /api/projects — List all active projects, optionally filtered by userId
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const status = searchParams.get('status');

    const projects = await prisma.project.findMany({
      where: {
        ...(userId && { userId }),
        ...(status ? { status } : { status: 'active' }),
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            department: true,
            university: true,
            avatarUrl: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ data: projects });
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST /api/projects — Create a new project (protected)
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { title, description, tags, neededExpertise, status } = body;

    // Validate required fields
    if (!title || !description) {
      return NextResponse.json(
        { error: 'Title and description are required' },
        { status: 400 }
      );
    }

    const project = await prisma.project.create({
      data: {
        title,
        description,
        tags: tags || [],
        neededExpertise: neededExpertise || [],
        status: status || 'active',
        userId: session.user.id,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            department: true,
            university: true,
          },
        },
      },
    });

    return NextResponse.json({ data: project }, { status: 201 });
  } catch (error) {
    console.error('Error creating project:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
