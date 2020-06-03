import React, { useRef, useEffect } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import TextInput from '../BaseComponents/TextInput';
import TextUpdateAH from './TextUpdateAH';
import TextUpdate from '../BaseComponents/TextUpdate';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import Checkbox from '@material-ui/core/Checkbox';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import grey from '@material-ui/core/colors/grey';

import ListItemIcon from '@material-ui/core/ListItemIcon';
import Typography from '@material-ui/core/Typography';
import DoneAllIcon from '@material-ui/icons/DoneAll';

import Tooltip from '@material-ui/core/Tooltip';

// Styles
const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        overflowY: 'auto',
    },
    disabled: {
        backgroundColor: 'grey',
        color: grey['400'],
        fontWeight: 'bold',
    },
    TextFieldSeverityDisabled: {
        borderRadius: 2,
        padding: 1,
        backgroundColor: 'grey',
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

}));

const AlarmTable = props => {

    // console.log("AlarmTable rendered")

    const classes = useStyles();
    const myRef = useRef()

    useEffect(() => {
        myRef.current.scrollTo(0, 0)
    }, [props.areaSelectedIndex])

    const { areaSelectedIndex } = props;
    const { areaAlarms } = props;

    const isTopArea = !areaSelectedIndex.includes("=")
    let currSubArea = ""
    let newSubArea = false
    let currTopArea = ""
    let newTopArea = false

    const textFieldClasses = {
        TextFieldSeverity0: classes.TextFieldSeverityDisabled,
    };

    const textFieldWarnClasses = {
        TextFieldSeverity1: classes.minorAlarmWarn,
        TextFieldSeverity2: classes.majorAlarmWarn
    }

    return (
        <TableContainer component={Paper} style={{ height: props.height }} ref={myRef}>
            <Table aria-label="Alarm Table" stickyHeader size="small">
                <TableHead>
                    <TableRow
                        onClick={(event) => {
                            event.preventDefault()
                            event.stopPropagation()
                        }}
                    >
                        {props.debug
                            ? <TableCell>TEST ALM</TableCell>
                            : null}
                        <TableCell>PV NAME</TableCell>
                        <TableCell>PV VALUE</TableCell>
                        <TableCell align="center">ALM STATUS</TableCell>
                        <TableCell align="left" >LAST ALM VAL</TableCell>
                        <TableCell align="left" >LAST ALM TIME</TableCell>
                        <TableCell align="left" >LAST ALM ACK TIME</TableCell>
                        <TableCell align="center" >ENBL</TableCell>
                        <TableCell align="center" >LAT</TableCell>
                        <TableCell align="center" >NTFY</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {Object.keys(areaAlarms).map((areaAlarmName, areaAlarmIndex) => {
                        // console.log(areaAlarms[areaAlarmName]["name"], areaAlarms[areaAlarmName]["enable"])
                        // areaSelectedIndex is area | area=subArea
                        // areaAlarmName is area | area=subArea | area=subArea | area=subArea=pvd+
                        let areaKey = areaAlarmName.replace(/=pv\d+/, "")   // areaKey is area | area=subArea
                        if (isTopArea) {                                    // areaSelectedIndex is area
                            areaKey = areaKey.split('=')[0]                 // areaKey is area
                        }
                        if (areaKey == areaSelectedIndex || areaSelectedIndex === 'ALLAREAS') {
                            // console.log('pva://' + "alarmIOC:" + areaAlarms[areaAlarmName]["name"] + "V")
                            const areaAlarmNameArray = areaAlarmName.split('=')
                            let areaName = null
                            let alarm = null
                            if (areaAlarmNameArray.length > 2) {
                                areaName = areaAlarmNameArray[0] + "=" + areaAlarmNameArray[1]
                                alarm = areaAlarmNameArray[2]
                                newTopArea = false
                                newSubArea = currSubArea !== areaName
                                currSubArea = areaName
                            }
                            else {
                                areaName = areaAlarmNameArray[0]
                                alarm = areaAlarmNameArray[1]
                                newSubArea = false
                                newTopArea = currTopArea !== areaName
                                currTopArea = areaName
                            }
                            // console.log(areaName, newSubArea)
                            const visible = areaAlarms[areaAlarmName]["name"].toLowerCase().includes(props.alarmTableSearchString.toLowerCase())
                            return (
                                visible
                                    ? <React.Fragment key={areaAlarmName}>
                                        {newTopArea && props.alarmTableSearchString.length === 0
                                            ? <TableRow>
                                                <TableCell
                                                    align="left"
                                                    style={{
                                                        paddingTop: 20,
                                                        fontWeight: 'bold',
                                                        borderBottom: 'outset'
                                                    }}
                                                >
                                                    {`${areaName.split('=')[0]}`}
                                                </TableCell>
                                                <TableCell style={{ borderBottom: 'outset' }}></TableCell>
                                                <TableCell style={{ borderBottom: 'outset' }}></TableCell>
                                                <TableCell style={{ borderBottom: 'outset' }}></TableCell>
                                                <TableCell style={{ borderBottom: 'outset' }}></TableCell>
                                                <TableCell style={{ borderBottom: 'outset' }}></TableCell>
                                                <TableCell style={{ borderBottom: 'outset' }}></TableCell>
                                                <TableCell style={{ borderBottom: 'outset' }}></TableCell>
                                                <TableCell style={{ borderBottom: 'outset' }}></TableCell>
                                                {props.debug
                                                    ? <TableCell style={{ borderBottom: 'outset' }}></TableCell>
                                                    : null}
                                            </TableRow>
                                            : null}
                                        {isTopArea && newSubArea && props.alarmTableSearchString.length === 0
                                            ? <TableRow
                                                onClick={(event) => {
                                                    event.preventDefault()
                                                    event.stopPropagation()
                                                }}
                                            >
                                                <TableCell
                                                    align="left"
                                                    style={{
                                                        paddingTop: 20,
                                                        fontWeight: 'bold',
                                                        borderBottom: 'outset'
                                                    }}
                                                >
                                                    {`${areaName.split('=')[0]} > ${areaName.split('=')[1]}`}
                                                </TableCell>
                                                <TableCell style={{ borderBottom: 'outset' }}></TableCell>
                                                <TableCell style={{ borderBottom: 'outset' }}></TableCell>
                                                <TableCell style={{ borderBottom: 'outset' }}></TableCell>
                                                <TableCell style={{ borderBottom: 'outset' }}></TableCell>
                                                <TableCell style={{ borderBottom: 'outset' }}></TableCell>
                                                <TableCell style={{ borderBottom: 'outset' }}></TableCell>
                                                <TableCell style={{ borderBottom: 'outset' }}></TableCell>
                                                <TableCell style={{ borderBottom: 'outset' }}></TableCell>
                                                {props.debug
                                                    ? <TableCell style={{ borderBottom: 'outset' }}></TableCell>
                                                    : null}
                                            </TableRow>
                                            : null}
                                        <TableRow
                                            // key={areaAlarmName}
                                            hover={props.areaEnabled[areaName] && props.enableAllAreas}
                                            onContextMenu={event => props.tableItemRightClick(event, areaAlarmName)}
                                            selected={props.alarmRowSelected[areaAlarmName]}
                                            onClick={event => props.tableRowClick(event, `${areaName}*${areaAlarms[areaAlarmName]["name"]}`)}
                                        >
                                            <Menu
                                                keepMounted
                                                open={props.alarmContextOpen[areaAlarmName]}
                                                onClose={event => props.alarmContextClose(event, areaAlarmName)}
                                                anchorReference="anchorPosition"
                                                anchorPosition={props.contextMouseY !== null && props.contextMouseX !== null ?
                                                    { top: props.contextMouseY, left: props.contextMouseX } : null}
                                            >
                                                <MenuItem
                                                    onClick={event => props.alarmAcknowledge(event, areaAlarmName)}
                                                >
                                                    <ListItemIcon >
                                                        <DoneAllIcon fontSize="small" />
                                                    </ListItemIcon>
                                                    <Typography variant="inherit">Acknowledge Alarm</Typography>

                                                </MenuItem>

                                            </Menu>
                                            {props.debug
                                                ? <TableCell>
                                                    <TextInput
                                                        pv={'pva://' + areaAlarms[areaAlarmName]["name"]}
                                                        usePvLabel={true}
                                                        usePvPrecision={true}
                                                        usePvUnits={true}
                                                        usePvMinMax={true}
                                                        alarmSensitive={true}
                                                        disableContextMenu={true}
                                                    />
                                                </TableCell>
                                                : null}
                                            <Tooltip
                                                // title={props.pvDescDict[areaAlarms[areaAlarmName]["name"]]}
                                                title={
                                                    <React.Fragment>
                                                        <Typography color="inherit">{areaAlarms[areaAlarmName]["name"]}</Typography>
                                                        <p>
                                                            <b>Description: </b> {props.alarmPVDict[areaAlarms[areaAlarmName]["name"]][1]}<br />
                                                            <b>Host: </b> {props.alarmPVDict[areaAlarms[areaAlarmName]["name"]][2]}<br />
                                                        </p>
                                                    </React.Fragment>
                                                }
                                                enterDelay={400}
                                            >
                                                <TableCell align="left">
                                                    <TextUpdate
                                                        pv={'pva://' + areaAlarms[areaAlarmName]["name"] + ".NAME"}
                                                        disableContextMenu={true}
                                                    />
                                                </TableCell>
                                            </Tooltip>
                                            <TableCell align="left">
                                                <TextUpdate
                                                    pv={'pva://' + areaAlarms[areaAlarmName]["name"]}
                                                    disableContextMenu={true}
                                                    useStringValue={true}
                                                    usePvUnits={true}
                                                    usePvPrecision={true}
                                                    alarmSensitive={true}
                                                    classes={textFieldWarnClasses}
                                                />
                                            </TableCell>
                                            <TableCell align="center">
                                                {props.enableAllAreas && props.areaEnabled[areaName] && areaAlarms[areaAlarmName]["enable"]
                                                    ?
                                                    <TextUpdateAH
                                                        pv={'pva://' + "alarmIOC:" + areaAlarms[areaAlarmName]["name"] + "A"}
                                                        useStringValue={true}
                                                        alarmSensitive={true}
                                                        disableContextMenu={true}
                                                    />
                                                    :
                                                    <TextUpdate
                                                        pv={'pva://' + "alarmIOC:" + areaAlarms[areaAlarmName]["name"] + "A"}
                                                        useStringValue={true}
                                                        alarmSensitive={true}
                                                        disableContextMenu={true}
                                                        classes={textFieldClasses}
                                                    />
                                                }
                                            </TableCell>

                                            <TableCell align="left">
                                                <TextUpdate
                                                    pv={'pva://' + "alarmIOC:" + areaAlarms[areaAlarmName]["name"] + "V"}
                                                    disableContextMenu={true}
                                                />
                                            </TableCell>
                                            <TableCell align="left">
                                                <TextUpdate
                                                    pv={'pva://' + "alarmIOC:" + areaAlarms[areaAlarmName]["name"] + "T"}
                                                    disableContextMenu={true}
                                                />
                                            </TableCell>
                                            <TableCell align="left">
                                                <TextUpdate
                                                    pv={'pva://' + "alarmIOC:" + areaAlarms[areaAlarmName]["name"] + "K"}
                                                    disableContextMenu={true}
                                                />
                                            </TableCell>
                                            <TableCell align="center">
                                                <Checkbox
                                                    style={{ padding: 0, margin: 0 }}
                                                    disabled={!props.areaEnabled[areaName] || !props.enableAllAreas}
                                                    value={areaAlarms[areaAlarmName]["enable"]}
                                                    color="primary"
                                                    checked={areaAlarms[areaAlarmName]["enable"]}
                                                    onClick={event => props.itemChecked(event, areaName, alarm, "enable", !areaAlarms[areaAlarmName]["enable"])}
                                                />
                                            </TableCell>
                                            <TableCell align="center">
                                                <Checkbox
                                                    style={{ padding: 0, margin: 0 }}
                                                    disabled={!props.areaEnabled[areaName] || !props.enableAllAreas}
                                                    value={areaAlarms[areaAlarmName]["latch"]}
                                                    color="primary"
                                                    checked={areaAlarms[areaAlarmName]["latch"]}
                                                    onClick={event => props.itemChecked(event, areaName, alarm, "latch", !areaAlarms[areaAlarmName]["latch"])}
                                                />
                                            </TableCell>
                                            <TableCell align="center">
                                                <Checkbox
                                                    style={{ padding: 0, margin: 0 }}
                                                    disabled={!props.areaEnabled[areaName] || !props.enableAllAreas}
                                                    value={areaAlarms[areaAlarmName]["notify"]}
                                                    color="primary"
                                                    checked={areaAlarms[areaAlarmName]["notify"]}
                                                    onClick={event => props.itemChecked(event, areaName, alarm, "notify", !areaAlarms[areaAlarmName]["notify"])}
                                                />
                                            </TableCell>
                                        </TableRow>
                                    </React.Fragment>
                                    : null
                            )
                        }
                    })}
                </TableBody>
            </Table>
        </TableContainer >
    )
}

export default React.memo(AlarmTable)