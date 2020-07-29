import React from 'react'
import { Image,
    Tabs, TabList, TabPanels, Tab, TabPanel, Divider
} from "@chakra-ui/core"
import pic from './img/pic.jpeg'
import f1 from './img/f1.svg'
import f2 from './img/f2.svg'
import About from './about'
import Project from './projects'
import Work from './work'
import '../App.css'
import Canvas from './canvas'
import twitter from './img/twitter.svg'
import linkedin from './img/linkedin.svg'
import { SocialIcon } from 'react-social-icons';
const img = () =>{
        return(
        <div><div>
                <Image
                src={pic}
                alt='Michael in a tree.'
                size='150px'
                rounded='full'
                />
                <SocialIcon url="https://linkedin.com/in/michael-fore-11a46a58" bgColor="#FFFFFF" fgColor="#000000"
                style={{ height: 45, width: 45 }}></SocialIcon>
                <SocialIcon url="https://twitter.com/Wolfman_Brother" bgColor="#FFFFFF" fgColor="#000000"
                style={{ height: 45, width: 45 }}></SocialIcon>
                <SocialIcon url="https://github.com/settings/profile" bgColor="#FFFFFF" fgColor="#000000"
                style={{ height: 45, width: 45 }}></SocialIcon>
                <SocialIcon url="https://www.youtube.com/channel/UChQ6L346aWExIiN5-NZp3lQ" bgColor="#FFFFFF" fgColor="#000000"
                style={{ height: 45, width: 45 }}></SocialIcon>
        </div><div>

        </div></div>)
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
    <div className='SideImage'>
        {img()}
        <Tabs   variantColor='lightblue' 
                orientation='vertical'
                align='start'
                className='SideBar'>
        <div >           
            <TabList w='150px'>
                <MenuItems w='150px'>Projects</MenuItems>
                <MenuItems w='150px'>Work</MenuItems>
                <MenuItems w='150px'>About</MenuItems>
                <MenuItems w='150px'>Contact</MenuItems>
                <MenuItems w='150px'>Try Me!</MenuItems>     
            </TabList>
            <Divider p={1}
            orientation='vertical'/>
            </div>
            <div className="tabPanels">
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