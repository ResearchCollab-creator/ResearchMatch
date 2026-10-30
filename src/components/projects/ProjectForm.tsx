'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { TagInput } from '@/components/ui/TagInput';
import { Project, ProjectFormData } from '@/types';

interface ProjectFormProps {
  initial?: Partial<Project>;
  projectId?: string;
  mode?: 'create' | 'edit';
}

export function ProjectForm({
  initial,
  projectId,
  mode = 'create',
}: ProjectFormProps) {
  const router = useRouter();
  const [form, setForm] = useState<ProjectFormData>({
    title: initial?.title || '',
    description: initial?.description || '',
    tags: initial?.tags || [],
    neededExpertise: initial?.neededExpertise || [],
    status: initial?.status || 'active',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!form.title.trim() || !form.description.trim()) {
      setError('Title and description are required.');
      return;
    }

    setLoading(true);

    try {
      const url =
        mode === 'edit' ? `/api/projects/${projectId}` : '/api/projects';
      const method = mode === 'edit' ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Something went wrong');
        return;
      }

      // Redirect to the project page
      router.push(`/projects/${data.data.id}`);
      router.refresh();
    } catch {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="rounded-md bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Title */}
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700"
        >
          Project Title <span className="text-red-500">*</span>
        </label>
        <input
          id="title"
          type="text"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          placeholder="e.g., Machine Learning for Climate Modeling"
          required
        />
      </div>

      {/* Description */}
      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700"
        >
          Description <span className="text-red-500">*</span>
        </label>
        <textarea
          id="description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          rows={5}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          placeholder="Describe your project, its goals, and what you hope to achieve..."
          required
        />
      </div>

      {/* Tags */}
      <TagInput
        label="Project Tags"
        tags={form.tags}
        onChange={(tags) => setForm({ ...form, tags })}
        placeholder="e.g., machine learning, climate, remote sensing..."
        helpText="Press Enter or comma to add. Tags help other researchers discover your project."
      />

      {/* Needed Expertise */}
      <TagInput
        label="Expertise Needed"
        tags={form.neededExpertise}
        onChange={(neededExpertise) => setForm({ ...form, neededExpertise })}
        placeholder="e.g., statistician, GIS expert, clinical trial..."
        helpText="What skills or expertise are you looking for in collaborators?"
      />

      {/* Status */}
      <div>
        <label
          htmlFor="status"
          className="block text-sm font-medium text-gray-700"
        >
          Status
        </label>
        <select
          id="status"
          value={form.status}
          onChange={(e) => setForm({ ...form, status: e.target.value })}
          className="mt-1 block rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
        >
          <option value="active">Active — seeking collaborators</option>
          <option value="paused">Paused</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      <div className="flex gap-3">
        <Button type="submit" loading={loading} size="lg">
          {mode === 'edit' ? 'Save Changes' : 'Create Project'}
        </Button>
        <Button
          type="button"
          variant="secondary"
          size="lg"
          onClick={() => router.back()}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
