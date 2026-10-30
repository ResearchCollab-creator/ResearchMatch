'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { TagInput } from '@/components/ui/TagInput';
import { ProfileEditFormData, MentorProfileFormData } from '@/types';

const FOCUS_OPTIONS = [
  'Undergraduate students',
  'Graduate students',
  'Postdocs',
  'Early-career faculty',
  'Medical students',
];

export default function EditProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [form, setForm] = useState<ProfileEditFormData>({
    name: '',
    department: '',
    university: '',
    bio: '',
    expertiseTags: [],
    collaborationNeeds: [],
    contactInfo: '',
  });
  const [mentorForm, setMentorForm] = useState<MentorProfileFormData>({
    isMentor: false,
    mentorshipFocus: [],
    mentoringAreas: [],
    mentorshipStyle: '',
    maxMentees: '',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login?callbackUrl=/profile/edit');
      return;
    }
    if (status === 'authenticated') {
      fetchProfile();
    }
  }, [status]);

  const fetchProfile = async () => {
    try {
      const response = await fetch('/api/profile');
      const data = await response.json();
      if (!response.ok) {
        setError(data.error || 'Failed to load profile');
        return;
      }
      const user = data.data;
      setForm({
        name: user.name || '',
        department: user.department || '',
        university: user.university || '',
        bio: user.bio || '',
        expertiseTags: user.expertiseTags || [],
        collaborationNeeds: user.collaborationNeeds || [],
        contactInfo: user.contactInfo || '',
      });
      setMentorForm({
        isMentor: user.isMentor ?? false,
        mentorshipFocus: user.mentorshipFocus || [],
        mentoringAreas: user.mentoringAreas || [],
        mentorshipStyle: user.mentorshipStyle || '',
        maxMentees: user.maxMentees != null ? String(user.maxMentees) : '',
      });
    } catch {
      setError('Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (!form.name.trim()) {
      setError('Name is required.');
      return;
    }

    setSaving(true);

    try {
      const response = await fetch('/api/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, ...mentorForm }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Failed to save profile');
        return;
      }

      setSuccess(true);
      // Scroll to top to show success message
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch {
      setError('An unexpected error occurred');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 w-48 rounded bg-gray-200" />
          <div className="h-96 rounded-xl bg-gray-200" />
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8">
        <Link
          href="/profile"
          className="mb-2 inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-800"
        >
          ← Back to profile
        </Link>
        <h1 className="mt-2 text-3xl font-bold text-gray-900">Edit Profile</h1>
        <p className="mt-1 text-gray-500">
          Keep your expertise tags and collaboration needs up to date to get the
          best matches.
        </p>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
        {success && (
          <div className="mb-6 flex items-center gap-2 rounded-md bg-green-50 p-4 text-sm text-green-700">
            <svg
              className="h-5 w-5 flex-shrink-0 text-green-500"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                clipRule="evenodd"
              />
            </svg>
            Profile saved successfully!
          </div>
        )}

        {error && (
          <div className="mb-6 rounded-md bg-red-50 p-4 text-sm text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic info */}
          <div className="space-y-4">
            <h2 className="text-base font-semibold text-gray-900">
              Basic Information
            </h2>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Department
              </label>
              <input
                type="text"
                value={form.department}
                onChange={(e) => setForm({ ...form, department: e.target.value })}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                placeholder="e.g., Computer Science"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                University
              </label>
              <input
                type="text"
                value={form.university}
                onChange={(e) => setForm({ ...form, university: e.target.value })}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Contact Information
              </label>
              <input
                type="text"
                value={form.contactInfo}
                onChange={(e) =>
                  setForm({ ...form, contactInfo: e.target.value })
                }
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                placeholder="e.g., email, office hours, website"
              />
            </div>
          </div>

          {/* Bio */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Research Bio
            </label>
            <textarea
              value={form.bio}
              onChange={(e) => setForm({ ...form, bio: e.target.value })}
              rows={5}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              placeholder="Describe your research interests, methods, and current projects..."
            />
          </div>

          {/* Expertise tags */}
          <div>
            <h2 className="mb-3 text-base font-semibold text-gray-900">
              Research Expertise
            </h2>
            <TagInput
              label="Your Expertise Tags"
              tags={form.expertiseTags}
              onChange={(expertiseTags) => setForm({ ...form, expertiseTags })}
              placeholder="e.g., machine learning, genomics, epidemiology..."
              helpText="Add tags that describe your research expertise. These are used to match you with others."
            />
          </div>

          {/* Collaboration needs */}
          <div>
            <h2 className="mb-3 text-base font-semibold text-gray-900">
              Collaboration Needs
            </h2>
            <TagInput
              label="What Expertise Are You Seeking?"
              tags={form.collaborationNeeds}
              onChange={(collaborationNeeds) =>
                setForm({ ...form, collaborationNeeds })
              }
              placeholder="e.g., statistician, GIS expert, neuroscientist..."
              helpText="What skills or expertise are you looking for in collaborators? This drives your matching."
            />
          </div>

          {/* Mentor settings */}
          <div className="space-y-4 border-t border-gray-200 pt-6">
            <div>
              <h2 className="text-base font-semibold text-gray-900">
                Mentorship
              </h2>
              <p className="mt-0.5 text-sm text-gray-500">
                Opt in to appear on the{' '}
                <a href="/mentors" className="text-emerald-600 hover:underline">
                  Mentors
                </a>{' '}
                page and accept mentorship requests.
              </p>
            </div>

            {/* Toggle */}
            <label className="flex cursor-pointer items-center gap-3">
              <div className="relative">
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={mentorForm.isMentor}
                  onChange={(e) =>
                    setMentorForm({ ...mentorForm, isMentor: e.target.checked })
                  }
                />
                <div
                  className={`h-6 w-11 rounded-full transition-colors ${
                    mentorForm.isMentor ? 'bg-emerald-500' : 'bg-gray-300'
                  }`}
                />
                <div
                  className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
                    mentorForm.isMentor ? 'translate-x-5' : 'translate-x-0.5'
                  }`}
                />
              </div>
              <span className="text-sm font-medium text-gray-700">
                I am open to mentoring
              </span>
            </label>

            {/* Conditional mentor fields */}
            {mentorForm.isMentor && (
              <div className="space-y-4 rounded-lg border border-emerald-100 bg-emerald-50/40 p-4">
                {/* Mentorship focus */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    I am open to mentoring
                  </label>
                  <p className="mb-2 text-xs text-gray-500">
                    Select all that apply
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {FOCUS_OPTIONS.map((opt) => {
                      const selected = mentorForm.mentorshipFocus.includes(opt);
                      return (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => {
                            const next = selected
                              ? mentorForm.mentorshipFocus.filter(
                                  (f) => f !== opt
                                )
                              : [...mentorForm.mentorshipFocus, opt];
                            setMentorForm({
                              ...mentorForm,
                              mentorshipFocus: next,
                            });
                          }}
                          className={`rounded-full border px-3 py-1 text-sm font-medium transition-colors ${
                            selected
                              ? 'border-emerald-500 bg-emerald-100 text-emerald-800'
                              : 'border-gray-300 bg-white text-gray-600 hover:border-emerald-300 hover:bg-emerald-50'
                          }`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Mentoring areas */}
                <TagInput
                  label="Mentoring Areas"
                  tags={mentorForm.mentoringAreas}
                  onChange={(mentoringAreas) =>
                    setMentorForm({ ...mentorForm, mentoringAreas })
                  }
                  placeholder="e.g. grant writing, statistical methods, career advice..."
                  helpText="Topics you can mentor on. Defaults to your expertise tags if left empty."
                />

                {/* Mentorship style */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Availability / mentorship style
                  </label>
                  <input
                    type="text"
                    value={mentorForm.mentorshipStyle}
                    onChange={(e) =>
                      setMentorForm({
                        ...mentorForm,
                        mentorshipStyle: e.target.value,
                      })
                    }
                    placeholder="e.g. Monthly 1:1s, available for email Q&A, prefer in-person..."
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </div>

                {/* Max mentees */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Max mentees{' '}
                    <span className="text-xs text-gray-400">(optional)</span>
                  </label>
                  <input
                    type="number"
                    min={1}
                    value={mentorForm.maxMentees}
                    onChange={(e) =>
                      setMentorForm({
                        ...mentorForm,
                        maxMentees: e.target.value,
                      })
                    }
                    placeholder="Leave blank for no limit"
                    className="mt-1 block w-32 rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </div>
              </div>
            )}
          </div>

          <div className="flex gap-3 pt-2">
            <Button type="submit" loading={saving} size="lg">
              Save Profile
            </Button>
            <Button
              type="button"
              variant="secondary"
              size="lg"
              onClick={() => router.push('/profile')}
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
