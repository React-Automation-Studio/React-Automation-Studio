import React from 'react';

import { alpha } from '@mui/material/styles';
import makeStyles from '@mui/styles/makeStyles';
import Grid from '@mui/material/Grid';

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';


import ListItemIcon from '@mui/material/ListItemIcon';
import Typography from '@mui/material/Typography';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import NotificationsOffIcon from '@mui/icons-material/NotificationsOff';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import AddIcon from '@mui/icons-material/Add';
import PlaylistAddOutlinedIcon from '@mui/icons-material/PlaylistAddOutlined';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

// Styles
const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        overflowY: 'auto',
        maxHeight: '90vh',
    },
    nested: {
        paddingLeft: theme.spacing(4),
    },
    majorAlarm: props => ({
        background: props.fadeList
            ? 'linear-gradient(45deg,' + alpha(theme.palette.alarm.major.main, theme.palette.mode === 'dark' ? 0.2 : 0.1) + ' 0%, ' + (theme.palette.alarm.major.main) + ' 100%)'
            : theme.palette.alarm.major.main,
        '&:hover': {
            background: props.fadeList
                ? 'linear-gradient(45deg,' + alpha(theme.palette.alarm.major.light, theme.palette.mode === 'dark' ? 0.2 : 0.1) + ' 0%, ' + (theme.palette.alarm.major.light) + ' 100%)'
                : theme.palette.alarm.major.light,
        },
        "&.Mui-selected": {
            background: props.fadeList
                ? 'linear-gradient(45deg,' + alpha(theme.palette.alarm.major.light, theme.palette.mode === 'dark' ? 0.2 : 0.1) + ' 0%, ' + (theme.palette.alarm.major.light) + ' 100%)'
                : theme.palette.alarm.major.light,
            borderStyle: "solid",
            borderWidth: "thin",
            borderColor: theme.palette.primary.main,
            '&:hover': {
                background: props.fadeList
                    ? 'linear-gradient(45deg,' + alpha(theme.palette.alarm.major.dark, theme.palette.mode === 'dark' ? 0.2 : 0.1) + ' 0%, ' + (theme.palette.alarm.major.dark) + ' 100%)'
                    : theme.palette.alarm.major.dark,
            },
        }
    }),
    majorAlarmAcked: props => ({
        background: props.fadeList
            ? 'linear-gradient(45deg,' + alpha(theme.palette.alarm.majorAcked.main, theme.palette.mode === 'dark' ? 0.2 : 0.1) + ' 0%, ' + (theme.palette.alarm.majorAcked.main) + ' 100%)'
            : theme.palette.alarm.majorAcked.main,
        '&:hover': {
            background: props.fadeList
                ? 'linear-gradient(45deg,' + alpha(theme.palette.alarm.majorAcked.light, theme.palette.mode === 'dark' ? 0.2 : 0.1) + ' 0%, ' + (theme.palette.alarm.majorAcked.light) + ' 100%)'
                : theme.palette.alarm.majorAcked.light,
        },
        "&.Mui-selected": {
            background: props.fadeList
                ? 'linear-gradient(45deg,' + alpha(theme.palette.alarm.majorAcked.light, theme.palette.mode === 'dark' ? 0.2 : 0.1) + ' 0%, ' + (theme.palette.alarm.majorAcked.light) + ' 100%)'
                : theme.palette.alarm.majorAcked.light,
            borderStyle: "solid",
            borderWidth: "thin",
            borderColor: theme.palette.primary.main,
            '&:hover': {
                background: props.fadeList
                    ? 'linear-gradient(45deg,' + alpha(theme.palette.alarm.majorAcked.dark, theme.palette.mode === 'dark' ? 0.2 : 0.1) + ' 0%, ' + (theme.palette.alarm.majorAcked.dark) + ' 100%)'
                    : theme.palette.alarm.majorAcked.dark,
            },
        }
    }),
    minorAlarm: props => ({
        background: props.fadeList
            ? 'linear-gradient(45deg,' + alpha(theme.palette.alarm.minor.main, theme.palette.mode === 'dark' ? 0.2 : 0.1) + ' 0%, ' + (theme.palette.alarm.minor.main) + ' 100%)'
            : theme.palette.alarm.minor.main,
        '&:hover': {
            background: props.fadeList
                ? 'linear-gradient(45deg,' + alpha(theme.palette.alarm.minor.light, theme.palette.mode === 'dark' ? 0.2 : 0.1) + ' 0%, ' + (theme.palette.alarm.minor.light) + ' 100%)'
                : theme.palette.alarm.minor.light,
        },
        "&.Mui-selected": {
            background: props.fadeList
                ? 'linear-gradient(45deg,' + alpha(theme.palette.alarm.minor.light, theme.palette.mode === 'dark' ? 0.2 : 0.1) + ' 0%, ' + (theme.palette.alarm.minor.light) + ' 100%)'
                : theme.palette.alarm.minor.light,
            borderStyle: "solid",
            borderWidth: "thin",
            borderColor: theme.palette.primary.main,
            '&:hover': {
                background: props.fadeList
                    ? 'linear-gradient(45deg,' + alpha(theme.palette.alarm.minor.dark, theme.palette.mode === 'dark' ? 0.2 : 0.1) + ' 0%, ' + (theme.palette.alarm.minor.dark) + ' 100%)'
                    : theme.palette.alarm.minor.dark,
            },
        }
    }),
    minorAlarmAcked: props => ({
        background: props.fadeList
            ? 'linear-gradient(45deg,' + alpha(theme.palette.alarm.minorAcked.main, theme.palette.mode === 'dark' ? 0.2 : 0.1) + ' 0%, ' + (theme.palette.alarm.minorAcked.main) + ' 100%)'
            : theme.palette.alarm.minorAcked.main,
        '&:hover': {
            background: props.fadeList
                ? 'linear-gradient(45deg,' + alpha(theme.palette.alarm.minorAcked.light, theme.palette.mode === 'dark' ? 0.2 : 0.1) + ' 0%, ' + (theme.palette.alarm.minorAcked.light) + ' 100%)'
                : theme.palette.alarm.minorAcked.light,
        },
        "&.Mui-selected": {
            background: props.fadeList
                ? 'linear-gradient(45deg,' + alpha(theme.palette.alarm.minorAcked.light, theme.palette.mode === 'dark' ? 0.2 : 0.1) + ' 0%, ' + (theme.palette.alarm.minorAcked.light) + ' 100%)'
                : theme.palette.alarm.minorAcked.light,
            borderStyle: "solid",
            borderWidth: "thin",
            borderColor: theme.palette.primary.main,
            '&:hover': {
                background: props.fadeList
                    ? 'linear-gradient(45deg,' + alpha(theme.palette.alarm.minorAcked.dark, theme.palette.mode === 'dark' ? 0.2 : 0.1) + ' 0%, ' + (theme.palette.alarm.minorAcked.dark) + ' 100%)'
                    : theme.palette.alarm.minorAcked.dark,
            },
        }
    }),
    noAlarm: props => ({
        '&:hover': {
        },
        "&.Mui-selected": {
            borderStyle: "solid",
            borderWidth: "thin",
            borderColor: theme.palette.primary.main
        }
    }),
    disabled: props => ({
        background: theme.palette.mode === 'dark' ? theme.palette.grey[500] : theme.palette.grey[400],
        '&:hover': {
            background: theme.palette.mode === 'dark' ? theme.palette.grey[400] : theme.palette.grey[300]
        },
        "&.Mui-selected": {
            background: theme.palette.mode === 'dark' ? theme.palette.grey[400] : theme.palette.grey[200],
            borderStyle: "solid",
            borderWidth: "thin",
            borderColor: theme.palette.primary.main
        }
    })
}));

const AlarmList = props => {
    const classes = useStyles(props);

    return (
        <React.Fragment>
            <div id="test" >
                <Grid
                    container
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="stretch"
                    spacing={2}>
                    <Grid item xs={12}>
                        <List
                            component="nav"
                            aria-labelledby="nested-list-subheader"
                            className={classes.root}
                        >
                            {props.areaNames.map((area, areaIndex) => {
                                return (
                                    < React.Fragment key={`${area["area"]}`
                                    }>
                                        <ListItem
                                            divider
                                            button
                                            selected={props.areaSelectedIndex === `${area["area"]}`}
                                            onClick={event => props.listItemClick(event, `${area["area"]}`)}
                                            onContextMenu={event => props.listItemRightClick(event, `${area["area"]}`)}
                                            classes={(props.areaEnabled[`${area["area"]}`] && props.enableAllAreas
                                                ? parseInt(props.areaPVDict[`${area["area"]}`]) === 8 || parseInt(props.areaPVDict[`${area["area"]}`]) === 6 || parseInt(props.areaPVDict[`${area["area"]}`]) === 4
                                                    ? { root: classes.majorAlarm }
                                                    : parseInt(props.areaPVDict[`${area["area"]}`]) === 7 || parseInt(props.areaPVDict[`${area["area"]}`]) === 5 || parseInt(props.areaPVDict[`${area["area"]}`]) === 3
                                                        ? { root: classes.majorAlarmAcked }
                                                        : parseInt(props.areaPVDict[`${area["area"]}`]) === 2
                                                            ? { root: classes.minorAlarm }
                                                            : parseInt(props.areaPVDict[`${area["area"]}`]) === 1
                                                                ? { root: classes.minorAlarmAcked }
                                                                : { root: classes.noAlarm }    // noAlarm
                                                : { root: classes.disabled }
                                            )}
                                        >
                                            <ListItemText primary={area["area"]} />
                                            {area["subAreas"] ?
                                                props.areaSubAreaOpen[`${area["area"]}`] ? <ExpandLess /> : <ExpandMore />
                                                : null}

                                        </ListItem>
                                        {
                                            props.areaContextOpen[`${area["area"]}`] && props.isAlarmUser
                                                ? <Menu
                                                    keepMounted
                                                    open={props.areaContextOpen[`${area["area"]}`]}
                                                    onClose={event => props.listItemContextClose(event, `${area["area"]}`)}
                                                    anchorReference="anchorPosition"
                                                    anchorPosition={props.contextMouseY !== null && props.contextMouseX !== null ?
                                                        { top: props.contextMouseY, left: props.contextMouseX } : null}
                                                >
                                                    <MenuItem disabled >{area["area"]}</MenuItem>
                                                    {/* <hr /> */}
                                                    {props.enableAllAreas ?
                                                        props.areaEnabled[`${area["area"]}`] ?
                                                            <MenuItem onClick={event => props.enableDisableArea(event, `${area["area"]}`, false)}>
                                                                <ListItemIcon >
                                                                    <NotificationsOffIcon fontSize="small" />
                                                                </ListItemIcon>
                                                                <Typography variant="inherit">Disable Area</Typography>
                                                            </MenuItem> :
                                                            <MenuItem onClick={event => props.enableDisableArea(event, `${area["area"]}`, true)}>
                                                                <ListItemIcon >
                                                                    <NotificationsActiveIcon fontSize="small" />
                                                                </ListItemIcon>
                                                                <Typography variant="inherit">Enable Area</Typography>
                                                            </MenuItem>
                                                        : <MenuItem >Enable All Areas First!</MenuItem>
                                                    }
                                                    {props.areaEnabled[`${area["area"]}`] && props.enableAllAreas ?
                                                        <MenuItem onClick={event => props.ackAllAreaAlarms(event, `${area["area"]}`)}>
                                                            <ListItemIcon >
                                                                <DoneAllIcon fontSize="small" />
                                                            </ListItemIcon>
                                                            <Typography variant="inherit">ACK all area alarms</Typography>
                                                        </MenuItem> : null}
                                                    {props.areaEnabled[`${area["area"]}`] && props.enableAllAreas && props.isAlarmAdmin ?
                                                        <MenuItem
                                                            onClick={() => props.setAlarmAdminListExpand(!props.alarmAdminListExpand)}
                                                        >
                                                            <ListItemIcon >
                                                                <SupervisorAccountIcon fontSize="small" />
                                                            </ListItemIcon>
                                                            <ListItemText primary="Alarm admin actions" />
                                                            {props.alarmAdminListExpand ? <ExpandLess style={{ marginLeft: 16 }} /> : <ExpandMore style={{ marginLeft: 16 }} />}
                                                        </MenuItem> : null}
                                                    <Collapse in={props.alarmAdminListExpand} timeout="auto" unmountOnExit>
                                                        <List component="div" disablePadding >
                                                            <ListItem
                                                                button
                                                                className={classes.nested}
                                                                onClick={event => props.addNewPV(event, `${area["area"]}`)}
                                                            >
                                                                <ListItemIcon >
                                                                    <AddIcon fontSize="small" />
                                                                </ListItemIcon>
                                                                <ListItemText primary="Add new pv" />
                                                            </ListItem>
                                                            <ListItem
                                                                button
                                                                className={classes.nested}
                                                                onClick={event => props.addNewSubArea(event, `${area["area"]}`)}
                                                            >
                                                                <ListItemIcon >
                                                                    <PlaylistAddOutlinedIcon fontSize="small" />
                                                                </ListItemIcon>
                                                                <ListItemText primary="Add new subArea" />
                                                            </ListItem>
                                                            <ListItem
                                                                button
                                                                className={classes.nested}
                                                                onClick={event => props.editArea(event, `${area["area"]}`)}
                                                            >
                                                                <ListItemIcon >
                                                                    <EditIcon fontSize="small" />
                                                                </ListItemIcon>
                                                                <ListItemText primary="Edit area" />
                                                            </ListItem>
                                                            <ListItem
                                                                button
                                                                className={classes.nested}
                                                                onClick={event => props.deleteArea(event, `${area["area"]}`)}
                                                            >
                                                                <ListItemIcon >
                                                                    <DeleteIcon fontSize="small" />
                                                                </ListItemIcon>
                                                                <ListItemText primary="Delete area" />
                                                            </ListItem>
                                                        </List>
                                                    </Collapse>
                                                </Menu>
                                                : null
                                        }

                                        {
                                            area["subAreas"] ?
                                                <Collapse in={props.areaSubAreaOpen[`${area["area"]}`]} timeout="auto" unmountOnExit>
                                                    <List component="div" disablePadding >
                                                        {area["subAreas"].map((subArea, subAreaIndex) => {
                                                            return (
                                                                <React.Fragment key={`${area["area"]}=${subAreaIndex}=${subArea}`}>
                                                                    <ListItem
                                                                        button
                                                                        divider
                                                                        className={classes.nested}
                                                                        selected={props.areaSelectedIndex === `${area["area"]}=${subArea}`}
                                                                        onClick={event => props.listItemClick(event, `${area["area"]}=${subArea}`)}
                                                                        onContextMenu={event => props.listItemRightClick(event, `${area["area"]}=${subArea}`)}
                                                                        classes={(props.areaEnabled[`${area["area"]}=${subArea}`] && props.enableAllAreas
                                                                            ? parseInt(props.areaPVDict[`${area["area"]}=${subArea}`]) === 8 || parseInt(props.areaPVDict[`${area["area"]}=${subArea}`]) === 6 || parseInt(props.areaPVDict[`${area["area"]}=${subArea}`]) === 4
                                                                                ? { root: classes.majorAlarm }
                                                                                : parseInt(props.areaPVDict[`${area["area"]}=${subArea}`]) === 7 || parseInt(props.areaPVDict[`${area["area"]}=${subArea}`]) === 5 || parseInt(props.areaPVDict[`${area["area"]}=${subArea}`]) === 3
                                                                                    ? { root: classes.majorAlarmAcked }
                                                                                    : parseInt(props.areaPVDict[`${area["area"]}=${subArea}`]) === 2
                                                                                        ? { root: classes.minorAlarm }
                                                                                        : parseInt(props.areaPVDict[`${area["area"]}=${subArea}`]) === 1
                                                                                            ? { root: classes.minorAlarmAcked }
                                                                                            : { root: classes.noAlarm }    // noAlarm
                                                                            : { root: classes.disabled }
                                                                        )}
                                                                    >
                                                                        <ListItemText primary={`- ${subArea}`} />

                                                                    </ListItem>
                                                                    {props.isAlarmUser && <Menu
                                                                        keepMounted
                                                                        open={props.areaContextOpen[`${area["area"]}=${subArea}`] ? true : false}
                                                                        onClose={event => props.listItemContextClose(event, `${area["area"]}=${subArea}`)}
                                                                        anchorReference="anchorPosition"
                                                                        anchorPosition={props.contextMouseY !== null && props.contextMouseX !== null ?
                                                                            { top: props.contextMouseY, left: props.contextMouseX } : null}
                                                                    >
                                                                        {props.areaEnabled[`${area["area"]}`] ? <MenuItem disabled>{`${area["area"]} > ${subArea}`}</MenuItem> : null}
                                                                        {props.enableAllAreas ?
                                                                            props.areaEnabled[`${area["area"]}`] ?
                                                                                props.areaEnabled[`${area["area"]}=${subArea}`]
                                                                                    ? <div>
                                                                                        <MenuItem onClick={event => props.enableDisableArea(event, `${area["area"]}=${subArea}`, false)}>
                                                                                            <ListItemIcon >
                                                                                                <NotificationsOffIcon fontSize="small" />
                                                                                            </ListItemIcon>
                                                                                            <Typography variant="inherit">Disable Area</Typography>
                                                                                        </MenuItem>
                                                                                        <MenuItem onClick={event => props.ackAllAreaAlarms(event, `${area["area"]}=${subArea}`)}>
                                                                                            <ListItemIcon >
                                                                                                <DoneAllIcon fontSize="small" />
                                                                                            </ListItemIcon>
                                                                                            <Typography variant="inherit">ACK all area alarms</Typography>
                                                                                        </MenuItem>
                                                                                        {props.isAlarmAdmin && <MenuItem
                                                                                            onClick={() => props.setAlarmAdminListExpand(!props.alarmAdminListExpand)}
                                                                                        >
                                                                                            <ListItemIcon >
                                                                                                <SupervisorAccountIcon fontSize="small" />
                                                                                            </ListItemIcon>
                                                                                            <ListItemText primary="Alarm admin actions" />
                                                                                            {props.alarmAdminListExpand ? <ExpandLess style={{ marginLeft: 16 }} /> : <ExpandMore style={{ marginLeft: 16 }} />}
                                                                                        </MenuItem>}
                                                                                        <Collapse in={props.alarmAdminListExpand} timeout="auto" unmountOnExit>
                                                                                            <List component="div" disablePadding >
                                                                                                <ListItem
                                                                                                    button
                                                                                                    className={classes.nested}
                                                                                                    onClick={event => props.addNewPV(event, `${area["area"]}=${subArea}`)}
                                                                                                >
                                                                                                    <ListItemIcon >
                                                                                                        <AddIcon fontSize="small" />
                                                                                                    </ListItemIcon>
                                                                                                    <ListItemText primary="Add new pv" />
                                                                                                </ListItem>
                                                                                                <ListItem
                                                                                                    button
                                                                                                    className={classes.nested}
                                                                                                    onClick={event => props.editArea(event, `${area["area"]}=${subArea}`)}
                                                                                                >
                                                                                                    <ListItemIcon >
                                                                                                        <EditIcon fontSize="small" />
                                                                                                    </ListItemIcon>
                                                                                                    <ListItemText primary="Edit subArea" />
                                                                                                </ListItem>
                                                                                                <ListItem
                                                                                                    button
                                                                                                    className={classes.nested}
                                                                                                    onClick={event => props.deleteArea(event, `${area["area"]}=${subArea}`)}
                                                                                                >
                                                                                                    <ListItemIcon >
                                                                                                        <DeleteIcon fontSize="small" />
                                                                                                    </ListItemIcon>
                                                                                                    <ListItemText primary="Delete subArea" />
                                                                                                </ListItem>
                                                                                            </List>
                                                                                        </Collapse>
                                                                                    </div>
                                                                                    :
                                                                                    <MenuItem onClick={event => props.enableDisableArea(event, `${area["area"]}=${subArea}`, true)}>
                                                                                        <ListItemIcon >
                                                                                            <NotificationsActiveIcon fontSize="small" />
                                                                                        </ListItemIcon>
                                                                                        <Typography variant="inherit">Enable Area</Typography>
                                                                                    </MenuItem>

                                                                                :
                                                                                <MenuItem >Enable Parent Area First!</MenuItem>
                                                                            :
                                                                            <MenuItem >Enable All Areas First!</MenuItem>
                                                                        }
                                                                    </Menu>}
                                                                </React.Fragment>
                                                            )
                                                        })}
                                                    </List>
                                                </Collapse>
                                                : null
                                        }
                                    </React.Fragment >
                                )
                            })}
                        </List>
                    </Grid>
                </Grid>
            </div >
        </React.Fragment >
    )
}

export default React.memo(AlarmList);