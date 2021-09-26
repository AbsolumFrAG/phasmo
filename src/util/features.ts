export const FEATURE_TOGGLE = {} as const;

export type FeatureToggleKey = keyof typeof FEATURE_TOGGLE;

export const ALL_FEATURE_TOGGLES: FeatureToggleKey[] = Object.keys(
  FEATURE_TOGGLE
) as FeatureToggleKey[];

export const FEATURE_TOGGLE_NAME: Record<FeatureToggleKey, string> = {};
