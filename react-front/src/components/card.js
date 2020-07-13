import React from 'react';
import { Box, Text, Heading
} from "@chakra-ui/core";

export default function Card (props){

    return(
        <Box  p={5} shadow="md" borderWidth="1px">
        <Heading>{props.title}</Heading>
        <Text>
            {props.children}
        </Text> 
        </Box>
    )
}