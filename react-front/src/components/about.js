import React from 'react';
import '../App.css';
import { Stack} from "@chakra-ui/core";
import Card from './card';


function About (){

    return(
    
        <Stack>
        <Card  title='College'>
            I attended the University of Houston, majored in Politcal Science with a
            focus on political theory,  with a minor in Economics. 


            During my Sophmore, Junior, and Senior year in college I worked at a 
            machine shop and learned to machine oil fields parts. This was the inspiration for the
            DIY cnc mill project.

            Throughout highschool and college I have been coding in Python and Arduino C.
        </Card>
        <Card title = 'test'>
            I am intesrested in Deep Learning, Music, IoT, Cloud Computing,
        </Card>
   
        <Card title = 'test'> Hello Wrol</Card>
        </Stack>
       
    )
}

export default About