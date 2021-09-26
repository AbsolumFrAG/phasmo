import { SimpleGrid, Box, Text, HStack, Image, Grid } from "@chakra-ui/react";
import StrengthImage from "../../images/strength.png";
import WeaknessImage from "../../images/weakness.png";

type GhostDescriptionProps = {
  description: string;
  strengths: string;
  weaknesses: string;
};

export default function GhostDescription({
  strengths,
  weaknesses,
  description,
}: GhostDescriptionProps) {
  return (
    <Grid gap={4}>
      <Text>{description}</Text>
      <SimpleGrid columns={2} spacing={4}>
        <Box>
          <HStack>
            <Text fontWeight="bold">Forces</Text>
            <Image
              src={StrengthImage}
              sx={{ imageRendering: "pixelated" }}
              alt="Force"
            />
          </HStack>
          <Text align="left">{strengths}</Text>
        </Box>
        <Box>
          <HStack>
            <Text fontWeight="bold">Faiblesses</Text>
            <Image
              src={WeaknessImage}
              sx={{ imageRendering: "pixelated" }}
              alt="Faiblesses"
            />
          </HStack>
          <Text align="left">{weaknesses}</Text>
        </Box>
      </SimpleGrid>
    </Grid>
  );
}
