import React from 'react';
import { Box, Text, Heading, Image
} from "@chakra-ui/core";

export default function Card (props){

    return(
        <Box  w="100%" p={5} shadow="md" borderWidth="1px">
        <Heading>{props.title}</Heading>
        <Image src={props.src} w={props.imw} h={props.imh}/>
        <Text>
            {props.children}
        </Text> 
        </Box>
    )
}