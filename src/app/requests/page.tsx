'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { RequestCard } from '@/components/requests/RequestCard';
import { CollabRequest } from '@/types';

interface RequestsData {
  sent: CollabRequest[];
  received: CollabRequest[];
}

type ActiveTab = 'received' | 'sent';

export default function RequestsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [requests, setRequests] = useState<RequestsData>({
    sent: [],
    received: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<ActiveTab>('received');

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login?callbackUrl=/requests');
      return;
    }
    if (status === 'authenticated') {
      fetchRequests();
    }
  }, [status, router]);

  const fetchRequests = async () => {
    try {
      const response = await fetch('/api/requests');
      const data = await response.json();
      if (!response.ok) {
        setError(data.error || 'Failed to load requests');
        return;
      }
      setRequests(data.data);
    } catch {
      setError('Failed to load requests');
    } finally {
      setLoading(false);
    }
  };

  // Update a request's status in local state after accept/decline
  const handleStatusUpdate = (
    id: string,
    newStatus: 'accepted' | 'declined'
  ) => {
    setRequests((prev) => ({
      ...prev,
      received: prev.received.map((req) =>
        req.id === id ? { ...req, status: newStatus } : req
      ),
    }));
  };

  const pendingReceived = requests.received.filter(
    (r) => r.status === 'pending'
  ).length;

  if (status === 'loading' || (status === 'authenticated' && loading)) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-6 h-8 w-48 animate-pulse rounded bg-gray-200" />
        <div className="space-y-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-28 animate-pulse rounded-xl bg-gray-200" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Collaboration Requests
        </h1>
        <p className="mt-2 text-gray-500">
          Manage incoming and outgoing collaboration requests
        </p>
      </div>

      {error && (
        <div className="mb-6 rounded-md bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Tabs */}
      <div className="mb-6 flex border-b border-gray-200">
        <button
          onClick={() => setActiveTab('received')}
          className={`flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-medium transition-colors ${
            activeTab === 'received'
              ? 'border-indigo-600 text-indigo-600'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          Received
          {pendingReceived > 0 && (
            <span className="rounded-full bg-indigo-100 px-2 py-0.5 text-xs font-medium text-indigo-700">
              {pendingReceived}
            </span>
          )}
        </button>
        <button
          onClick={() => setActiveTab('sent')}
          className={`flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-medium transition-colors ${
            activeTab === 'sent'
              ? 'border-indigo-600 text-indigo-600'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          Sent
          <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600">
            {requests.sent.length}
          </span>
        </button>
      </div>

      {/* Tab content */}
      {activeTab === 'received' && (
        <div className="space-y-4">
          {requests.received.length === 0 ? (
            <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 py-12 text-center">
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
                  d="M21.75 9v.906a2.25 2.25 0 01-1.183 1.981l-6.478 3.488M2.25 9v.906a2.25 2.25 0 001.183 1.981l6.478 3.488m8.839 2.51l-4.66-2.51m0 0l-1.023-.55a2.25 2.25 0 00-2.134 0l-1.022.55m0 0l-4.661 2.51m16.5 1.615a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V8.844a2.25 2.25 0 011.183-1.98l7.5-4.04a2.25 2.25 0 012.134 0l7.5 4.04a2.25 2.25 0 011.183 1.98V19.5z"
                />
              </svg>
              <p className="mt-3 text-sm text-gray-500">
                No collaboration requests received yet.
              </p>
            </div>
          ) : (
            requests.received.map((request) => (
              <RequestCard
                key={request.id}
                request={request}
                type="received"
                onStatusUpdate={handleStatusUpdate}
              />
            ))
          )}
        </div>
      )}

      {activeTab === 'sent' && (
        <div className="space-y-4">
          {requests.sent.length === 0 ? (
            <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 py-12 text-center">
              <p className="text-sm text-gray-500">
                You haven&apos;t sent any collaboration requests yet.
              </p>
            </div>
          ) : (
            requests.sent.map((request) => (
              <RequestCard key={request.id} request={request} type="sent" />
            ))
          )}
        </div>
      )}
    </div>
  );
}
