import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Text,
  Image,
  HStack,
} from "@chakra-ui/react";
import GhostDescription from "../GhostDescription";
import { getEvidenceKeyAndImagePair } from "../../util/images";
import { DataType } from "../../util/data";

type GhostDescriptionPopupProps = {
  data: DataType;
  ghostKey: string;
};

export default function GhostDescriptionPopup({
  data,
  ghostKey,
}: GhostDescriptionPopupProps) {
  const { ghostData, ghostEvidence } = data;
  const { isOpen, onOpen, onClose } = useDisclosure();

  const ghost = ghostData[ghostKey];
  const evidenceKeys = ghostEvidence[ghostKey];

  return (
    <>
      <Button variant="outline" onClick={onOpen}>
        {ghost.name}
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <HStack>
              <Text>{ghost.name}</Text>
              {getEvidenceKeyAndImagePair(evidenceKeys).map(
                ([evidence, src]) => (
                  <Image
                    key={evidence}
                    src={src}
                    alt={`evidence ${evidence}`}
                    sx={{ imageRendering: "pixelated" }}
                  />
                )
              )}
            </HStack>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <GhostDescription
              description={ghost.description}
              weaknesses={ghost.weaknesses}
              strengths={ghost.strengths}
            />
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Fermer</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
