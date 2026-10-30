import Link from 'next/link';
import { Badge } from '@/components/ui/Badge';
import { Project } from '@/types';

interface ProjectCardProps {
  project: Project;
  showOwner?: boolean;
}

const statusColors: Record<string, 'green' | 'yellow' | 'default'> = {
  active: 'green',
  paused: 'yellow',
  completed: 'default',
};

export function ProjectCard({ project, showOwner = true }: ProjectCardProps) {
  return (
    <Link href={`/projects/${project.id}`} className="block">
      <div className="group rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:border-indigo-300 hover:shadow-md">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-semibold text-gray-900 group-hover:text-indigo-700 line-clamp-2">
            {project.title}
          </h3>
          <Badge
            variant={statusColors[project.status] || 'default'}
            className="flex-shrink-0 capitalize"
          >
            {project.status}
          </Badge>
        </div>

        {/* Owner */}
        {showOwner && project.user && (
          <p className="mt-1 text-sm text-gray-500">
            by {project.user.name}
            {project.user.department && ` · ${project.user.department}`}
          </p>
        )}

        {/* Description */}
        <p className="mt-3 line-clamp-3 text-sm text-gray-600">
          {project.description}
        </p>

        {/* Tags */}
        {project.tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {project.tags.slice(0, 4).map((tag) => (
              <Badge key={tag} variant="blue">
                {tag}
              </Badge>
            ))}
            {project.tags.length > 4 && (
              <Badge variant="default">+{project.tags.length - 4} more</Badge>
            )}
          </div>
        )}

        {/* Needed expertise */}
        {project.neededExpertise.length > 0 && (
          <div className="mt-2">
            <p className="text-xs font-medium text-gray-500">Seeking expertise in:</p>
            <div className="mt-1 flex flex-wrap gap-1.5">
              {project.neededExpertise.slice(0, 3).map((exp) => (
                <Badge key={exp} variant="purple">
                  {exp}
                </Badge>
              ))}
              {project.neededExpertise.length > 3 && (
                <Badge variant="default">
                  +{project.neededExpertise.length - 3} more
                </Badge>
              )}
            </div>
          </div>
        )}

        {/* Date */}
        <p className="mt-3 text-xs text-gray-400">
          Created {new Date(project.createdAt).toLocaleDateString()}
        </p>
      </div>
    </Link>
  );
}
