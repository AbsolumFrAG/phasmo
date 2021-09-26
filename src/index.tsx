import { StrictMode } from "react";
import {
  Box,
  ChakraProvider,
  Container,
  Divider,
  Grid,
  Link,
  Text,
} from "@chakra-ui/react";
import "./index.css";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import { DataLoaderWrapper } from "./DataLoaderWrapper";
import ReactDOM from "react-dom";

ReactDOM.render(
  <StrictMode>
    <ChakraProvider>
      <Box textAlign="center" size="xl" marginTop={4}>
        <Container>
          <Box minHeight="100vh">
            <DataLoaderWrapper />
          </Box>
          <Grid marginTop={4} marginBottom={4} gap={2}>
            <Divider />
            <Text size="sm">
              Phasmophobia Ghost Identifier is Copyright ©{" "}
              {new Date().getFullYear()} Lou TIGROUDJA (
              <Link href="https://github.com/AbsolumFrAG" target="_blank">
                @Absolum_FrAGV2
              </Link>
              ).{" "}
              <Link
                href="https://github.com/AbsolumFrAG/phasmo"
                target="_blank"
              >
                Voir la source sur GitHub
              </Link>
              . Not affiliated with, or endorsed by Kinetic Games.
            </Text>
          </Grid>
        </Container>
      </Box>
    </ChakraProvider>
  </StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();
