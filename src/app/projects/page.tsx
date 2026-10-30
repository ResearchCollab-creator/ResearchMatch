'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { ProjectCard } from '@/components/projects/ProjectCard';
import { Project } from '@/types';

export default function ProjectsPage() {
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const userId = searchParams.get('userId');

  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchProjects();
  }, [userId]);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (userId) params.set('userId', userId);
      // If filtering by userId, show all statuses; otherwise only active
      if (userId) params.set('status', 'all');

      const response = await fetch(`/api/projects?${params.toString()}`);
      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Failed to load projects');
        return;
      }
      setProjects(data.data);
    } catch {
      setError('Failed to load projects');
    } finally {
      setLoading(false);
    }
  };

  const isOwnProjects = userId && session?.user?.id === userId;
  const pageTitle = isOwnProjects ? 'My Projects' : userId ? 'Researcher Projects' : 'All Projects';

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{pageTitle}</h1>
          <p className="mt-2 text-gray-500">
            {userId
              ? 'Projects from this researcher'
              : 'Browse active research projects seeking collaborators'}
          </p>
        </div>
        {session && (
          <Link
            href="/projects/new"
            className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
          >
            + New Project
          </Link>
        )}
      </div>

      {error && (
        <div className="mb-6 rounded-md bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      {loading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-64 animate-pulse rounded-xl bg-gray-200" />
          ))}
        </div>
      ) : projects.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-gray-300 bg-gray-50 py-16 text-center">
          <svg
            className="mx-auto h-10 w-10 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z"
            />
          </svg>
          <p className="mt-3 text-sm text-gray-500">
            {isOwnProjects
              ? "You haven't created any projects yet."
              : 'No active projects found.'}
          </p>
          {session && (
            <Link
              href="/projects/new"
              className="mt-4 rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
            >
              Create a Project
            </Link>
          )}
        </div>
      ) : (
        <>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                showOwner={!isOwnProjects}
              />
            ))}
          </div>
          <p className="mt-6 text-center text-sm text-gray-400">
            {projects.length} project{projects.length !== 1 ? 's' : ''}
          </p>
        </>
      )}
    </div>
  );
}
