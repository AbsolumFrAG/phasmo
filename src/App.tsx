import { useCallback, useMemo, useState } from "react";
import {
  Box,
  Button,
  Spacer,
  Text,
  Flex,
  Grid,
  Divider,
  Heading,
  Stack,
} from "@chakra-ui/react";
import { narrowDecision } from "./util/decider";
import { setToArray } from "./util/setToArray";
import EvidenceSelector from "./components/EvidenceSelector";
import HintPane from "./components/HintPane";
import Options from "./components/Options";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { FeatureToggleKey, FEATURE_TOGGLE } from "./util/features";
import { without } from "./util/array";
import { DataType } from "./util/data";
import { ColorModeSwitcher } from "./ColorModeSwitcher";
import VersionSelector from "./components/VersionSelector";
import GhostResult from "./components/GhostResult";

type AppProps = {
  data: DataType | null;
  version: string;
  setVersion: (version: string) => void;
  isLoading: boolean;
};

export default function App({
  data,
  version,
  setVersion,
  isLoading,
}: AppProps) {
  const [options, setOptions] = useLocalStorage<
    Record<FeatureToggleKey, boolean>
  >("options", FEATURE_TOGGLE);

  const [toggledEvidence, setEvidence] = useState<string[]>([]);
  const [isInEliminateMode, setIsInEliminateMode] = useState(false);
  const [eliminatedEvidence, setEliminatedEvidence] = useState<string[]>([]);

  const ghostKeys = data?.ghostKeys ?? null;

  const handleEvidenceToggle = useCallback(
    (e: string) => {
      if (isInEliminateMode) {
        if (eliminatedEvidence.includes(e)) {
          setEliminatedEvidence(without(eliminatedEvidence, e));
        } else {
          setEliminatedEvidence([...eliminatedEvidence, e]);
        }
      } else {
        if (toggledEvidence.includes(e)) {
          setEvidence(without(toggledEvidence, e));
        } else {
          setEvidence([...toggledEvidence, e]);
        }
      }
    },
    [toggledEvidence, eliminatedEvidence, isInEliminateMode]
  );

  const handleEliminateToggle = () => {
    setIsInEliminateMode(!isInEliminateMode);
  };

  const { possibleLeftoverEvidence, possibleGhosts } = useMemo(() => {
    if (data === null || ghostKeys === null) {
      return {
        possibleLeftoverEvidence: [],
        possibleGhosts: [],
      };
    }
    const result = narrowDecision(
      data.ghostEvidence,
      ghostKeys,
      toggledEvidence,
      eliminatedEvidence
    );
    return {
      possibleLeftoverEvidence: setToArray(result.possibleLeftoverEvidence),
      possibleGhosts: setToArray(result.possibleGhosts),
    };
  }, [toggledEvidence, eliminatedEvidence, ghostKeys, data]);

  const hasEvidence = useMemo(
    () => !!toggledEvidence.length,
    [toggledEvidence]
  );

  const handleReset = useCallback(() => {
    setEvidence([]);
    setIsInEliminateMode(false);
    setEliminatedEvidence([]);
  }, []);

  const resetAndSetVersion = (version: string) => {
    handleReset();
    setVersion(version);
  };

  const discoveredGhostKey =
    possibleGhosts.length === 1 ? possibleGhosts[0] : null;

  return (
    <Grid gap={4}>
      <Box>
        <Flex align="center">
          <div>
            <Heading size="md">👻🔎</Heading>
          </div>
          <Spacer />
          <Stack spacing={2} direction="row" align="center">
            <VersionSelector
              version={version}
              setVersion={resetAndSetVersion}
            />
            <ColorModeSwitcher />
            <Options options={options} setOptions={setOptions} />
            <Button onClick={handleReset} colorScheme="red">
              Réinitialiser
            </Button>
          </Stack>
        </Flex>
      </Box>

      {(data === null || isLoading) && <Text>Chargement...</Text>}
      {data !== null && !isLoading && (
        <>
          <Grid gap={2}>
            <Flex align="center">
              <Heading size="md">Sélectionner les preuves</Heading>
              <Spacer />
              <Button
                onClick={handleEliminateToggle}
                variant={isInEliminateMode ? "solid" : "outline"}
                colorScheme={isInEliminateMode ? "blue" : "black"}
                size="sm"
              >
                {isInEliminateMode
                  ? "Mode Élimination Activé"
                  : "Mode Élimination Désactivé"}
              </Button>
            </Flex>
            <Box>
              <EvidenceSelector
                data={data}
                onEvidenceToggle={handleEvidenceToggle}
                selectedEvidence={toggledEvidence}
                eliminatedEvidence={eliminatedEvidence}
                isInEliminatedMode={isInEliminateMode}
                possibleLeftoverEvidence={possibleLeftoverEvidence}
              />
            </Box>
            <Box>
              {!hasEvidence && !isInEliminateMode && (
                <Text color="gray.500" size="md">
                  Sélectionnez les preuves existantes pour affiner les preuves
                  restantes
                </Text>
              )}
              {isInEliminateMode && (
                <Text color="gray.500" size="md">
                  Éliminez les preuves qui sont exclues en appuyant
                </Text>
              )}
            </Box>
          </Grid>
          {hasEvidence && <Divider />}
          {hasEvidence && possibleGhosts.length !== 1 && (
            <HintPane
              data={data}
              possibleGhosts={possibleGhosts}
              possibleLeftoverEvidence={possibleLeftoverEvidence}
            />
          )}
          <GhostResult data={data} ghostKey={discoveredGhostKey} />
        </>
      )}
    </Grid>
  );
}
