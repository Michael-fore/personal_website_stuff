import React from 'react';
import model from '../img/model.png'
import spindle from '../img/spindle.png'
import Iframe from './iframe'
import {Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Image
  } from "@chakra-ui/core";

  export default function Mill(){
const { isOpen, onOpen, onClose } = useDisclosure();

    
    return(
<div>
    <Button onClick={onOpen}>Read More</Button>
        <Modal isOpen={isOpen} onClose={onClose} size="full">
            <ModalOverlay/>
            <ModalContent  >
            <ModalHeader>Model "E"</ModalHeader>
            <ModalCloseButton />
            <ModalBody h="100%" >
                <Image src={model}></Image>

                <Image src={spindle}></Image>

                <Iframe 
                w="720px"
                h="520px"
                src="https://www.youtube.com/embed/6ybLaYVqJmk"> </Iframe>
            </ModalBody>

            <ModalFooter>
                <Button variantColor="blue" mr={3} onClick={onClose}>
                    Close
                </Button>
            </ModalFooter>
        </ModalContent>
    </Modal>
</div>
    )
  }