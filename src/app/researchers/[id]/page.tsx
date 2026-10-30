'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { ProjectCard } from '@/components/projects/ProjectCard';

interface ResearcherWithProjects {
  id: string;
  name: string;
  email: string;
  department: string | null;
  university: string;
  bio: string | null;
  expertiseTags: string[];
  collaborationNeeds: string[];
  contactInfo: string | null;
  avatarUrl: string | null;
  createdAt: string;
  // Mentor fields
  isMentor: boolean;
  mentorshipFocus: string[];
  mentoringAreas: string[];
  mentorshipStyle: string | null;
  maxMentees: number | null;
  projects: {
    id: string;
    title: string;
    description: string;
    tags: string[];
    neededExpertise: string[];
    status: string;
    createdAt: string;
    updatedAt: string;
    userId: string;
  }[];
}

export default function ResearcherProfilePage() {
  const { id } = useParams<{ id: string }>();
  const { data: session } = useSession();
  const router = useRouter();

  const [researcher, setResearcher] = useState<ResearcherWithProjects | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Collaboration request state
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [requestMessage, setRequestMessage] = useState('');
  const [requestProjectId, setRequestProjectId] = useState('');
  const [requestLoading, setRequestLoading] = useState(false);
  const [requestSuccess, setRequestSuccess] = useState(false);
  const [requestError, setRequestError] = useState('');

  // Mentor request state
  const [showMentorModal, setShowMentorModal] = useState(false);
  const [mentorStage, setMentorStage] = useState('');
  const [mentorGoals, setMentorGoals] = useState('');
  const [mentorWorkDesc, setMentorWorkDesc] = useState('');
  const [mentorMessage, setMentorMessage] = useState('');
  const [mentorRequestLoading, setMentorRequestLoading] = useState(false);
  const [mentorRequestSuccess, setMentorRequestSuccess] = useState(false);
  const [mentorRequestError, setMentorRequestError] = useState('');

  const STAGE_OPTIONS = [
    { value: 'undergraduate', label: 'Undergraduate student' },
    { value: 'graduate', label: 'Graduate student' },
    { value: 'postdoc', label: 'Postdoctoral researcher' },
    { value: 'early-faculty', label: 'Early-career faculty' },
    { value: 'medical-student', label: 'Medical student' },
    { value: 'other', label: 'Other' },
  ];

  const handleSendMentorRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session) {
      router.push('/login');
      return;
    }
    setMentorRequestLoading(true);
    setMentorRequestError('');
    try {
      const response = await fetch('/api/mentor-requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          toUserId: id,
          stage: mentorStage,
          goals: mentorGoals,
          workDesc: mentorWorkDesc,
          message: mentorMessage || undefined,
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        setMentorRequestError(data.error || 'Failed to send request');
        return;
      }
      setMentorRequestSuccess(true);
    } catch {
      setMentorRequestError('An unexpected error occurred');
    } finally {
      setMentorRequestLoading(false);
    }
  };

  useEffect(() => {
    fetchResearcher();
  }, [id]);

  const fetchResearcher = async () => {
    try {
      const response = await fetch(`/api/users/${id}`);
      const data = await response.json();
      if (!response.ok) {
        setError(data.error || 'Researcher not found');
        return;
      }
      setResearcher(data.data);
    } catch {
      setError('Failed to load researcher profile');
    } finally {
      setLoading(false);
    }
  };

  const handleSendRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session) {
      router.push('/login');
      return;
    }

    setRequestLoading(true);
    setRequestError('');

    try {
      const response = await fetch('/api/requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          toUserId: id,
          message: requestMessage || null,
          projectId: requestProjectId || null,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setRequestError(data.error || 'Failed to send request');
        return;
      }

      setRequestSuccess(true);
      setShowRequestModal(false);
    } catch {
      setRequestError('An unexpected error occurred');
    } finally {
      setRequestLoading(false);
    }
  };

  // Initials for avatar fallback
  const initials = researcher?.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  const isOwnProfile = session?.user?.id === id;

  if (loading) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="animate-pulse space-y-6">
          <div className="flex items-center gap-6">
            <div className="h-20 w-20 rounded-full bg-gray-200" />
            <div className="space-y-2">
              <div className="h-6 w-48 rounded bg-gray-200" />
              <div className="h-4 w-32 rounded bg-gray-200" />
            </div>
          </div>
          <div className="h-32 rounded-xl bg-gray-200" />
        </div>
      </div>
    );
  }

  if (error || !researcher) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-10 text-center sm:px-6 lg:px-8">
        <p className="text-gray-500">{error || 'Researcher not found'}</p>
        <Link
          href="/researchers"
          className="mt-4 inline-block text-sm text-indigo-600 hover:underline"
        >
          ← Back to researchers
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Back link */}
      <Link
        href="/researchers"
        className="mb-6 inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-800"
      >
        <svg
          className="h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
          />
        </svg>
        Back to researchers
      </Link>

      {/* Profile header */}
      <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-start gap-5">
            {/* Avatar */}
            <div className="flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-full bg-indigo-100 text-xl font-bold text-indigo-700">
              {researcher.avatarUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={researcher.avatarUrl}
                  alt={researcher.name}
                  className="h-20 w-20 rounded-full object-cover"
                />
              ) : (
                initials
              )}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {researcher.name}
              </h1>
              {researcher.department && (
                <p className="mt-0.5 text-gray-600">{researcher.department}</p>
              )}
              <p className="text-sm text-gray-400">{researcher.university}</p>
              {researcher.contactInfo && (
                <p className="mt-1 text-sm text-gray-500">
                  {researcher.contactInfo}
                </p>
              )}
            </div>
          </div>

          {/* Action buttons */}
          {!isOwnProfile && (
            <div className="flex flex-col gap-2 sm:flex-shrink-0">
              {requestSuccess ? (
                <div className="rounded-md bg-green-50 px-4 py-2 text-sm font-medium text-green-700">
                  Collaboration request sent!
                </div>
              ) : (
                <Button
                  onClick={() => {
                    if (!session) {
                      router.push('/login');
                    } else {
                      setShowRequestModal(true);
                    }
                  }}
                >
                  Request Collaboration
                </Button>
              )}
              {researcher.isMentor && (
                mentorRequestSuccess ? (
                  <div className="rounded-md bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-700">
                    Mentorship request sent!
                  </div>
                ) : (
                  <Button
                    variant="outline"
                    onClick={() => {
                      if (!session) {
                        router.push('/login');
                      } else {
                        setShowMentorModal(true);
                      }
                    }}
                    className="border-emerald-500 text-emerald-700 hover:bg-emerald-50"
                  >
                    Request Mentorship
                  </Button>
                )
              )}
            </div>
          )}
          {isOwnProfile && (
            <Link
              href="/profile/edit"
              className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Edit Profile
            </Link>
          )}
        </div>

        {/* Bio */}
        {researcher.bio && (
          <div className="mt-6">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-400">
              About
            </h2>
            <p className="mt-2 text-gray-700 leading-relaxed">{researcher.bio}</p>
          </div>
        )}

        {/* Expertise tags */}
        {researcher.expertiseTags.length > 0 && (
          <div className="mt-5">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-400">
              Expertise
            </h2>
            <div className="mt-2 flex flex-wrap gap-2">
              {researcher.expertiseTags.map((tag) => (
                <Badge key={tag} variant="indigo">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Collaboration needs */}
        {researcher.collaborationNeeds.length > 0 && (
          <div className="mt-5">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-400">
              Seeking Collaborators With
            </h2>
            <div className="mt-2 flex flex-wrap gap-2">
              {researcher.collaborationNeeds.map((need) => (
                <Badge key={need} variant="purple">
                  {need}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Mentor section */}
        {researcher.isMentor && (
          <div className="mt-5 rounded-lg border border-emerald-200 bg-emerald-50 p-4">
            <div className="flex items-center gap-2">
              <svg
                className="h-4 w-4 text-emerald-600"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
              </svg>
              <h2 className="text-sm font-semibold text-emerald-800">
                Open to Mentoring
              </h2>
            </div>

            {researcher.mentorshipFocus.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-1.5">
                {researcher.mentorshipFocus.map((f) => (
                  <Badge key={f} variant="green">
                    {f}
                  </Badge>
                ))}
              </div>
            )}

            {researcher.mentoringAreas.length > 0 && (
              <div className="mt-2">
                <p className="text-xs text-emerald-700 font-medium">Mentoring areas</p>
                <div className="mt-1 flex flex-wrap gap-1.5">
                  {researcher.mentoringAreas.map((area) => (
                    <Badge key={area} variant="green">
                      {area}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {researcher.mentorshipStyle && (
              <p className="mt-2 text-sm text-emerald-700 italic">
                {researcher.mentorshipStyle}
              </p>
            )}

            {researcher.maxMentees != null && (
              <p className="mt-1 text-xs text-emerald-600">
                Accepting up to {researcher.maxMentees} mentee{researcher.maxMentees !== 1 ? 's' : ''}
              </p>
            )}
          </div>
        )}

        {/* Joined date */}
        <p className="mt-5 text-xs text-gray-400">
          Member since {new Date(researcher.createdAt).toLocaleDateString('en-US', {
            month: 'long',
            year: 'numeric',
          })}
        </p>
      </div>

      {/* Projects */}
      {researcher.projects.length > 0 && (
        <div className="mt-8">
          <h2 className="mb-4 text-xl font-semibold text-gray-900">
            Projects ({researcher.projects.length})
          </h2>
          <div className="space-y-4">
            {researcher.projects.map((project) => (
              <ProjectCard
                key={project.id}
                project={{ ...project, user: researcher } as any}
                showOwner={false}
              />
            ))}
          </div>
        </div>
      )}

      {/* Collaboration Request Modal */}
      {showRequestModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl">
            <h2 className="text-lg font-semibold text-gray-900">
              Request Collaboration
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Send a collaboration request to {researcher.name}
            </p>

            {requestError && (
              <div className="mt-3 rounded-md bg-red-50 p-3 text-sm text-red-700">
                {requestError}
              </div>
            )}

            <form onSubmit={handleSendRequest} className="mt-4 space-y-4">
              {/* Optional project reference */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Related Project (optional)
                </label>
                <select
                  value={requestProjectId}
                  onChange={(e) => setRequestProjectId(e.target.value)}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                >
                  <option value="">No specific project</option>
                  {researcher.projects.map((project) => (
                    <option key={project.id} value={project.id}>
                      {project.title}
                    </option>
                  ))}
                </select>
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Message (optional)
                </label>
                <textarea
                  value={requestMessage}
                  onChange={(e) => setRequestMessage(e.target.value)}
                  rows={4}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  placeholder="Introduce yourself and explain why you'd like to collaborate..."
                />
              </div>

              <div className="flex justify-end gap-3">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => setShowRequestModal(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" loading={requestLoading}>
                  Send Request
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Mentor Request Modal */}
      {showMentorModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={(e) => { if (e.target === e.currentTarget) setShowMentorModal(false); }}
        >
          <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl">
            {mentorRequestSuccess ? (
              <div className="py-8 text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100">
                  <svg className="h-6 w-6 text-emerald-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Request sent!</h3>
                <p className="mt-1 text-sm text-gray-500">Your mentorship request has been sent to {researcher.name}.</p>
                <button onClick={() => setShowMentorModal(false)} className="mt-6 rounded-md bg-emerald-600 px-5 py-2 text-sm font-medium text-white hover:bg-emerald-700">
                  Done
                </button>
              </div>
            ) : (
              <>
                <div className="mb-5 flex items-start justify-between">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">Request Mentorship</h2>
                    <p className="mt-0.5 text-sm text-gray-500">from <span className="font-medium text-gray-700">{researcher.name}</span></p>
                  </div>
                  <button onClick={() => setShowMentorModal(false)} className="rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600">
                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {mentorRequestError && (
                  <div className="mb-4 rounded-md bg-red-50 p-3 text-sm text-red-700">{mentorRequestError}</div>
                )}

                <form onSubmit={handleSendMentorRequest} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Your career stage <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={mentorStage}
                      onChange={(e) => setMentorStage(e.target.value)}
                      required
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    >
                      <option value="">Select your stage...</option>
                      {STAGE_OPTIONS.map((opt) => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      What are you hoping to get from this mentorship? <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      value={mentorGoals}
                      onChange={(e) => setMentorGoals(e.target.value)}
                      required
                      rows={3}
                      placeholder="e.g. Guidance on my dissertation, career advice..."
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Brief description of your work <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      value={mentorWorkDesc}
                      onChange={(e) => setMentorWorkDesc(e.target.value)}
                      required
                      rows={3}
                      placeholder="Describe your current research or projects..."
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Personal message <span className="text-xs text-gray-400">(optional)</span>
                    </label>
                    <textarea
                      value={mentorMessage}
                      onChange={(e) => setMentorMessage(e.target.value)}
                      rows={2}
                      placeholder="Anything else you'd like the mentor to know..."
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>

                  <div className="flex gap-3 pt-1">
                    <Button type="submit" loading={mentorRequestLoading} className="flex-1 justify-center bg-emerald-600 hover:bg-emerald-700">
                      Send request
                    </Button>
                    <Button type="button" variant="secondary" onClick={() => setShowMentorModal(false)}>
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
