'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { CollabRequest } from '@/types';

interface RequestCardProps {
  request: CollabRequest;
  type: 'sent' | 'received';
  onStatusUpdate?: (id: string, status: 'accepted' | 'declined') => void;
}

const statusBadgeVariant: Record<string, 'green' | 'red' | 'yellow'> = {
  accepted: 'green',
  declined: 'red',
  pending: 'yellow',
};

export function RequestCard({ request, type, onStatusUpdate }: RequestCardProps) {
  const [loading, setLoading] = useState<'accepted' | 'declined' | null>(null);

  const handleAction = async (status: 'accepted' | 'declined') => {
    setLoading(status);
    try {
      const response = await fetch(`/api/requests/${request.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });

      if (response.ok && onStatusUpdate) {
        onStatusUpdate(request.id, status);
      }
    } catch (error) {
      console.error('Error updating request:', error);
    } finally {
      setLoading(null);
    }
  };

  // Determine the "other party" depending on whether this is sent or received
  const otherUser = type === 'sent' ? request.toUser : request.fromUser;

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          {/* Type label */}
          <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
            {type === 'sent' ? 'Sent to' : 'Received from'}
          </p>

          {/* Other user */}
          {otherUser && (
            <Link
              href={`/researchers/${otherUser.id}`}
              className="mt-0.5 block font-semibold text-gray-900 hover:text-indigo-600"
            >
              {otherUser.name}
            </Link>
          )}
          {otherUser?.department && (
            <p className="text-sm text-gray-500">{otherUser.department}</p>
          )}

          {/* Project reference */}
          {request.project && (
            <div className="mt-2">
              <p className="text-xs text-gray-500">
                Project:{' '}
                <Link
                  href={`/projects/${request.project.id}`}
                  className="text-indigo-600 hover:underline"
                >
                  {request.project.title}
                </Link>
              </p>
            </div>
          )}

          {/* Message */}
          {request.message && (
            <div className="mt-2 rounded-md bg-gray-50 px-3 py-2">
              <p className="text-sm text-gray-600 italic">
                &ldquo;{request.message}&rdquo;
              </p>
            </div>
          )}

          {/* Timestamp */}
          <p className="mt-2 text-xs text-gray-400">
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
            variant={statusBadgeVariant[request.status] || 'yellow'}
            className="capitalize"
          >
            {request.status}
          </Badge>

          {/* Only show accept/decline for received pending requests */}
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
