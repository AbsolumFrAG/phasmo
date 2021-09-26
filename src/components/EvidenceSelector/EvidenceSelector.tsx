import { Wrap, WrapItem } from "@chakra-ui/react";
import { DataType } from "../../util/data";
import { getEvidenceImage } from "../../util/images";
import EvidenceButton from "./EvidenceButton";

type EvidenceSelectorProps = {
  data: DataType;
  selectedEvidence: string[];
  onEvidenceToggle: (e: string) => void;
  possibleLeftoverEvidence: string[];
  eliminatedEvidence: string[];
  isInEliminatedMode: boolean;
};

export default function EvidenceSelector({
  data,
  selectedEvidence,
  onEvidenceToggle,
  possibleLeftoverEvidence,
  eliminatedEvidence,
  isInEliminatedMode,
}: EvidenceSelectorProps) {
  const { evidence } = data;
  const allEvidenceKeys = Object.keys(evidence);

  return (
    <Wrap spacing={2}>
      {allEvidenceKeys.map((evidenceKey) => (
        <WrapItem key={evidenceKey}>
          <EvidenceButton
            imgSrc={getEvidenceImage(evidenceKey)}
            label={evidence[evidenceKey]}
            onClick={onEvidenceToggle}
            isEliminated={eliminatedEvidence.includes(evidenceKey)}
            value={evidenceKey}
            disabled={
              (!selectedEvidence.includes(evidenceKey) &&
                !possibleLeftoverEvidence.includes(evidenceKey) &&
                !isInEliminatedMode) ||
              (isInEliminatedMode &&
                (selectedEvidence.includes(evidenceKey) ||
                  ![
                    ...possibleLeftoverEvidence,
                    ...eliminatedEvidence,
                  ].includes(evidenceKey)))
            }
            isSelected={
              selectedEvidence.includes(evidenceKey) && !isInEliminatedMode
            }
          />
        </WrapItem>
      ))}
    </Wrap>
  );
}
