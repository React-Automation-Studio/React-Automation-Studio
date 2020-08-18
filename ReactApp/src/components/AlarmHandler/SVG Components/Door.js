import React from 'react';
import { withTheme } from '@material-ui/core/styles';



const Door = (props) => {

    const darkTheme = props.theme.palette.type === 'dark'

    let rotate = null
    if (!props.rotate) {
        rotate = 0
    }
    else {
        rotate = props.rotate
    }

    return (
        // <Button className={classes.containerButton}>

        <g
            id='layer1'
            fill='none'
            onClick={() => props.clicked(props.id, props.open)}
            style={{ pointerEvents: 'bounding-box' }}
            width='100%'
            transform={`translate(${props.dx},${props.dy}) rotate(${rotate},20,20)`}
        >
            <path
                id='path3729'
                fill='none'
                fillOpacity='1'
                stroke={darkTheme ? '#FFF' : '#000'}
                strokeDasharray='none'
                strokeLinecap='butt'
                strokeLinejoin='miter'
                strokeMiterlimit='4'
                strokeOpacity='1'
                strokeWidth='2'
                d='M0 24.432h9.319'
            ></path>
            <path
                id='doorOpen'
                fill='none'
                stroke='#c62828'
                strokeDasharray='none'
                strokeLinecap='butt'
                strokeLinejoin='miter'
                strokeMiterlimit='4'
                strokeOpacity='1'
                strokeWidth='2'
                d='M9.119 24.932V.049'
                style={{ visibility: props.open ? 'visible' : 'hidden' }}
            ></path>
            <path
                id='doorSwing'
                fill='none'
                stroke='#c62828'
                strokeDasharray='none'
                strokeLinecap='butt'
                strokeLinejoin='miter'
                strokeMiterlimit='4'
                strokeOpacity='1'
                strokeWidth='1.001'
                d='M9.119.515C30.095 2.27 32.373 13.223 33.198 24.96'
                style={{ visibility: props.open ? 'visible' : 'hidden' }}
            ></path>
            <path
                id='path3729-7'
                fill='none'
                stroke={darkTheme ? '#FFF' : '#000'}
                strokeDasharray='none'
                strokeLinecap='butt'
                strokeLinejoin='miter'
                strokeMiterlimit='4'
                strokeOpacity='1'
                strokeWidth='2'
                d='M33.099 24.432h9.318'
            ></path>
            <path
                id='doorClosed'
                fill='none'
                stroke='#2e7d32'
                strokeDasharray='none'
                strokeLinecap='butt'
                strokeLinejoin='miter'
                strokeMiterlimit='4'
                strokeOpacity='1'
                strokeWidth='2'
                d='M33.51 24.441H8.628'
                style={{ visibility: !props.open ? 'visible' : 'hidden' }}
            ></path>
            <text
                xmlSpace='preserve'
                style={{ lineHeight: "1.25" }}
                id='text877'
                x='15.545'
                y='38.458'
                fill={darkTheme ? '#FFF' : '#000'}
                fillOpacity='1'
                stroke='none'
                strokeWidth='0.265'
                // fontFamily='sans-serif'
                fontSize='16.933'
                fontStyle='normal'
                fontWeight='normal'
                letterSpacing='0'
                wordSpacing='0'
                style={{ fontFamily: 'Roboto', }}
            >
                <tspan id='tspan875' x='0' y='45.458' strokeWidth='0.265'>
                    {`${props.id}`}
                </tspan>
            </text>
        </g>


        // </Button>

    );
};

export default withTheme(Door);