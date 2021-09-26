import {
    Button,
    Modal,
    useDisclosure,
    ModalOverlay,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    Checkbox,
    ModalBody,
    ModalFooter,
    Text,
} from '@chakra-ui/react'
import React, { FormEvent } from 'react'
import { useCallback } from 'react'
import {
    ALL_FEATURE_TOGGLES,
    FeatureToggleKey,
    FEATURE_TOGGLE_NAME,
} from '../../util/features'

type OptionsProps = {
    options: Record<FeatureToggleKey, boolean>
    setOptions: (
        value:
            | Record<FeatureToggleKey, boolean>
            | ((
                val: Record<FeatureToggleKey, boolean>
            ) => Record<FeatureToggleKey, boolean>)
    ) => void
}

const Options: React.FC<OptionsProps> = ({ options, setOptions }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    // TODO: handle this better
    const handleValueChange = useCallback(
        (featureKey: FeatureToggleKey) => (event: FormEvent<HTMLInputElement>) => {
            setOptions({
                ...options,
                [featureKey]: event.currentTarget.checked,
            })
        },
        [options, setOptions]
    )

    if (ALL_FEATURE_TOGGLES.length === 0) {
        return null
    }

    return (
        <>
            <Button variant="outline" onClick={onOpen}>
                Options
            </Button>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Options</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {ALL_FEATURE_TOGGLES.length === 0 && (
                            <Text as="i">Aucune option disponible</Text>
                        )}
                        {ALL_FEATURE_TOGGLES.map((key) => {
                            return (
                                <Checkbox
                                    key={key}
                                    onChange={handleValueChange(key)}
                                    defaultChecked={options[key]}
                                >
                                    {FEATURE_TOGGLE_NAME[key]}
                                </Checkbox>
                            )
                        })}
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" onClick={onClose}>
                            Fait
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default Options