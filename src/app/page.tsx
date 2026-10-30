import Link from 'next/link';
import { prisma } from '@/lib/prisma';

// Fetch stats for the landing page hero section
async function getStats() {
  try {
    const [researcherCount, projectCount] = await Promise.all([
      prisma.user.count(),
      prisma.project.count(),
    ]);
    return { researcherCount, projectCount };
  } catch {
    return { researcherCount: 0, projectCount: 0 };
  }
}

export default async function HomePage() {
  const { researcherCount, projectCount } = await getStats();

  return (
    <div className="flex flex-col">
      {/* Hero section */}
      <section className="bg-gradient-to-br from-indigo-50 via-white to-blue-50 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-4 inline-flex items-center rounded-full bg-indigo-100 px-3 py-1 text-sm font-medium text-indigo-700">
            Academic Collaboration Platform
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
            Find Your Perfect{' '}
            <span className="text-indigo-600">Research Match</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600">
            ResearchMatch connects academic researchers with complementary
            expertise. Discover collaborators who can fill your skill gaps,
            accelerate your research, and create multidisciplinary breakthroughs.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/register"
              className="rounded-lg bg-indigo-600 px-8 py-3 text-base font-semibold text-white shadow-sm transition-colors hover:bg-indigo-700"
            >
              Join ResearchMatch
            </Link>
            <Link
              href="/researchers"
              className="rounded-lg border border-gray-300 bg-white px-8 py-3 text-base font-semibold text-gray-700 shadow-sm transition-colors hover:bg-gray-50"
            >
              Browse Researchers
            </Link>
          </div>

          {/* Stats */}
          {(researcherCount > 0 || projectCount > 0) && (
            <div className="mt-12 flex justify-center gap-12">
              <div className="text-center">
                <p className="text-3xl font-bold text-indigo-600">
                  {researcherCount}
                </p>
                <p className="text-sm text-gray-500">Researchers</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-indigo-600">
                  {projectCount}
                </p>
                <p className="text-sm text-gray-500">Active Projects</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-indigo-600">∞</p>
                <p className="text-sm text-gray-500">Possibilities</p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* How it works */}
      <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">How It Works</h2>
            <p className="mt-3 text-gray-500">
              Three steps to your next research collaboration
            </p>
          </div>
          <div className="mt-12 grid gap-8 sm:grid-cols-3">
            {[
              {
                step: '01',
                title: 'Create Your Profile',
                description:
                  'Add your expertise tags, research interests, and what kind of collaborators you\'re looking for.',
                icon: (
                  <svg
                    className="h-8 w-8 text-indigo-600"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                ),
              },
              {
                step: '02',
                title: 'Discover Matches',
                description:
                  'Our algorithm finds researchers whose expertise matches your collaboration needs, and vice versa.',
                icon: (
                  <svg
                    className="h-8 w-8 text-indigo-600"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                    />
                  </svg>
                ),
              },
              {
                step: '03',
                title: 'Request Collaboration',
                description:
                  'Send a collaboration request with a personalized message to potential research partners.',
                icon: (
                  <svg
                    className="h-8 w-8 text-indigo-600"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"
                    />
                  </svg>
                ),
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50">
                  {item.icon}
                </div>
                <div className="mt-1 text-xs font-bold tracking-widest text-indigo-400">
                  STEP {item.step}
                </div>
                <h3 className="mt-2 text-lg font-semibold text-gray-900">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-gray-500">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Disciplines section */}
      <section className="bg-gray-50 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">
              Across All Disciplines
            </h2>
            <p className="mt-3 text-gray-500">
              ResearchMatch spans the full breadth of academic research
            </p>
          </div>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            {[
              'Computational Biology',
              'Machine Learning',
              'Neuroscience',
              'Public Health',
              'Environmental Science',
              'Economics',
              'Social Psychology',
              'Computer Vision',
              'Bioinformatics',
              'Epidemiology',
              'Data Science',
              'Climate Science',
            ].map((discipline) => (
              <span
                key={discipline}
                className="rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm"
              >
                {discipline}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section className="bg-indigo-600 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold text-white">
            Ready to find your research partner?
          </h2>
          <p className="mt-4 text-indigo-200">
            Join today and discover researchers who complement your expertise.
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/register"
              className="rounded-lg bg-white px-8 py-3 text-base font-semibold text-indigo-700 shadow-sm transition-colors hover:bg-indigo-50"
            >
              Create Free Account
            </Link>
            <Link
              href="/researchers"
              className="rounded-lg border border-indigo-400 px-8 py-3 text-base font-semibold text-white transition-colors hover:border-white"
            >
              Browse Without Account
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
