'use client';

import { useEffect, useState, useCallback } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { ResearcherGrid } from '@/components/researchers/ResearcherGrid';
import { UserProfile } from '@/types';

export default function ResearchersPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [researchers, setResearchers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Search form state initialized from URL params
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [tags, setTags] = useState(searchParams.get('tags') || '');
  const [department, setDepartment] = useState(
    searchParams.get('department') || ''
  );

  const fetchResearchers = useCallback(async (q: string, t: string, d: string) => {
    setLoading(true);
    setError('');

    try {
      const params = new URLSearchParams();
      if (q) params.set('q', q);
      if (t) params.set('tags', t);
      if (d) params.set('department', d);

      const response = await fetch(`/api/search?${params.toString()}`);
      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Failed to load researchers');
        return;
      }
      setResearchers(data.data);
    } catch {
      setError('Failed to load researchers');
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial fetch from URL params
  useEffect(() => {
    fetchResearchers(
      searchParams.get('q') || '',
      searchParams.get('tags') || '',
      searchParams.get('department') || ''
    );
  }, [fetchResearchers, searchParams]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    // Update URL
    const params = new URLSearchParams();
    if (query) params.set('q', query);
    if (tags) params.set('tags', tags);
    if (department) params.set('department', department);
    router.push(`/researchers?${params.toString()}`);

    fetchResearchers(query, tags, department);
  };

  const handleClear = () => {
    setQuery('');
    setTags('');
    setDepartment('');
    router.push('/researchers');
    fetchResearchers('', '', '');
  };

  const hasFilters = query || tags || department;

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Researchers</h1>
        <p className="mt-2 text-gray-500">
          Browse and search researchers across all disciplines
        </p>
      </div>

      {/* Search form */}
      <div className="mb-8 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
        <form onSubmit={handleSearch} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-3">
            {/* Keyword search */}
            <div>
              <label
                htmlFor="q"
                className="block text-xs font-medium text-gray-600"
              >
                Keyword
              </label>
              <input
                id="q"
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                placeholder="Name, bio, department..."
              />
            </div>

            {/* Tags filter */}
            <div>
              <label
                htmlFor="tags"
                className="block text-xs font-medium text-gray-600"
              >
                Expertise Tags
              </label>
              <input
                id="tags"
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                placeholder="e.g. machine learning, genomics"
              />
              <p className="mt-0.5 text-xs text-gray-400">
                Comma-separated tags
              </p>
            </div>

            {/* Department filter */}
            <div>
              <label
                htmlFor="department"
                className="block text-xs font-medium text-gray-600"
              >
                Department
              </label>
              <input
                id="department"
                type="text"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                placeholder="e.g. Computer Science"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="submit"
              className="rounded-md bg-indigo-600 px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-700"
            >
              Search
            </button>
            {hasFilters && (
              <button
                type="button"
                onClick={handleClear}
                className="text-sm text-gray-500 hover:text-gray-800"
              >
                Clear filters
              </button>
            )}
            {!loading && (
              <span className="ml-auto text-sm text-gray-400">
                {researchers.length} researcher
                {researchers.length !== 1 ? 's' : ''} found
              </span>
            )}
          </div>
        </form>
      </div>

      {error && (
        <div className="mb-6 rounded-md bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Loading skeleton */}
      {loading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-52 animate-pulse rounded-xl bg-gray-200" />
          ))}
        </div>
      ) : (
        <ResearcherGrid
          researchers={researchers}
          emptyMessage={
            hasFilters
              ? 'No researchers match your search criteria.'
              : 'No researchers found.'
          }
        />
      )}
    </div>
  );
}
