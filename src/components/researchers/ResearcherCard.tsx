import Link from 'next/link';
import { Badge } from '@/components/ui/Badge';
import { UserProfile } from '@/types';

interface ResearcherCardProps {
  researcher: UserProfile;
  matchScore?: number;
  expertiseMatchCount?: number;
  needsMatchCount?: number;
}

/**
 * Displays a researcher summary card with avatar, name, department,
 * expertise tags, and optional match score.
 */
export function ResearcherCard({
  researcher,
  matchScore,
  expertiseMatchCount,
  needsMatchCount,
}: ResearcherCardProps) {
  // Generate initials from name for avatar fallback
  const initials = researcher.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  // Map score to a color for the match percentage badge
  const scoreColor =
    matchScore !== undefined
      ? matchScore >= 0.5
        ? 'green'
        : matchScore >= 0.25
          ? 'yellow'
          : 'default'
      : undefined;

  return (
    <Link href={`/researchers/${researcher.id}`} className="block">
      <div className="group rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:border-indigo-300 hover:shadow-md">
        {/* Header: avatar + name */}
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-indigo-100 text-sm font-bold text-indigo-700">
            {researcher.avatarUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={researcher.avatarUrl}
                alt={researcher.name}
                className="h-12 w-12 rounded-full object-cover"
              />
            ) : (
              initials
            )}
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="truncate font-semibold text-gray-900 group-hover:text-indigo-700">
              {researcher.name}
            </h3>
            {researcher.department && (
              <p className="truncate text-sm text-gray-500">
                {researcher.department}
              </p>
            )}
            <p className="text-xs text-gray-400">{researcher.university}</p>
          </div>
          {/* Match score badge */}
          {matchScore !== undefined && (
            <div className="flex-shrink-0 text-right">
              <Badge variant={scoreColor as 'green' | 'yellow' | 'default'}>
                {Math.round(matchScore * 100)}% match
              </Badge>
              {(expertiseMatchCount !== undefined || needsMatchCount !== undefined) && (
                <p className="mt-1 text-xs text-gray-400">
                  {expertiseMatchCount} + {needsMatchCount} tags
                </p>
              )}
            </div>
          )}
        </div>

        {/* Bio snippet */}
        {researcher.bio && (
          <p className="mt-3 line-clamp-2 text-sm text-gray-600">
            {researcher.bio}
          </p>
        )}

        {/* Expertise tags */}
        {researcher.expertiseTags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {researcher.expertiseTags.slice(0, 4).map((tag) => (
              <Badge key={tag} variant="indigo">
                {tag}
              </Badge>
            ))}
            {researcher.expertiseTags.length > 4 && (
              <Badge variant="default">
                +{researcher.expertiseTags.length - 4} more
              </Badge>
            )}
          </div>
        )}

        {/* Collaboration needs */}
        {researcher.collaborationNeeds.length > 0 && (
          <div className="mt-2">
            <p className="text-xs font-medium text-gray-500">Seeking:</p>
            <div className="mt-1 flex flex-wrap gap-1.5">
              {researcher.collaborationNeeds.slice(0, 3).map((need) => (
                <Badge key={need} variant="purple">
                  {need}
                </Badge>
              ))}
              {researcher.collaborationNeeds.length > 3 && (
                <Badge variant="default">
                  +{researcher.collaborationNeeds.length - 3} more
                </Badge>
              )}
            </div>
          </div>
        )}
      </div>
    </Link>
  );
}
