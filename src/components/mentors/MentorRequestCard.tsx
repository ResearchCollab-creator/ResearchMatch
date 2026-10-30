'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { MentorRequest } from '@/types';

interface MentorRequestCardProps {
  request: MentorRequest;
  type: 'sent' | 'received';
  onStatusUpdate?: (id: string, status: 'accepted' | 'declined') => void;
}

const statusBadgeVariant: Record<string, 'green' | 'red' | 'yellow'> = {
  accepted: 'green',
  declined: 'red',
  pending: 'yellow',
};

const STAGE_LABELS: Record<string, string> = {
  undergraduate: 'Undergraduate student',
  graduate: 'Graduate student',
  postdoc: 'Postdoctoral researcher',
  'early-faculty': 'Early-career faculty',
  'medical-student': 'Medical student',
  other: 'Other',
};

export function MentorRequestCard({
  request,
  type,
  onStatusUpdate,
}: MentorRequestCardProps) {
  const [loading, setLoading] = useState<'accepted' | 'declined' | null>(null);

  const handleAction = async (status: 'accepted' | 'declined') => {
    setLoading(status);
    try {
      const response = await fetch(`/api/mentor-requests/${request.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });

      if (response.ok && onStatusUpdate) {
        onStatusUpdate(request.id, status);
      }
    } catch (error) {
      console.error('Error updating mentor request:', error);
    } finally {
      setLoading(null);
    }
  };

  const otherUser = type === 'sent' ? request.toUser : request.fromUser;

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          {/* Type label */}
          <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
            {type === 'sent' ? 'Request sent to' : 'Request from'}
          </p>

          {/* Other user */}
          {otherUser && (
            <Link
              href={`/researchers/${otherUser.id}`}
              className="mt-0.5 block font-semibold text-gray-900 hover:text-emerald-600"
            >
              {otherUser.name}
            </Link>
          )}
          {otherUser?.department && (
            <p className="text-sm text-gray-500">{otherUser.department}</p>
          )}

          {/* Career stage */}
          <div className="mt-3 space-y-2">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                Career stage
              </p>
              <p className="mt-0.5 text-sm text-gray-700">
                {STAGE_LABELS[request.stage] ?? request.stage}
              </p>
            </div>

            {/* Goals */}
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                Mentorship goals
              </p>
              <p className="mt-0.5 text-sm text-gray-700">{request.goals}</p>
            </div>

            {/* Work description */}
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                About their work
              </p>
              <p className="mt-0.5 text-sm text-gray-700">{request.workDesc}</p>
            </div>

            {/* Optional message */}
            {request.message && (
              <div className="rounded-md bg-emerald-50 px-3 py-2">
                <p className="text-sm italic text-emerald-800">
                  &ldquo;{request.message}&rdquo;
                </p>
              </div>
            )}
          </div>

          {/* Timestamp */}
          <p className="mt-3 text-xs text-gray-400">
            {new Date(request.createdAt).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            })}
          </p>
        </div>

        {/* Status + actions */}
        <div className="flex flex-shrink-0 flex-col items-end gap-2">
          <Badge
            variant={statusBadgeVariant[request.status] ?? 'yellow'}
            className="capitalize"
          >
            {request.status}
          </Badge>

          {type === 'received' && request.status === 'pending' && (
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="primary"
                loading={loading === 'accepted'}
                disabled={loading !== null}
                onClick={() => handleAction('accepted')}
              >
                Accept
              </Button>
              <Button
                size="sm"
                variant="secondary"
                loading={loading === 'declined'}
                disabled={loading !== null}
                onClick={() => handleAction('declined')}
              >
                Decline
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
