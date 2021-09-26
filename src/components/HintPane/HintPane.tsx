import {
  Text,
  Box,
  Flex,
  Wrap,
  WrapItem,
  Grid,
  Heading,
  Image,
} from "@chakra-ui/react";
import GhostDescriptionPopup from "../GhostDescriptionPopup";
import { getEvidenceImage } from "../../util/images";
import { DataType } from "../../util/data";

type HintPaneProps = {
  data: DataType;
  possibleLeftoverEvidence: string[];
  possibleGhosts: string[];
};

export default function HintPane({
  data,
  possibleLeftoverEvidence,
  possibleGhosts,
}: HintPaneProps) {
  const { evidence } = data;
  return (
    <>
      <Grid gap={2}>
        <Box>
          <Heading align="left" size="md">
            Évidences Restantes Possibles
          </Heading>
        </Box>
        <Box>
          <Wrap justify="center">
            {possibleLeftoverEvidence.map((key) => (
              <WrapItem key={key}>
                <Flex direction="column" align="center">
                  <Image
                    src={getEvidenceImage(key)}
                    alt={evidence[key]}
                    htmlWidth={48}
                    htmlHeight={48}
                    sx={{ imageRendering: "pixelated" }}
                  />
                  <Text size="md">{evidence[key]}</Text>
                </Flex>
              </WrapItem>
            ))}
          </Wrap>
        </Box>
      </Grid>
      <Grid gap={2}>
        <Box>
          <Heading align="left" size="md">
            Fantômes Possibles
          </Heading>
        </Box>
        <Box>
          <Wrap justify="center">
            {possibleGhosts.map((key) => (
              <WrapItem key={key}>
                <GhostDescriptionPopup data={data} ghostKey={key} />
              </WrapItem>
            ))}
          </Wrap>
        </Box>
      </Grid>
    </>
  );
}
