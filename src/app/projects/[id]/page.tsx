'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

interface ProjectDetail {
  id: string;
  title: string;
  description: string;
  tags: string[];
  neededExpertise: string[];
  status: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  user: {
    id: string;
    name: string;
    department: string | null;
    university: string;
    avatarUrl: string | null;
    expertiseTags: string[];
  };
  requests: { id: string; status: string; fromUserId: string }[];
}

const statusColors: Record<string, 'green' | 'yellow' | 'default'> = {
  active: 'green',
  paused: 'yellow',
  completed: 'default',
};

export default function ProjectDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { data: session } = useSession();
  const router = useRouter();

  const [project, setProject] = useState<ProjectDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Collaboration request state
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [requestMessage, setRequestMessage] = useState('');
  const [requestLoading, setRequestLoading] = useState(false);
  const [requestSuccess, setRequestSuccess] = useState(false);
  const [requestError, setRequestError] = useState('');

  // Delete state
  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => {
    fetchProject();
  }, [id]);

  const fetchProject = async () => {
    try {
      const response = await fetch(`/api/projects/${id}`);
      const data = await response.json();
      if (!response.ok) {
        setError(data.error || 'Project not found');
        return;
      }
      setProject(data.data);
    } catch {
      setError('Failed to load project');
    } finally {
      setLoading(false);
    }
  };

  const handleSendRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session) {
      router.push('/login');
      return;
    }

    setRequestLoading(true);
    setRequestError('');

    try {
      const response = await fetch('/api/requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          toUserId: project!.userId,
          projectId: id,
          message: requestMessage || null,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setRequestError(data.error || 'Failed to send request');
        return;
      }

      setRequestSuccess(true);
      setShowRequestModal(false);
    } catch {
      setRequestError('An unexpected error occurred');
    } finally {
      setRequestLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this project?')) return;
    setDeleteLoading(true);

    try {
      const response = await fetch(`/api/projects/${id}`, { method: 'DELETE' });
      if (response.ok) {
        router.push('/projects');
      }
    } catch {
      console.error('Failed to delete project');
    } finally {
      setDeleteLoading(false);
    }
  };

  const isOwner = session?.user?.id === project?.userId;
  const hasAlreadyRequested = project?.requests.some(
    (r) => r.fromUserId === session?.user?.id && r.status === 'pending'
  );

  if (loading) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="animate-pulse space-y-6">
          <div className="h-8 w-3/4 rounded bg-gray-200" />
          <div className="h-48 rounded-xl bg-gray-200" />
        </div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-10 text-center sm:px-6 lg:px-8">
        <p className="text-gray-500">{error || 'Project not found'}</p>
        <Link
          href="/projects"
          className="mt-4 inline-block text-sm text-indigo-600 hover:underline"
        >
          ← Back to projects
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Back link */}
      <Link
        href="/projects"
        className="mb-6 inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-800"
      >
        <svg
          className="h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
          />
        </svg>
        Back to projects
      </Link>

      <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-gray-900">
                {project.title}
              </h1>
              <Badge
                variant={statusColors[project.status] || 'default'}
                className="capitalize"
              >
                {project.status}
              </Badge>
            </div>

            {/* Owner */}
            <Link
              href={`/researchers/${project.user.id}`}
              className="mt-2 inline-flex items-center gap-1 text-sm text-gray-500 hover:text-indigo-600"
            >
              by {project.user.name}
              {project.user.department && ` · ${project.user.department}`}
            </Link>
          </div>

          {/* Actions */}
          <div className="flex flex-shrink-0 flex-col gap-2">
            {isOwner ? (
              <>
                <Link
                  href={`/projects/${id}/edit`}
                  className="rounded-md border border-gray-300 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Edit
                </Link>
                <Button
                  variant="danger"
                  size="sm"
                  loading={deleteLoading}
                  onClick={handleDelete}
                >
                  Delete
                </Button>
              </>
            ) : session && project.status === 'active' ? (
              requestSuccess || hasAlreadyRequested ? (
                <div className="rounded-md bg-green-50 px-4 py-2 text-sm font-medium text-green-700">
                  {hasAlreadyRequested ? 'Request pending' : 'Request sent!'}
                </div>
              ) : (
                <Button onClick={() => setShowRequestModal(true)}>
                  Request Collaboration
                </Button>
              )
            ) : !session ? (
              <Link
                href="/login"
                className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
              >
                Sign in to Collaborate
              </Link>
            ) : null}
          </div>
        </div>

        {/* Description */}
        <div className="mt-6">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-400">
            Description
          </h2>
          <p className="mt-2 leading-relaxed text-gray-700">
            {project.description}
          </p>
        </div>

        {/* Tags */}
        {project.tags.length > 0 && (
          <div className="mt-5">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-400">
              Research Areas
            </h2>
            <div className="mt-2 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <Badge key={tag} variant="blue">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Needed expertise */}
        {project.neededExpertise.length > 0 && (
          <div className="mt-5">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-400">
              Looking for Expertise In
            </h2>
            <div className="mt-2 flex flex-wrap gap-2">
              {project.neededExpertise.map((exp) => (
                <Badge key={exp} variant="purple">
                  {exp}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Dates */}
        <div className="mt-6 flex items-center gap-6 border-t border-gray-100 pt-4 text-xs text-gray-400">
          <span>
            Created{' '}
            {new Date(project.createdAt).toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            })}
          </span>
          <span>
            Updated{' '}
            {new Date(project.updatedAt).toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            })}
          </span>
        </div>
      </div>

      {/* Collaboration Request Modal */}
      {showRequestModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl">
            <h2 className="text-lg font-semibold text-gray-900">
              Request to Join Project
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Send a collaboration request for &ldquo;{project.title}&rdquo;
            </p>

            {requestError && (
              <div className="mt-3 rounded-md bg-red-50 p-3 text-sm text-red-700">
                {requestError}
              </div>
            )}

            <form onSubmit={handleSendRequest} className="mt-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Message (optional)
                </label>
                <textarea
                  value={requestMessage}
                  onChange={(e) => setRequestMessage(e.target.value)}
                  rows={4}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  placeholder="Describe your relevant expertise and how you can contribute..."
                />
              </div>

              <div className="flex justify-end gap-3">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => setShowRequestModal(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" loading={requestLoading}>
                  Send Request
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
