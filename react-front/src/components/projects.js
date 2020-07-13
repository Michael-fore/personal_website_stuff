import React from 'react'
import Card from './card'
import { Grid, Button} from "@chakra-ui/core";

export default function Project(){

return(
    <Grid templateColumns="repeat(2, 1fr)" gap={3}>
        <Card title='DIY CNC Mill'>
            <Button> Here</Button>
        </Card>

        <Card title='Machine Learning'>
            Stuff
        </Card>
    </Grid>

)
}