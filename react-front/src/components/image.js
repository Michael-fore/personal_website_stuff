import React from 'react'
import { Image,
    Tabs, TabList, TabPanels, Tab, TabPanel, Divider
} from "@chakra-ui/core"
import pic from './pic.jpeg'
import f1 from './f1.svg'
import f2 from './f2.svg'
import About from './about'
import Project from './projects'
import Work from './work'
import '../App.css'
import Canvas from './canvas'

const img = () =>{
        return(
        <div>
            <Image
            src={pic}
            alt='Michael in a tree.'
            size='150px'
            rounded='full'
            />
        </div>)
}


export default function Img(){

    const MenuItems = React.forwardRef((props, ref)=>{

        return(
        <Tab 
        className='MenuItem'
        ref={ref} 
        isSelected={props.isSelected} 
        {...props}
        orientation='vertical'
        _selected={{
                    border:'black'}}>

        {props.isSelected ? <Image src={f1}
                                    h='5'
                                    w='5'/>: 
                            <Image src={f2}
                                    h='5'
                                    w='5'/>}
        {props.children}
        </Tab>)
    })

    return(
    <div className='SideImage' hei>
        {img()}
        <Tabs   variantColor='lightblue' 
                orientation='vertical'
                align='start'
                 >
        <div className='SideBar'>           
            <TabList w='150px'>
                <MenuItems>Projects</MenuItems>
                <MenuItems>Work</MenuItems>
                <MenuItems>About</MenuItems>
                <MenuItems>Contact</MenuItems>
                <MenuItems>Try Me!</MenuItems>     
            </TabList>
            <Divider p={1}
            orientation='vertical'/>
            <TabPanels>
                <TabPanel>
                    <Project/>
                </TabPanel>
                <TabPanel>
                    <Work/>
                </TabPanel>
                <TabPanel>
                    <About/>
                </TabPanel>
                <TabPanel>
                    <p>four!</p>
                </TabPanel>
                <TabPanel>
                    <Canvas />
                </TabPanel>
            </TabPanels>
            </div>
</Tabs>
</div >
    )
}