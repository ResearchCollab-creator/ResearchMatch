'use client';

import { useEffect, useState, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import { MentorCard } from '@/components/mentors/MentorCard';
import { Button } from '@/components/ui/Button';
import { UserProfile, MentorRequestFormData } from '@/types';

const FOCUS_OPTIONS = [
  'Undergraduate students',
  'Graduate students',
  'Postdocs',
  'Early-career faculty',
  'Medical students',
];

const STAGE_OPTIONS = [
  { value: 'undergraduate', label: 'Undergraduate student' },
  { value: 'graduate', label: 'Graduate student' },
  { value: 'postdoc', label: 'Postdoctoral researcher' },
  { value: 'early-faculty', label: 'Early-career faculty' },
  { value: 'medical-student', label: 'Medical student' },
  { value: 'other', label: 'Other' },
];

const EMPTY_FORM: Omit<MentorRequestFormData, 'toUserId'> = {
  stage: '',
  goals: '',
  workDesc: '',
  message: '',
};

export default function MentorsPage() {
  const { data: session } = useSession();

  const [mentors, setMentors] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Filters
  const [area, setArea] = useState('');
  const [focus, setFocus] = useState('');
  const [department, setDepartment] = useState('');

  // Modal state
  const [modalMentor, setModalMentor] = useState<UserProfile | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const fetchMentors = useCallback(
    async (a: string, f: string, d: string) => {
      setLoading(true);
      setError('');
      try {
        const params = new URLSearchParams();
        if (a) params.set('area', a);
        if (f) params.set('focus', f);
        if (d) params.set('department', d);
        const res = await fetch(`/api/mentors?${params.toString()}`);
        const data = await res.json();
        if (!res.ok) {
          setError(data.error || 'Failed to load mentors');
          return;
        }
        setMentors(data.data);
      } catch {
        setError('Failed to load mentors');
      } finally {
        setLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    fetchMentors('', '', '');
  }, [fetchMentors]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchMentors(area, focus, department);
  };

  const handleClear = () => {
    setArea('');
    setFocus('');
    setDepartment('');
    fetchMentors('', '', '');
  };

  const openModal = (mentor: UserProfile) => {
    setModalMentor(mentor);
    setForm(EMPTY_FORM);
    setSubmitError('');
    setSubmitSuccess(false);
  };

  const closeModal = () => {
    setModalMentor(null);
    setSubmitSuccess(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!modalMentor) return;
    setSubmitError('');
    setSubmitting(true);

    try {
      const res = await fetch('/api/mentor-requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          toUserId: modalMentor.id,
          stage: form.stage,
          goals: form.goals,
          workDesc: form.workDesc,
          message: form.message || undefined,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setSubmitError(data.error || 'Failed to send request');
        return;
      }

      setSubmitSuccess(true);
    } catch {
      setSubmitError('An unexpected error occurred');
    } finally {
      setSubmitting(false);
    }
  };

  const hasFilters = area || focus || department;

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Find a Mentor</h1>
        <p className="mt-2 text-gray-500">
          Connect with experienced researchers who are open to mentoring
        </p>
      </div>

      {/* Filter form */}
      <div className="mb-8 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
        <form onSubmit={handleSearch} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-3">
            {/* Expertise area */}
            <div>
              <label
                htmlFor="area"
                className="block text-xs font-medium text-gray-600"
              >
                Expertise Area
              </label>
              <input
                id="area"
                type="text"
                value={area}
                onChange={(e) => setArea(e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                placeholder="e.g. genomics, machine learning"
              />
            </div>

            {/* Mentorship focus */}
            <div>
              <label
                htmlFor="focus"
                className="block text-xs font-medium text-gray-600"
              >
                Open to mentoring
              </label>
              <select
                id="focus"
                value={focus}
                onChange={(e) => setFocus(e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              >
                <option value="">All</option>
                {FOCUS_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            {/* Department */}
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
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                placeholder="e.g. Surgery, Oncology"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="submit"
              className="rounded-md bg-emerald-600 px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-emerald-700"
            >
              Filter
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
                {mentors.length} mentor{mentors.length !== 1 ? 's' : ''} found
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
            <div key={i} className="h-56 animate-pulse rounded-xl bg-gray-200" />
          ))}
        </div>
      ) : mentors.length === 0 ? (
        <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 py-16 text-center">
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
            {hasFilters
              ? 'No mentors match your filters.'
              : 'No mentors available yet.'}
          </p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {mentors.map((mentor) => (
            <div key={mentor.id} className="flex flex-col">
              <MentorCard mentor={mentor} />
              {session && session.user.id !== mentor.id && (
                <button
                  onClick={() => openModal(mentor)}
                  className="mt-2 w-full rounded-lg border border-emerald-300 bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-700 transition-colors hover:bg-emerald-100"
                >
                  Request mentorship
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Request Mentorship Modal */}
      {modalMentor && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeModal();
          }}
        >
          <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl">
            {submitSuccess ? (
              <div className="py-8 text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100">
                  <svg
                    className="h-6 w-6 text-emerald-600"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 12.75l6 6 9-13.5"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Request sent!
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Your mentorship request has been sent to{' '}
                  <span className="font-medium">{modalMentor.name}</span>.
                </p>
                <button
                  onClick={closeModal}
                  className="mt-6 rounded-md bg-emerald-600 px-5 py-2 text-sm font-medium text-white hover:bg-emerald-700"
                >
                  Done
                </button>
              </div>
            ) : (
              <>
                <div className="mb-5 flex items-start justify-between">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">
                      Request mentorship
                    </h2>
                    <p className="mt-0.5 text-sm text-gray-500">
                      from{' '}
                      <span className="font-medium text-gray-700">
                        {modalMentor.name}
                      </span>
                    </p>
                  </div>
                  <button
                    onClick={closeModal}
                    className="rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
                  >
                    <svg
                      className="h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>

                {submitError && (
                  <div className="mb-4 rounded-md bg-red-50 p-3 text-sm text-red-700">
                    {submitError}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Career stage */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Your career stage{' '}
                      <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={form.stage}
                      onChange={(e) =>
                        setForm({ ...form, stage: e.target.value })
                      }
                      required
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    >
                      <option value="">Select your stage...</option>
                      {STAGE_OPTIONS.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Goals */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      What are you hoping to get from this mentorship?{' '}
                      <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      value={form.goals}
                      onChange={(e) =>
                        setForm({ ...form, goals: e.target.value })
                      }
                      required
                      rows={3}
                      placeholder="e.g. Guidance on my dissertation, career advice, navigating the academic job market..."
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>

                  {/* Work description */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Brief description of your work{' '}
                      <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      value={form.workDesc}
                      onChange={(e) =>
                        setForm({ ...form, workDesc: e.target.value })
                      }
                      required
                      rows={3}
                      placeholder="Describe your current research or projects so the mentor can assess fit..."
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>

                  {/* Optional personal message */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Personal message{' '}
                      <span className="text-xs text-gray-400">(optional)</span>
                    </label>
                    <textarea
                      value={form.message}
                      onChange={(e) =>
                        setForm({ ...form, message: e.target.value })
                      }
                      rows={2}
                      placeholder="Anything else you'd like the mentor to know..."
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>

                  <div className="flex gap-3 pt-1">
                    <Button
                      type="submit"
                      loading={submitting}
                      className="flex-1 justify-center bg-emerald-600 hover:bg-emerald-700"
                    >
                      Send request
                    </Button>
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={closeModal}
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
