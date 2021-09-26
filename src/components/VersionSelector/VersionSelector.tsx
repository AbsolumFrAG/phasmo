import { Select } from "@chakra-ui/react";
import { ChangeEvent } from "react";
import { VERSIONS } from "../../data/versions";

type VersionSelectorProps = {
  version: string;
  setVersion: (version: string) => void;
};

export default function VersionSelector({
  version,
  setVersion,
}: VersionSelectorProps) {
  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setVersion(e.target.value);
  };
  return (
    <Select
      value={version}
      onChange={handleSelectChange}
      size="xs"
      width="initial"
    >
      {VERSIONS.map((version) => (
        <option label={`v${version}`}>{version}</option>
      ))}
    </Select>
  );
}
