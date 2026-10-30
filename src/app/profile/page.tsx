import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import Link from 'next/link';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { Badge } from '@/components/ui/Badge';
import { ProjectCard } from '@/components/projects/ProjectCard';

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/login?callbackUrl=/profile');
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: {
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
    redirect('/login');
  }

  const initials = user.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Profile card */}
      <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-5">
            {/* Avatar */}
            <div className="flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-full bg-indigo-100 text-xl font-bold text-indigo-700">
              {user.avatarUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={user.avatarUrl}
                  alt={user.name}
                  className="h-20 w-20 rounded-full object-cover"
                />
              ) : (
                initials
              )}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
              {user.department && (
                <p className="mt-0.5 text-gray-600">{user.department}</p>
              )}
              <p className="text-sm text-gray-400">{user.university}</p>
              <p className="text-sm text-gray-500">{user.email}</p>
              {user.contactInfo && (
                <p className="mt-1 text-sm text-gray-500">{user.contactInfo}</p>
              )}
            </div>
          </div>
          <Link
            href="/profile/edit"
            className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Edit Profile
          </Link>
        </div>

        {/* Stats */}
        <div className="mt-6 grid grid-cols-3 gap-4 border-t border-gray-100 pt-5">
          <div className="text-center">
            <p className="text-xl font-bold text-indigo-600">
              {user.projects.length}
            </p>
            <p className="text-xs text-gray-500">Projects</p>
          </div>
          <div className="text-center">
            <p className="text-xl font-bold text-indigo-600">
              {user._count.sentRequests}
            </p>
            <p className="text-xs text-gray-500">Requests Sent</p>
          </div>
          <div className="text-center">
            <p className="text-xl font-bold text-indigo-600">
              {user._count.receivedRequests}
            </p>
            <p className="text-xs text-gray-500">Requests Received</p>
          </div>
        </div>

        {/* Bio */}
        {user.bio ? (
          <div className="mt-6">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-400">
              About
            </h2>
            <p className="mt-2 leading-relaxed text-gray-700">{user.bio}</p>
          </div>
        ) : (
          <div className="mt-6 rounded-lg bg-amber-50 p-4">
            <p className="text-sm text-amber-700">
              Add a bio to help other researchers learn about your work.{' '}
              <Link
                href="/profile/edit"
                className="font-medium underline"
              >
                Edit profile
              </Link>
            </p>
          </div>
        )}

        {/* Expertise */}
        {user.expertiseTags.length > 0 ? (
          <div className="mt-5">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-400">
              Expertise
            </h2>
            <div className="mt-2 flex flex-wrap gap-2">
              {user.expertiseTags.map((tag) => (
                <Badge key={tag} variant="indigo">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        ) : (
          <div className="mt-5 rounded-lg bg-amber-50 p-4">
            <p className="text-sm text-amber-700">
              Add expertise tags to appear in search results and get matched.{' '}
              <Link href="/profile/edit" className="font-medium underline">
                Edit profile
              </Link>
            </p>
          </div>
        )}

        {/* Collaboration needs */}
        {user.collaborationNeeds.length > 0 && (
          <div className="mt-5">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-400">
              Seeking Collaborators With
            </h2>
            <div className="mt-2 flex flex-wrap gap-2">
              {user.collaborationNeeds.map((need) => (
                <Badge key={need} variant="purple">
                  {need}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Projects */}
      <div className="mt-8">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">
            My Projects ({user.projects.length})
          </h2>
          <Link
            href="/projects/new"
            className="text-sm font-medium text-indigo-600 hover:text-indigo-700"
          >
            + Add Project
          </Link>
        </div>
        {user.projects.length === 0 ? (
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
            {user.projects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project as any}
                showOwner={false}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
