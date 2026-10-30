'use client';

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export function Navbar() {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = session
    ? [
        { href: '/dashboard', label: 'Dashboard' },
        { href: '/matches', label: 'Matches' },
        { href: '/researchers', label: 'Researchers' },
        { href: '/projects', label: 'Projects' },
        { href: '/mentors', label: 'Mentors' },
        { href: '/requests', label: 'Requests' },
        { href: '/mentor-requests', label: 'Mentorship' },
      ]
    : [
        { href: '/researchers', label: 'Browse Researchers' },
        { href: '/projects', label: 'Projects' },
        { href: '/mentors', label: 'Mentors' },
      ];

  const isActive = (href: string) => pathname === href;

  return (
    <nav className="border-b border-gray-200 bg-white shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600">
              <svg
                className="h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
                />
              </svg>
            </div>
            <span className="text-xl font-bold text-gray-900">
              Research<span className="text-indigo-600">Match</span>
            </span>
          </Link>

          {/* Desktop nav links */}
          <div className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  isActive(link.href)
                    ? 'bg-indigo-50 text-indigo-700'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Auth actions */}
          <div className="hidden items-center gap-3 md:flex">
            {status === 'loading' ? (
              <div className="h-8 w-24 animate-pulse rounded-md bg-gray-200" />
            ) : session ? (
              <>
                <Link
                  href="/profile"
                  className={`text-sm font-medium transition-colors ${
                    isActive('/profile')
                      ? 'text-indigo-700'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {session.user.name}
                </Link>
                <button
                  onClick={() => signOut({ callbackUrl: '/' })}
                  className="rounded-md border border-gray-300 px-3 py-1.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
                >
                  Sign out
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-sm font-medium text-gray-600 hover:text-gray-900"
                >
                  Sign in
                </Link>
                <Link
                  href="/register"
                  className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-700"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-md p-2 text-gray-500 hover:bg-gray-100 md:hidden"
            aria-label="Toggle menu"
          >
            <svg
              className="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="border-t border-gray-200 bg-white px-4 pb-4 pt-2 md:hidden">
          <div className="space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block rounded-md px-3 py-2 text-sm font-medium ${
                  isActive(link.href)
                    ? 'bg-indigo-50 text-indigo-700'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="mt-3 border-t border-gray-200 pt-3">
            {session ? (
              <div className="space-y-1">
                <Link
                  href="/profile"
                  className="block rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  My Profile
                </Link>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    signOut({ callbackUrl: '/' });
                  }}
                  className="block w-full rounded-md px-3 py-2 text-left text-sm font-medium text-gray-600 hover:bg-gray-100"
                >
                  Sign out
                </button>
              </div>
            ) : (
              <div className="space-y-1">
                <Link
                  href="/login"
                  className="block rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign in
                </Link>
                <Link
                  href="/register"
                  className="block rounded-md bg-indigo-600 px-3 py-2 text-sm font-medium text-white hover:bg-indigo-700"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
