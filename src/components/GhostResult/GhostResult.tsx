import { Box, Grid, Heading } from '@chakra-ui/layout'
import { DataType } from '../../util/data'
import { getIndefiniteArticle } from '../../util/grammar'
import GhostDescription from '../GhostDescription'

type GhostResultProps = {
    data: DataType
    ghostKey: string | null
}

export default function GhostResult({ data, ghostKey }: GhostResultProps) {
    if (ghostKey === null) {
        return null
    }
    const ghost = data.ghostData[ghostKey]
    return (
        <Grid gap={2}>
            <Box>
                <Heading size="md">
                    Le fantôme est {getIndefiniteArticle(ghost.name)}{' '}
                    <span style={{ fontStyle: 'italic', textDecoration: 'underline' }}>
                        {ghost.name}
                    </span>
                </Heading>
            </Box>
            <Box>
                <GhostDescription
                    description={ghost.description}
                    weaknesses={ghost.weaknesses}
                    strengths={ghost.strengths}
                />
            </Box>
        </Grid>
    )
}