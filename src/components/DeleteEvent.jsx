import { useRef } from "react";
import {
    Button,
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    useDisclosure
} from "@chakra-ui/react";



export const DeleteEvent = ({ onDelete }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = useRef();


    const handleDeleteClick = () => {
        onOpen();
    };

    const handleDeleteConfirm = () => {
        onDelete();
        onClose();
    };

    return (
        <>
            <Button colorScheme="orange" onClick={handleDeleteClick}>Delete Event</Button>

            <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize="lg" fontWeight="bold">
                            Delete Event
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            The event will be deleted, this can`t be undone. Do you want to continue?
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={onClose} colorScheme="orange" variant="outline" >
                                Cancel
                            </Button>
                            <Button onClick={handleDeleteConfirm} ml={3} colorScheme="orange" >
                                Delete
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </>
    )
}