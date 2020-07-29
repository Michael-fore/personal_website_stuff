
import React from 'react';


export default function Iframe(props) {



    return (
        <iframe width={props.h}height={props.h}src={props.src} 
        frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen="true">

        </iframe>
    )
}