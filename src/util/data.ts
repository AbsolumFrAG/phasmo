export type DataType = {
  version: string;
  ghostKeys: string[];
  ghostData: Record<
    string,
    {
      name: string;
      description: string;
      strengths: string;
      weaknesses: string;
    }
  >;
  ghostEvidence: Record<string, string[]>;
  evidence: Record<string, string>;
};

export async function loadData(version: string): Promise<DataType> {
  return await import(`../data/v${version}.json`).then(
    ({ default: json }) => json
  );
}
