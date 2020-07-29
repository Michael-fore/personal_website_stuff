import React, {useRef, useEffect, useState} from 'react'
import pic from './img/10_lg.jpg' 
import axios from 'axios'
import Table from './table'
import {Box,
        Badge
        } from "@chakra-ui/core";

//TODO
//Fix curson desync on large rphotos, canvas rerence prolly isn'y working
//Add other models to use

export default function Canvas(props){

    //Ref elements can preserve any type of information we need
    const inputRef = useRef(null)
    const canvasRef = useRef(null)
    const contextRef = useRef(null) //read about useRef

    const [isDrawing,setIsDrawing] = useState(false)
    const [Img,setImg] = useState(pic)
    const [newImage, setnewImage] = useState(true)

    const [confidence,setConfidence] = useState(null)
    const [categories,setCategory] = useState(null)


    useEffect(() => {
        const canvas = canvasRef.current //why current, what is this?

        canvas.width = window.innerWidth * 2
        canvas.height = window.innerHeight * 2
        //canvas.style.width = `${window.innerWidth}px`
        //canvas.style.height = `${window.innerHeight}px`

        const context = canvas.getContext("2d")
        context.scale(2,2)
        
        
        context.lineCap = "round"
        contextRef.current = context


    },[])

    const beginDraw = ({nativeEvent}) => {
        const {offsetX,offsetY} = nativeEvent
        contextRef.current.beginPath()
        contextRef.current.moveTo(offsetX,offsetY)
        setIsDrawing(true)
    }

    const endDraw = () => {
        contextRef.current.closePath()
        setIsDrawing(false)

    }

    const draw= ({nativeEvent}) => {
        if(!isDrawing){
            return  //This just kicks us out of the function on condition so we aren't nesting
        }

        const {offsetX, offsetY} = nativeEvent
        contextRef.current.lineTo(offsetX,offsetY)
        contextRef.current.stroke()
    
    }

    const uploadImage = (event) => {
        //const canvas = canvasRef.current 
        const reader = new FileReader()
        reader.readAsDataURL(event.target.files[0])  

        reader.onload = () =>{
            
            console.log(reader.result)              
            setImg(reader.result)
            setnewImage(true)    
           
        }
        reader.onerror = () => {
            console.log(reader.error)
        }
        
    }
    
    const loadImage = () =>{
        const canvas = canvasRef.current
        const context = canvas.getContext("2d")
        const image = new Image()
        image.src = Img
        image.onload = () => {
            context.clearRect(0, 0, canvas.width, canvas.height)
            
            canvas.width = image.width
            canvas.height = image.height 
            
            context.drawImage(image, 0,0) 
            console.log(image.width)
            console.log(image.height)
            contextRef.current = context
        }
    }

    const updateCanvasSize = () =>{
        const canvas = canvasRef.current
        console.log(canvas)
        //.width = canvas.style.width
        //canvas.height = canvas.style.height
    }


    useEffect(() => {
        if (newImage){
            loadImage()
            setnewImage(false)
            updateCanvasSize()
        }

    })

    async function sendImage (){
        const canvas = canvasRef.current
        const context = canvas.getContext("2d")
        
        
        await axios.post('http://76.249.134.69:5000/analyze',
        {color:"red",
         image:canvas.toDataURL()},
         )
        .then(resp =>{
            setCategory(resp.data.categories)
            setConfidence(resp.data.confidence)
        })
        };

    function bufferToBase64(buf) {
        var binstr = Array.prototype.map.call(buf, function (ch) {
            return String.fromCharCode(ch);
        }).join('');
        return btoa(binstr);
    }    

    const sliderValue = (event) => {
        const canvas = canvasRef.current
        const context = canvas.getContext("2d")
        context.lineWidth = event.target.value  
    }

    const colorPicker = (event) => {
        const canvas = canvasRef.current
        const context = canvas.getContext("2d")
        context.strokeStyle = event.target.value
    }

    return(
        <div >
            <div>
                    <button class="button" onClick = {() => {inputRef.current.click()}}> Upload Your Own Image</button>

                    <input type='File' onChange={uploadImage}
                    style={{display:'none'}}
                    ref = {inputRef}></input> 

                    <button class="button" onClick = {sendImage}> Analyze Image</button>
                                 
               
                <button class="button"  onClick = {loadImage}> Reset Image</button>
            </div>
            <div className='canvasGrid'>
            <canvas 
                onMouseDown = {beginDraw}
                onMouseUp = {endDraw}
                onMouseMove = {draw}
                ref = {canvasRef}></canvas>

                <div className='colorGrid'>       
                    <Box>
                    <Badge variant="outline">Brush Size</Badge>
                    <div class="slidecontainer">
                        <input type="range" 
                        min="1" max="100" 
                        step = "1" class="slider" 
                        id="myRange"
                        onChange={sliderValue}></input>
                    </div>
                </Box>   
                <Box><div className='colorGrid'> 
                    <Badge variant="outline">Brush Color</Badge>                    
                    <input type="color" 
                    name="Brush Color"
                    onChange = {colorPicker}
                    value="#00000"
                    className='colorPicker'></input> 
                    </div>  
                </Box>
                <Table categories = {categories} confidence = {confidence}></Table>
                </div>
                            
                
            </div>
        </div>
    )
}