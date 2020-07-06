import React from 'react';
const BeamLineCanvas = (props) => {
    return (
        // <div
        //     style={
        //         {
        //             position: 'relative',
        //             width: props.width,
        //             height: props.height,
        //             border: props.debugBorder ? '3px solid #73AD21' : undefined,
        //             top: 0,
        //             left: 0,
        //         }
        //     }
        // >
        //     {props.children}
        // </div>
        <svg 
        height={props.height}
        width={props.width}
        >
            {props.children}
            </svg>
    )
}
export default BeamLineCanvas