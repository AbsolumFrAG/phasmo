import { difference, without } from "./array";

export function narrowDecision(
  allGhostEvidences: Record<string, string[]>,
  ghostKeys: string[],
  evidence: string[],
  eliminatedEvidence: string[] = []
) {
  const possibleGhosts: Set<string> = new Set();
  const possibleLeftoverEvidence: Set<string> = new Set();
  for (const key of ghostKeys) {
    const ghostEvidence: string[] = allGhostEvidences[key];
    if (
      eliminatedEvidence.length &&
      ghostEvidence.some((e: string) => eliminatedEvidence.includes(e))
    ) {
      continue;
    }
    if (difference(evidence, ghostEvidence).length === 0) {
      possibleGhosts.add(key);
      for (const leftoverEvidence of difference(
        eliminatedEvidence.length
          ? without(ghostEvidence, ...eliminatedEvidence)
          : ghostEvidence,
        evidence
      )) {
        possibleLeftoverEvidence.add(leftoverEvidence);
      }
    }
  }
  return {
    possibleGhosts,
    possibleLeftoverEvidence,
  };
}
