import { Button, ButtonGroup } from '@chakra-ui/react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from '@chakra-ui/react'
import { useDisclosure } from '@chakra-ui/react'

export enum WhoParent { father, mother }
export interface LLprops { genderPerson: WhoParent }


function ButtonLL({ genderPerson }: LLprops) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <>
            <Button onClick={onOpen}>Ask your {genderPerson === WhoParent.father ? "father" : "mother"}</Button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Answer of your {genderPerson === WhoParent.father ? "father" : "mother"} :</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        Ask your {genderPerson === WhoParent.father ? "mother" : "father"}!!!
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={onClose}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}
export default ButtonLL