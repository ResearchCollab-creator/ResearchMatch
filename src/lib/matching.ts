/**
 * Tag-overlap based matching algorithm for ResearchMatch.
 *
 * Scoring logic:
 * - For each candidate, we count how many of their expertiseTags overlap with
 *   the current user's collaborationNeeds, AND how many of the current user's
 *   expertiseTags appear in the candidate's collaborationNeeds.
 * - Total overlapping tags / total unique tags across both sets = score (0-1).
 * - We return the top `limit` matches sorted by score descending.
 */

export interface UserForMatching {
  id: string;
  name: string;
  email: string;
  department: string | null;
  university: string;
  bio: string | null;
  expertiseTags: string[];
  collaborationNeeds: string[];
  avatarUrl: string | null;
}

export interface MatchResult {
  user: UserForMatching;
  score: number;
  // How many tags from their expertise match your needs
  expertiseMatchCount: number;
  // How many of your expertise tags match their needs
  needsMatchCount: number;
}

/**
 * Normalizes a tag for comparison (lowercase, trimmed).
 */
function normalizeTag(tag: string): string {
  return tag.toLowerCase().trim();
}

/**
 * Computes the Jaccard-style overlap score between two sets of tags.
 * Returns a value between 0 and 1.
 */
function computeScore(setA: string[], setB: string[]): number {
  if (setA.length === 0 && setB.length === 0) return 0;

  const normalizedA = setA.map(normalizeTag);
  const normalizedB = setB.map(normalizeTag);

  const unionSet = new Set([...normalizedA, ...normalizedB]);
  const intersectionCount = normalizedA.filter((tag) =>
    normalizedB.includes(tag)
  ).length;

  return intersectionCount / unionSet.size;
}

/**
 * Counts how many tags from `sourceSet` appear in `targetSet`.
 */
function countOverlap(sourceSet: string[], targetSet: string[]): number {
  const normalizedTarget = targetSet.map(normalizeTag);
  return sourceSet.filter((tag) =>
    normalizedTarget.includes(normalizeTag(tag))
  ).length;
}

/**
 * Computes match scores for all candidate researchers relative to the current user.
 *
 * @param currentUser - The logged-in user to compute matches for
 * @param candidates - All other researchers (must exclude currentUser)
 * @param limit - Maximum number of matches to return (default: 10)
 * @returns Sorted array of matches with scores, best matches first
 */
export function computeMatches(
  currentUser: UserForMatching,
  candidates: UserForMatching[],
  limit = 10
): MatchResult[] {
  const results: MatchResult[] = candidates.map((candidate) => {
    // How many of the candidate's expertise tags match what the current user needs
    const expertiseMatchCount = countOverlap(
      candidate.expertiseTags,
      currentUser.collaborationNeeds
    );

    // How many of the current user's expertise tags match what the candidate needs
    const needsMatchCount = countOverlap(
      currentUser.expertiseTags,
      candidate.collaborationNeeds
    );

    // Combined score: overlap between (candidate expertise + current user needs) and
    // (current user expertise + candidate needs)
    const combinedScore =
      computeScore(candidate.expertiseTags, currentUser.collaborationNeeds) +
      computeScore(currentUser.expertiseTags, candidate.collaborationNeeds);

    // Normalize combined score to 0-1 range (each component is 0-1, so max is 2)
    const score = combinedScore / 2;

    return {
      user: candidate,
      score,
      expertiseMatchCount,
      needsMatchCount,
    };
  });

  // Sort by score descending, break ties by total overlap count
  results.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    const aTotal = a.expertiseMatchCount + a.needsMatchCount;
    const bTotal = b.expertiseMatchCount + b.needsMatchCount;
    return bTotal - aTotal;
  });

  // Filter out zero-score matches and return top N
  return results.filter((r) => r.score > 0).slice(0, limit);
}
