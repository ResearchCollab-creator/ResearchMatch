'use client';

import React, { useState, KeyboardEvent } from 'react';
import { Badge } from './Badge';

interface TagInputProps {
  tags: string[];
  onChange: (tags: string[]) => void;
  placeholder?: string;
  label?: string;
  helpText?: string;
  maxTags?: number;
}

/**
 * TagInput component — allows adding/removing string tags.
 * Press Enter or comma to add the current input value as a tag.
 * Click the X button on a badge to remove it.
 */
export function TagInput({
  tags,
  onChange,
  placeholder = 'Type and press Enter or comma...',
  label,
  helpText,
  maxTags = 20,
}: TagInputProps) {
  const [inputValue, setInputValue] = useState('');

  const addTag = (value: string) => {
    const trimmed = value.trim().toLowerCase();
    // Ignore empty strings or duplicates
    if (!trimmed || tags.includes(trimmed)) {
      setInputValue('');
      return;
    }
    // Respect max tag limit
    if (tags.length >= maxTags) return;
    onChange([...tags, trimmed]);
    setInputValue('');
  };

  const removeTag = (index: number) => {
    onChange(tags.filter((_, i) => i !== index));
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    // Add tag on Enter or comma
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addTag(inputValue);
    }
    // Remove last tag on Backspace when input is empty
    if (e.key === 'Backspace' && inputValue === '' && tags.length > 0) {
      onChange(tags.slice(0, -1));
    }
  };

  const handleBlur = () => {
    // Add tag when user clicks away if there is input
    if (inputValue.trim()) {
      addTag(inputValue);
    }
  };

  return (
    <div className="space-y-1.5">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <div className="min-h-[42px] w-full rounded-md border border-gray-300 bg-white px-3 py-2 focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500">
        <div className="flex flex-wrap gap-1.5">
          {tags.map((tag, index) => (
            <Badge
              key={`${tag}-${index}`}
              variant="indigo"
              onRemove={() => removeTag(index)}
            >
              {tag}
            </Badge>
          ))}
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={handleBlur}
            placeholder={tags.length === 0 ? placeholder : ''}
            className="min-w-[120px] flex-1 border-none bg-transparent text-sm text-gray-900 outline-none placeholder:text-gray-400"
            disabled={tags.length >= maxTags}
          />
        </div>
      </div>
      {helpText && <p className="text-xs text-gray-500">{helpText}</p>}
    </div>
  );
}
