import React, { useState } from 'react';

import makeStyles from '@mui/styles/makeStyles';
import { Typography } from '@mui/material';

import PV from '../SystemComponents/PV';

// Styles
const useStyles = makeStyles(theme => ({
    disconAlarmWarn: {
        background: 'transparent',
        borderRadius: 2,
        padding: 1,
        borderStyle: "solid",
        borderWidth: "thin",
        borderColor: theme.palette.mode === 'dark' ? theme.palette.grey[500] : theme.palette.grey[400],
        color: theme.palette.mode === 'dark' ? theme.palette.grey[500] : theme.palette.grey[400],
    },
    majorAlarmWarn: {
        background: 'transparent',
        borderRadius: 2,
        padding: 1,
        borderStyle: "solid",
        borderWidth: "thin",
        borderColor: theme.palette.alarm.major.main
    },
    minorAlarmWarn: {
        background: 'transparent',
        borderRadius: 2,
        padding: 1,
        borderStyle: "solid",
        borderWidth: "thin",
        borderColor: theme.palette.alarm.minor.main
    },
    noAlarm: {
        background: 'transparent',
        borderRadius: 2,
        padding: 1,
        borderStyle: "solid",
        borderWidth: "thin",
        borderColor: 'rgba(0,0,0,0)'
    },
}))


const LivePVVal = (props) => {

    const classes = useStyles()

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


    let dispClassName = null
    if (!initialized) {
        dispClassName = classes.disconAlarmWarn
    }
    else if (severity === 1) {
        dispClassName = classes.minorAlarmWarn
    }
    else if (severity === 2) {
        dispClassName = classes.majorAlarmWarn
    }
    else {
        dispClassName = classes.noAlarm
    }


    const content = displayValue !== ""
        ? <Typography className={dispClassName}>{`${displayValue} ${units}`}</Typography>
        : <Typography className={classes.disconAlarmWarn}>-</Typography>

    return (
        <React.Fragment>
            {pvConnection}
            {content}
        </React.Fragment>

    );
};

export default LivePVVal;