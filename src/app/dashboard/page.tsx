import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import Link from 'next/link';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { computeMatches } from '@/lib/matching';
import { ResearcherCard } from '@/components/researchers/ResearcherCard';
import { ProjectCard } from '@/components/projects/ProjectCard';
import { Badge } from '@/components/ui/Badge';

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/login?callbackUrl=/dashboard');
  }

  // Fetch current user data
  const currentUser = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: {
      projects: {
        orderBy: { createdAt: 'desc' },
        take: 3,
      },
      _count: {
        select: {
          sentRequests: true,
          receivedRequests: { where: { status: 'pending' } },
        },
      },
    },
  });

  if (!currentUser) {
    redirect('/login');
  }

  // Fetch top 3 matches
  const allCandidates = await prisma.user.findMany({
    where: { id: { not: session.user.id } },
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

  const topMatches = computeMatches(currentUser, allCandidates, 3);

  // Fetch recent received requests
  const recentRequests = await prisma.collabRequest.findMany({
    where: {
      toUserId: session.user.id,
      status: 'pending',
    },
    include: {
      fromUser: {
        select: {
          id: true,
          name: true,
          department: true,
          university: true,
        },
      },
    },
    orderBy: { createdAt: 'desc' },
    take: 3,
  });

  const needsProfileCompletion =
    currentUser.expertiseTags.length === 0 ||
    currentUser.collaborationNeeds.length === 0;

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Welcome header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome back, {currentUser.name.split(' ')[0]}
        </h1>
        <p className="mt-1 text-gray-500">
          {currentUser.department
            ? `${currentUser.department} · ${currentUser.university}`
            : currentUser.university}
        </p>
      </div>

      {/* Profile completion banner */}
      {needsProfileCompletion && (
        <div className="mb-8 flex items-center justify-between rounded-xl border border-amber-200 bg-amber-50 p-4">
          <div className="flex items-center gap-3">
            <svg
              className="h-5 w-5 text-amber-500"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z"
                clipRule="evenodd"
              />
            </svg>
            <p className="text-sm font-medium text-amber-800">
              Complete your profile to get better matches. Add your expertise
              tags and collaboration needs.
            </p>
          </div>
          <Link
            href="/profile/edit"
            className="ml-4 flex-shrink-0 rounded-md bg-amber-100 px-3 py-1.5 text-sm font-medium text-amber-800 hover:bg-amber-200"
          >
            Complete Profile
          </Link>
        </div>
      )}

      {/* Stats row */}
      <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div className="rounded-xl border border-gray-200 bg-white p-5 text-center shadow-sm">
          <p className="text-2xl font-bold text-indigo-600">
            {topMatches.length}
          </p>
          <p className="text-xs text-gray-500">Matches Found</p>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-5 text-center shadow-sm">
          <p className="text-2xl font-bold text-indigo-600">
            {currentUser.projects.length}
          </p>
          <p className="text-xs text-gray-500">Your Projects</p>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-5 text-center shadow-sm">
          <p className="text-2xl font-bold text-indigo-600">
            {currentUser._count.sentRequests}
          </p>
          <p className="text-xs text-gray-500">Requests Sent</p>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-5 text-center shadow-sm">
          <p className="text-2xl font-bold text-indigo-600">
            {currentUser._count.receivedRequests}
          </p>
          <p className="text-xs text-gray-500">Pending Inbox</p>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Left column: matches + projects */}
        <div className="lg:col-span-2 space-y-8">
          {/* Top matches */}
          <section>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">
                Top Matches
              </h2>
              <Link
                href="/matches"
                className="text-sm font-medium text-indigo-600 hover:text-indigo-700"
              >
                View all →
              </Link>
            </div>
            {topMatches.length === 0 ? (
              <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 p-8 text-center">
                <p className="text-sm text-gray-500">
                  Add expertise tags and collaboration needs to get matched.
                </p>
                <Link
                  href="/profile/edit"
                  className="mt-3 inline-block text-sm font-medium text-indigo-600 hover:underline"
                >
                  Update Profile
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {topMatches.map((match) => (
                  <ResearcherCard
                    key={match.user.id}
                    researcher={match.user as any}
                    matchScore={match.score}
                    expertiseMatchCount={match.expertiseMatchCount}
                    needsMatchCount={match.needsMatchCount}
                  />
                ))}
              </div>
            )}
          </section>

          {/* Your projects */}
          <section>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">
                Your Projects
              </h2>
              <div className="flex gap-3">
                <Link
                  href="/projects/new"
                  className="text-sm font-medium text-indigo-600 hover:text-indigo-700"
                >
                  + New
                </Link>
                <Link
                  href={`/projects?userId=${session.user.id}`}
                  className="text-sm font-medium text-gray-500 hover:text-gray-700"
                >
                  View all
                </Link>
              </div>
            </div>
            {currentUser.projects.length === 0 ? (
              <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 p-8 text-center">
                <p className="text-sm text-gray-500">
                  You haven&apos;t created any projects yet.
                </p>
                <Link
                  href="/projects/new"
                  className="mt-3 inline-block text-sm font-medium text-indigo-600 hover:underline"
                >
                  Create your first project
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {currentUser.projects.map((project) => (
                  <ProjectCard
                    key={project.id}
                    project={project as any}
                    showOwner={false}
                  />
                ))}
              </div>
            )}
          </section>
        </div>

        {/* Right column: pending requests */}
        <div>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">
              Pending Requests
            </h2>
            <Link
              href="/requests"
              className="text-sm font-medium text-indigo-600 hover:text-indigo-700"
            >
              View all →
            </Link>
          </div>
          {recentRequests.length === 0 ? (
            <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 p-8 text-center">
              <p className="text-sm text-gray-500">
                No pending collaboration requests.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {recentRequests.map((req) => (
                <div
                  key={req.id}
                  className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <Link
                        href={`/researchers/${req.fromUser.id}`}
                        className="font-medium text-gray-900 hover:text-indigo-600"
                      >
                        {req.fromUser.name}
                      </Link>
                      <p className="text-xs text-gray-500">
                        {req.fromUser.department}
                      </p>
                    </div>
                    <Badge variant="yellow">pending</Badge>
                  </div>
                  {req.message && (
                    <p className="mt-2 line-clamp-2 text-xs text-gray-600 italic">
                      &ldquo;{req.message}&rdquo;
                    </p>
                  )}
                  <Link
                    href="/requests"
                    className="mt-2 block text-xs font-medium text-indigo-600 hover:underline"
                  >
                    Respond →
                  </Link>
                </div>
              ))}
            </div>
          )}

          {/* Quick links */}
          <div className="mt-6 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
            <h3 className="text-sm font-semibold text-gray-900">Quick Links</h3>
            <nav className="mt-3 space-y-2">
              {[
                { href: '/profile/edit', label: 'Edit Profile' },
                { href: '/profile', label: 'View My Profile' },
                { href: '/matches', label: 'All Matches' },
                { href: '/projects/new', label: 'New Project' },
                { href: '/researchers', label: 'Browse Researchers' },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block text-sm text-gray-600 hover:text-indigo-600"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}
