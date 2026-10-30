import Link from 'next/link';
import { Badge } from '@/components/ui/Badge';
import { UserProfile } from '@/types';

interface MentorCardProps {
  mentor: UserProfile;
}

const FOCUS_COLORS: Record<string, 'indigo' | 'green' | 'blue' | 'purple' | 'yellow'> = {
  'Undergraduate students': 'blue',
  'Graduate students': 'indigo',
  'Postdocs': 'purple',
  'Early-career faculty': 'green',
  'Medical students': 'yellow',
};

function getInitials(name: string) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0])
    .join('')
    .toUpperCase();
}

export function MentorCard({ mentor }: MentorCardProps) {
  const displayAreas = mentor.mentoringAreas.slice(0, 4);
  const extraAreas = mentor.mentoringAreas.length - displayAreas.length;

  return (
    <Link
      href={`/researchers/${mentor.id}`}
      className="block rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
    >
      {/* Header */}
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-emerald-100 text-sm font-semibold text-emerald-700">
          {mentor.avatarUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={mentor.avatarUrl}
              alt={mentor.name}
              className="h-12 w-12 rounded-full object-cover"
            />
          ) : (
            getInitials(mentor.name)
          )}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h3 className="truncate font-semibold text-gray-900">
              {mentor.name}
            </h3>
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-700">
              <svg
                className="h-3 w-3"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
              </svg>
              Mentor
            </span>
          </div>
          {mentor.department && (
            <p className="truncate text-sm text-gray-500">{mentor.department}</p>
          )}
          {mentor.university && (
            <p className="truncate text-xs text-gray-400">{mentor.university}</p>
          )}
        </div>
      </div>

      {/* Bio */}
      {mentor.bio && (
        <p className="mt-3 line-clamp-2 text-sm text-gray-600">{mentor.bio}</p>
      )}

      {/* Mentorship focus */}
      {mentor.mentorshipFocus.length > 0 && (
        <div className="mt-3">
          <p className="mb-1.5 text-xs font-medium uppercase tracking-wide text-gray-400">
            Open to mentoring
          </p>
          <div className="flex flex-wrap gap-1.5">
            {mentor.mentorshipFocus.map((f) => (
              <Badge
                key={f}
                variant={FOCUS_COLORS[f] ?? 'green'}
              >
                {f}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Mentoring areas */}
      {displayAreas.length > 0 && (
        <div className="mt-3">
          <p className="mb-1.5 text-xs font-medium uppercase tracking-wide text-gray-400">
            Areas
          </p>
          <div className="flex flex-wrap gap-1.5">
            {displayAreas.map((area) => (
              <Badge key={area} variant="indigo">
                {area}
              </Badge>
            ))}
            {extraAreas > 0 && (
              <Badge variant="default">+{extraAreas} more</Badge>
            )}
          </div>
        </div>
      )}

      {/* Style / availability */}
      {mentor.mentorshipStyle && (
        <div className="mt-3 flex items-center gap-1.5 text-xs text-gray-500">
          <svg
            className="h-3.5 w-3.5 flex-shrink-0 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span className="italic">{mentor.mentorshipStyle}</span>
        </div>
      )}

      {/* Max mentees */}
      {mentor.maxMentees != null && (
        <div className="mt-1.5 flex items-center gap-1.5 text-xs text-gray-400">
          <svg
            className="h-3.5 w-3.5 flex-shrink-0"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
            />
          </svg>
          Accepting up to {mentor.maxMentees} mentee{mentor.maxMentees !== 1 ? 's' : ''}
        </div>
      )}
    </Link>
  );
}
