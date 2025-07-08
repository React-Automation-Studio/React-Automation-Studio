import React, { useState } from 'react';

import { Typography, useTheme } from '@mui/material';

import PV from '../SystemComponents/PV';

const LivePVVal = (props) => {

    const theme = useTheme()

    const [displayValue, setDisplayValue] = useState("")
    const [units, setUnits] = useState("")
    const [pv, setPv] = useState({ initialized: false })

    const pvConnection = <PV
        pv={props.pv}
        pvData={setPv}
    />

    const { initialized, value, enum_strs, severity, metadata } = pv

    if (initialized) {
        if (enum_strs) {
            if (enum_strs.length > 0) {
                if (enum_strs[value] !== displayValue) {
                    setDisplayValue(enum_strs[value])
                }
            }
        }
        else if (value !== displayValue) {
            setDisplayValue(value)
        }
        if (metadata.units) {
            if (metadata.units !== units) {
                setUnits(metadata.units)
            }
        }
    }


    const getAlarmStyle = () => {
        const baseStyle = {
            background: 'transparent',
            borderRadius: 2,
            padding: 1,
            borderStyle: "solid",
            borderWidth: "thin",
        }

        if (!initialized) {
            return {
                ...baseStyle,
                borderColor: theme.palette.mode === 'dark' ? theme.palette.grey[500] : theme.palette.grey[400],
                color: theme.palette.mode === 'dark' ? theme.palette.grey[500] : theme.palette.grey[400],
            }
        }
        else if (severity === 1) {
            return {
                ...baseStyle,
                borderColor: theme.palette.alarm.minor.main
            }
        }
        else if (severity === 2) {
            return {
                ...baseStyle,
                borderColor: theme.palette.alarm.major.main
            }
        }
        else {
            return {
                ...baseStyle,
                borderColor: 'rgba(0,0,0,0)'
            }
        }
    }

    const disconnectedStyle = {
        background: 'transparent',
        borderRadius: 2,
        padding: 1,
        borderStyle: "solid",
        borderWidth: "thin",
        borderColor: theme.palette.mode === 'dark' ? theme.palette.grey[500] : theme.palette.grey[400],
        color: theme.palette.mode === 'dark' ? theme.palette.grey[500] : theme.palette.grey[400],
    }


    const content = displayValue !== ""
        ? <Typography sx={getAlarmStyle()}>{`${displayValue} ${units}`}</Typography>
        : <Typography sx={disconnectedStyle}>-</Typography>

    return (
        <React.Fragment>
            {pvConnection}
            {content}
        </React.Fragment>

    );
};

export default LivePVVal;