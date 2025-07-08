import React from 'react';

import { alpha } from '@mui/material/styles';

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

const AlarmList = props => {

    const getListItemStyle = (area) => {
        const pvValue = parseInt(props.areaPVDict[`${area["area"]}`]);
        const isEnabled = props.areaEnabled[`${area["area"]}`] && props.enableAllAreas;

        if (!isEnabled) {
            return {
                background: (theme) => theme.palette.mode === 'dark' ? theme.palette.grey[500] : theme.palette.grey[400],
                '&:hover': {
                    background: (theme) => theme.palette.mode === 'dark' ? theme.palette.grey[400] : theme.palette.grey[300]
                },
                "&.Mui-selected": {
                    background: (theme) => theme.palette.mode === 'dark' ? theme.palette.grey[400] : theme.palette.grey[200],
                    borderStyle: "solid",
                    borderWidth: "thin",
                    borderColor: 'primary.main'
                }
            };
        }

        let alarmType = 'noAlarm';
        if ([8, 6, 4].includes(pvValue)) alarmType = 'majorAlarm';
        else if ([7, 5, 3].includes(pvValue)) alarmType = 'majorAlarmAcked';
        else if (pvValue === 2) alarmType = 'minorAlarm';
        else if (pvValue === 1) alarmType = 'minorAlarmAcked';

        if (alarmType === 'noAlarm') {
            return {
                "&.Mui-selected": {
                    borderStyle: "solid",
                    borderWidth: "thin",
                    borderColor: 'primary.main'
                }
            };
        }

        const alarmMapping = {
            majorAlarm: 'major',
            majorAlarmAcked: 'majorAcked',
            minorAlarm: 'minor',
            minorAlarmAcked: 'minorAcked'
        };
        const paletteKey = alarmMapping[alarmType];

        return (theme) => ({
            background: props.fadeList
                ? `linear-gradient(45deg, ${alpha(theme.palette.alarm[paletteKey].main, theme.palette.mode === 'dark' ? 0.2 : 0.1)} 0%, ${theme.palette.alarm[paletteKey].main} 100%)`
                : theme.palette.alarm[paletteKey].main,
            '&:hover': {
                background: props.fadeList
                    ? `linear-gradient(45deg, ${alpha(theme.palette.alarm[paletteKey].light, theme.palette.mode === 'dark' ? 0.2 : 0.1)} 0%, ${theme.palette.alarm[paletteKey].light} 100%)`
                    : theme.palette.alarm[paletteKey].light,
            },
            "&.Mui-selected": {
                background: props.fadeList
                    ? `linear-gradient(45deg, ${alpha(theme.palette.alarm[paletteKey].light, theme.palette.mode === 'dark' ? 0.2 : 0.1)} 0%, ${theme.palette.alarm[paletteKey].light} 100%)`
                    : theme.palette.alarm[paletteKey].light,
                borderStyle: "solid",
                borderWidth: "thin",
                borderColor: theme.palette.primary.main,
                '&:hover': {
                    background: props.fadeList
                        ? `linear-gradient(45deg, ${alpha(theme.palette.alarm[paletteKey].dark, theme.palette.mode === 'dark' ? 0.2 : 0.1)} 0%, ${theme.palette.alarm[paletteKey].dark} 100%)`
                        : theme.palette.alarm[paletteKey].dark,
                },
            }
        });
    };

    const getSubAreaListItemStyle = (area, subArea) => {
        const isEnabled = props.areaEnabled[`${area["area"]}=${subArea["subArea"]}`] && props.enableAllAreas;

        if (!isEnabled) {
            return {
                background: (theme) => theme.palette.mode === 'dark' ? theme.palette.grey[500] : theme.palette.grey[400],
                '&:hover': {
                    background: (theme) => theme.palette.mode === 'dark' ? theme.palette.grey[400] : theme.palette.grey[300]
                },
                "&.Mui-selected": {
                    background: (theme) => theme.palette.mode === 'dark' ? theme.palette.grey[400] : theme.palette.grey[200],
                    borderStyle: "solid",
                    borderWidth: "thin",
                    borderColor: 'primary.main'
                }
            };
        }

        return {
            "&.Mui-selected": {
                borderStyle: "solid",
                borderWidth: "thin",
                borderColor: 'primary.main'
            }
        };
    };

    const getPVListItemStyle = (pv) => {
        const isEnabled = props.pvEnabled[`${pv["pvName"]}`] && props.enableAllPVs;

        if (!isEnabled) {
            return {
                background: (theme) => theme.palette.mode === 'dark' ? theme.palette.grey[500] : theme.palette.grey[400],
                '&:hover': {
                    background: (theme) => theme.palette.mode === 'dark' ? theme.palette.grey[400] : theme.palette.grey[300]
                },
                "&.Mui-selected": {
                    background: (theme) => theme.palette.mode === 'dark' ? theme.palette.grey[400] : theme.palette.grey[200],
                    borderStyle: "solid",
                    borderWidth: "thin",
                    borderColor: 'primary.main'
                }
            };
        }

        return {
            "&.Mui-selected": {
                borderStyle: "solid",
                borderWidth: "thin",
                borderColor: 'primary.main'
            }
        };
    };

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
                            sx={{
                                width: '100%',
                                overflowY: 'auto',
                                maxHeight: '90vh',
                            }}
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
                                            sx={getListItemStyle(area)}
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
                                                                sx={{ pl: 4 }}
                                                                onClick={event => props.addNewPV(event, `${area["area"]}`)}
                                                            >
                                                                <ListItemIcon >
                                                                    <AddIcon fontSize="small" />
                                                                </ListItemIcon>
                                                                <ListItemText primary="Add new pv" />
                                                            </ListItem>
                                                            <ListItem
                                                                button
                                                                sx={{ pl: 4 }}
                                                                onClick={event => props.addNewSubArea(event, `${area["area"]}`)}
                                                            >
                                                                <ListItemIcon >
                                                                    <PlaylistAddOutlinedIcon fontSize="small" />
                                                                </ListItemIcon>
                                                                <ListItemText primary="Add new subArea" />
                                                            </ListItem>
                                                            <ListItem
                                                                button
                                                                sx={{ pl: 4 }}
                                                                onClick={event => props.editArea(event, `${area["area"]}`)}
                                                            >
                                                                <ListItemIcon >
                                                                    <EditIcon fontSize="small" />
                                                                </ListItemIcon>
                                                                <ListItemText primary="Edit area" />
                                                            </ListItem>
                                                            <ListItem
                                                                button
                                                                sx={{ pl: 4 }}
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
                                                                        selected={props.subAreaSelectedIndex === `${subArea["subArea"]}`}
                                                                        onClick={event => props.subAreaListItemClick(event, `${area["area"]}`, `${subArea["subArea"]}`)}
                                                                        onContextMenu={event => props.subAreaListItemRightClick(event, `${area["area"]}`, `${subArea["subArea"]}`)}
                                                                        sx={{ pl: 4, ...getSubAreaListItemStyle(area, subArea) }}
                                                                    >
                                                                        <ListItemText primary={subArea["subArea"]} />
                                                                        {subArea["pvs"] ?
                                                                            props.subAreaPVOpen[`${subArea["subArea"]}`] ? <ExpandLess /> : <ExpandMore />
                                                                            : null}

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
                                                                                                    sx={{ pl: 4 }}
                                                                                                    onClick={event => props.addNewPV(event, `${area["area"]}=${subArea}`)}
                                                                                                >
                                                                                                    <ListItemIcon >
                                                                                                        <AddIcon fontSize="small" />
                                                                                                    </ListItemIcon>
                                                                                                    <ListItemText primary="Add new pv" />
                                                                                                </ListItem>
                                                                                                <ListItem
                                                                                                    button
                                                                                                    sx={{ pl: 4 }}
                                                                                                    onClick={event => props.editArea(event, `${area["area"]}=${subArea}`)}
                                                                                                >
                                                                                                    <ListItemIcon >
                                                                                                        <EditIcon fontSize="small" />
                                                                                                    </ListItemIcon>
                                                                                                    <ListItemText primary="Edit subArea" />
                                                                                                </ListItem>
                                                                                                <ListItem
                                                                                                    button
                                                                                                    sx={{ pl: 4 }}
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