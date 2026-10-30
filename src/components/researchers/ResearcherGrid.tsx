import { ResearcherCard } from './ResearcherCard';
import { UserProfile } from '@/types';
import { MatchResult } from '@/lib/matching';

interface ResearcherGridProps {
  researchers?: UserProfile[];
  matches?: MatchResult[];
  emptyMessage?: string;
}

/**
 * Displays a responsive grid of researcher cards.
 * Accepts either plain researchers or match results (with scores).
 */
export function ResearcherGrid({
  researchers,
  matches,
  emptyMessage = 'No researchers found.',
}: ResearcherGridProps) {
  // If matches are provided, use those; otherwise use plain researchers
  const isEmpty = matches ? matches.length === 0 : (researchers?.length ?? 0) === 0;

  if (isEmpty) {
    return (
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
            d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
          />
        </svg>
        <p className="mt-3 text-sm text-gray-500">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {matches
        ? matches.map((match) => (
            <ResearcherCard
              key={match.user.id}
              researcher={match.user as UserProfile}
              matchScore={match.score}
              expertiseMatchCount={match.expertiseMatchCount}
              needsMatchCount={match.needsMatchCount}
            />
          ))
        : researchers?.map((researcher) => (
            <ResearcherCard key={researcher.id} researcher={researcher} />
          ))}
    </div>
  );
}
