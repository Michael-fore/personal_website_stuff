import React from 'react'
import Card from './card'
import { Grid, Image} from "@chakra-ui/core";
import Mill from './projects/eg';
import model from './img/model.png'
export default function Project(){

return(
    <Grid templateColumns="repeat(3, 1fr)" gap={3} w="100%">
        <Card title='DIY CNC Mill' src={model} imh="250px" >
            
            <Mill></Mill>
        </Card>

        <Card title='Machine Learning'>
            Stuff
        </Card>

        <Card title='Building Generator'>
            Stuff
        </Card>

        <Card title='Flexible Data Collection Platform'>
            Stuff
        </Card>
    </Grid>

)
}