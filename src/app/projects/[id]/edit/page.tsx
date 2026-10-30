'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ProjectForm } from '@/components/projects/ProjectForm';
import { Project } from '@/types';

export default function EditProjectPage() {
  const { id } = useParams<{ id: string }>();
  const { data: session, status } = useSession();
  const router = useRouter();

  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
      return;
    }
    if (status === 'authenticated') {
      fetchProject();
    }
  }, [status]);

  const fetchProject = async () => {
    try {
      const response = await fetch(`/api/projects/${id}`);
      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Project not found');
        return;
      }

      // Verify ownership
      if (data.data.userId !== session?.user?.id) {
        setError('You do not have permission to edit this project.');
        return;
      }

      setProject(data.data);
    } catch {
      setError('Failed to load project');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 w-48 rounded bg-gray-200" />
          <div className="h-96 rounded-xl bg-gray-200" />
        </div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-10 text-center sm:px-6 lg:px-8">
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
    <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8">
        <Link
          href={`/projects/${id}`}
          className="mb-4 inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-800"
        >
          ← Back to project
        </Link>
        <h1 className="mt-2 text-3xl font-bold text-gray-900">Edit Project</h1>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
        <ProjectForm initial={project} projectId={id} mode="edit" />
      </div>
    </div>
  );
}
