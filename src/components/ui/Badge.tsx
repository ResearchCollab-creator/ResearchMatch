import React from 'react';

type BadgeVariant = 'default' | 'indigo' | 'green' | 'yellow' | 'red' | 'blue' | 'purple';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
  onRemove?: () => void;
}

const variantClasses: Record<BadgeVariant, string> = {
  default: 'bg-gray-100 text-gray-700',
  indigo: 'bg-indigo-100 text-indigo-700',
  green: 'bg-green-100 text-green-700',
  yellow: 'bg-yellow-100 text-yellow-700',
  red: 'bg-red-100 text-red-700',
  blue: 'bg-blue-100 text-blue-700',
  purple: 'bg-purple-100 text-purple-700',
};

export function Badge({
  children,
  variant = 'default',
  className = '',
  onRemove,
}: BadgeProps) {
  return (
    <span
      className={`
        inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium
        ${variantClasses[variant]}
        ${className}
      `}
    >
      {children}
      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          className="ml-0.5 rounded-full p-0.5 hover:bg-black/10 focus:outline-none"
          aria-label="Remove tag"
        >
          <svg
            className="h-2.5 w-2.5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      )}
    </span>
  );
}
