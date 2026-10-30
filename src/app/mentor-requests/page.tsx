'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { MentorRequestCard } from '@/components/mentors/MentorRequestCard';
import { MentorRequest } from '@/types';

interface MentorRequestsData {
  sent: MentorRequest[];
  received: MentorRequest[];
}

type ActiveTab = 'received' | 'sent';

export default function MentorRequestsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [requests, setRequests] = useState<MentorRequestsData>({
    sent: [],
    received: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<ActiveTab>('received');

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login?callbackUrl=/mentor-requests');
      return;
    }
    if (status === 'authenticated') {
      fetchRequests();
    }
  }, [status, router]);

  const fetchRequests = async () => {
    try {
      const res = await fetch('/api/mentor-requests');
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Failed to load mentor requests');
        return;
      }
      setRequests(data.data);
    } catch {
      setError('Failed to load mentor requests');
    } finally {
      setLoading(false);
    }
  };

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
        <div className="mb-6 h-8 w-56 animate-pulse rounded bg-gray-200" />
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-36 animate-pulse rounded-xl bg-gray-200" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Mentorship Requests</h1>
        <p className="mt-2 text-gray-500">
          Manage your incoming and outgoing mentorship requests
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
              ? 'border-emerald-600 text-emerald-600'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          Received
          {pendingReceived > 0 && (
            <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-700">
              {pendingReceived}
            </span>
          )}
        </button>
        <button
          onClick={() => setActiveTab('sent')}
          className={`flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-medium transition-colors ${
            activeTab === 'sent'
              ? 'border-emerald-600 text-emerald-600'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          Sent
          <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600">
            {requests.sent.length}
          </span>
        </button>
      </div>

      {/* Received */}
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
                  d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5"
                />
              </svg>
              <p className="mt-3 text-sm text-gray-500">
                No mentorship requests received yet.
              </p>
            </div>
          ) : (
            requests.received.map((request) => (
              <MentorRequestCard
                key={request.id}
                request={request}
                type="received"
                onStatusUpdate={handleStatusUpdate}
              />
            ))
          )}
        </div>
      )}

      {/* Sent */}
      {activeTab === 'sent' && (
        <div className="space-y-4">
          {requests.sent.length === 0 ? (
            <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 py-12 text-center">
              <p className="text-sm text-gray-500">
                You haven&apos;t sent any mentorship requests yet.{' '}
                <a
                  href="/mentors"
                  className="font-medium text-emerald-600 hover:underline"
                >
                  Browse mentors
                </a>
              </p>
            </div>
          ) : (
            requests.sent.map((request) => (
              <MentorRequestCard
                key={request.id}
                request={request}
                type="sent"
              />
            ))
          )}
        </div>
      )}
    </div>
  );
}
