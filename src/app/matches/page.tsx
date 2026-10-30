'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ResearcherGrid } from '@/components/researchers/ResearcherGrid';
import { MatchResult } from '@/lib/matching';

export default function MatchesPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [matches, setMatches] = useState<MatchResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login?callbackUrl=/matches');
      return;
    }
    if (status === 'authenticated') {
      fetchMatches();
    }
  }, [status, router]);

  const fetchMatches = async () => {
    try {
      const response = await fetch('/api/matches');
      const data = await response.json();
      if (!response.ok) {
        setError(data.error || 'Failed to load matches');
        return;
      }
      setMatches(data.data);
    } catch {
      setError('Failed to load matches');
    } finally {
      setLoading(false);
    }
  };

  if (status === 'loading' || (status === 'authenticated' && loading)) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-6 h-8 w-48 animate-pulse rounded bg-gray-200" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-52 animate-pulse rounded-xl bg-gray-200" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Your Matches</h1>
        <p className="mt-2 text-gray-500">
          Researchers ranked by how well their expertise aligns with your
          collaboration needs — and your expertise with theirs.
        </p>
      </div>

      {/* How matching works explanation */}
      <div className="mb-8 rounded-xl border border-indigo-100 bg-indigo-50 p-4">
        <div className="flex items-start gap-3">
          <svg
            className="mt-0.5 h-5 w-5 flex-shrink-0 text-indigo-500"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z"
              clipRule="evenodd"
            />
          </svg>
          <div>
            <p className="text-sm font-medium text-indigo-800">
              How matching works
            </p>
            <p className="mt-0.5 text-sm text-indigo-700">
              Match scores are based on tag overlap: we compare your
              collaboration needs against each researcher&apos;s expertise, and
              your expertise against their needs. Higher overlap = higher score.
              Update your{' '}
              <Link
                href="/profile/edit"
                className="font-medium underline hover:text-indigo-900"
              >
                profile tags
              </Link>{' '}
              to improve your matches.
            </p>
          </div>
        </div>
      </div>

      {error && (
        <div className="mb-6 rounded-md bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Matches grid */}
      <ResearcherGrid
        matches={matches}
        emptyMessage="No matches found. Add expertise tags and collaboration needs to your profile to see matches."
      />

      {matches.length > 0 && (
        <p className="mt-6 text-center text-sm text-gray-400">
          Showing {matches.length} researcher{matches.length !== 1 ? 's' : ''}{' '}
          with matching expertise
        </p>
      )}
    </div>
  );
}
