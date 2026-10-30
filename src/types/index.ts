// Shared TypeScript types for ResearchMatch

export interface UserProfile {
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
  updatedAt: string;
  // Mentor fields
  isMentor: boolean;
  mentorshipFocus: string[];
  mentoringAreas: string[];
  mentorshipStyle: string | null;
  maxMentees: number | null;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  neededExpertise: string[];
  status: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  user?: UserProfile;
}

export type RequestStatus = 'pending' | 'accepted' | 'declined';

export interface CollabRequest {
  id: string;
  message: string | null;
  status: RequestStatus;
  createdAt: string;
  updatedAt: string;
  fromUserId: string;
  toUserId: string;
  projectId: string | null;
  fromUser?: UserProfile;
  toUser?: UserProfile;
  project?: Project;
}

export interface MatchResult {
  user: UserProfile;
  score: number;
  expertiseMatchCount: number;
  needsMatchCount: number;
}

export interface SearchParams {
  q?: string;
  tags?: string;
  department?: string;
}

// API response wrappers
export interface ApiResponse<T> {
  data?: T;
  error?: string;
}

// Form data types
export interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  department?: string;
  university?: string;
}

export interface ProfileEditFormData {
  name: string;
  department: string;
  university: string;
  bio: string;
  expertiseTags: string[];
  collaborationNeeds: string[];
  contactInfo: string;
}

export interface ProjectFormData {
  title: string;
  description: string;
  tags: string[];
  neededExpertise: string[];
  status: string;
}

export interface RequestFormData {
  toUserId: string;
  projectId?: string;
  message?: string;
}

export interface MentorRequest {
  id: string;
  stage: string;
  goals: string;
  workDesc: string;
  message: string | null;
  status: RequestStatus;
  createdAt: string;
  updatedAt: string;
  fromUserId: string;
  toUserId: string;
  fromUser?: UserProfile;
  toUser?: UserProfile;
}

export interface MentorRequestFormData {
  toUserId: string;
  stage: string;
  goals: string;
  workDesc: string;
  message?: string;
}

export interface MentorProfileFormData {
  isMentor: boolean;
  mentorshipFocus: string[];
  mentoringAreas: string[];
  mentorshipStyle: string;
  maxMentees: string; // stored as string in form, parsed to int on save
}
