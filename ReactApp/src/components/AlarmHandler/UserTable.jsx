import React from 'react';

import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/GridLegacy';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import Tooltip from '@mui/material/Tooltip';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import ClearIcon from '@mui/icons-material/Clear';
import DoneIcon from '@mui/icons-material/Done';
import AddIcon from '@mui/icons-material/Add';
import BlockIcon from '@mui/icons-material/Block';
import EventIcon from '@mui/icons-material/Event';
import EmailIcon from '@mui/icons-material/Email';
import CallIcon from '@mui/icons-material/Call';

const UserTable = (props) => {

    const theme = useTheme()

    const showAddHeader = Object.values(props.userEdit).reduce((acc, edit) => {
        return acc || edit
    }, false)

    const { filterUserRegex } = props
    const fillChipIndex = filterUserRegex.length === 1 ? filterUserRegex[0].index : null
    const fillChipName = filterUserRegex.length === 1 ? filterUserRegex[0].regEx : null

    return (
        <TableContainer component={Paper} style={{ height: props.height }} elevation={theme.palette.mode === 'dark' ? undefined : 5}>
            <Table aria-label="User Table" stickyHeader size="small">
                {
                    showAddHeader
                        ? <colgroup>
                            <col style={{ width: '10%' }} />
                            <col style={{ width: '15%' }} />
                            <col style={{ width: '35%' }} />
                            <col style={{ width: '10%' }} />
                            <col style={{ width: '10%' }} />
                            <col style={{ width: '20%' }} />
                        </colgroup>
                        : <colgroup>
                            <col style={{ width: '10%' }} />
                            <col style={{ width: '17%' }} />
                            <col style={{ width: '45%' }} />
                            <col style={{ width: '5%' }} />
                            <col style={{ width: '23%' }} />
                        </colgroup>
                }
                <TableHead>
                    <TableRow
                        onClick={(event) => {
                            // event.preventDefault()
                            event.stopPropagation()
                        }}
                    >
                        <TableCell align="left" sx={{ 
                            backgroundColor: theme.palette.mode === 'dark' ? undefined : theme.palette.primary.light,
                            color: theme.palette.mode === 'dark' ? undefined : 'white',
                        }}>Name</TableCell>
                        <TableCell align="left" sx={{ 
                            backgroundColor: theme.palette.mode === 'dark' ? undefined : theme.palette.primary.light,
                            color: theme.palette.mode === 'dark' ? undefined : 'white',
                        }}>Contact</TableCell>
                        <TableCell align="left" sx={{ 
                            backgroundColor: theme.palette.mode === 'dark' ? undefined : theme.palette.primary.light,
                            color: theme.palette.mode === 'dark' ? undefined : 'white',
                        }}>
                            <div style={{ display: 'flex', flexDirection: 'row' }}>
                                <div >Notification Expressions</div>
                            </div>
                        </TableCell>
                        {showAddHeader && <TableCell align="center" sx={{ 
                            backgroundColor: theme.palette.mode === 'dark' ? undefined : theme.palette.primary.light,
                            color: theme.palette.mode === 'dark' ? undefined : 'white',
                        }}>Add</TableCell>}
                        <TableCell align="center" sx={{ 
                            backgroundColor: theme.palette.mode === 'dark' ? undefined : theme.palette.primary.light,
                            color: theme.palette.mode === 'dark' ? undefined : 'white',
                        }}>Actions</TableCell>
                        <TableCell align="left" sx={{ 
                            backgroundColor: theme.palette.mode === 'dark' ? undefined : theme.palette.primary.light,
                            color: theme.palette.mode === 'dark' ? undefined : 'white',
                        }}>Notification Schedule</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {Object.values(props.userList).map(user => {
                        // console.log(user)
                        const rowSelected = user.name === props.filterUser.name && user.username === props.filterUser.username

                        let scheduleIndex
                        const chipSelected = user.notifyPVs.reduce((acc, area, index) => {
                            if ((area.regEx === fillChipName) && (index === fillChipIndex)) {
                                scheduleIndex = index
                            }
                            return acc || ((area.regEx === fillChipName) && (index === fillChipIndex))
                        }, false)

                        const isDemoUser = user.username === 'user1' || user.username === 'user2' || user.username === 'user3'
                        const allowEdit = isDemoUser || user.username === props.username || props.isAlarmAdmin
                        const invalidContact = props.emailError[`${user.username}-${user.name}`] || props.mobileError[`${user.username}-${user.name}`]

                        if (user.adminDB_en && user.isAHUser) {
                            return (
                                < TableRow
                                    key={`${user.username}-${user.name}`}
                                    hover
                                    selected={rowSelected}
                                    onClick={(event) => {
                                        event.preventDefault()
                                        event.stopPropagation()
                                        props.setFilterUser(user.name, user.username)

                                    }}
                                >
                                    <TableCell>
                                        {user.name}
                                    </TableCell>
                                    <TableCell>
                                        <Grid
                                            container
                                            direction="row"
                                            justifyContent="center"
                                            alignItems="center"
                                        >
                                            <Grid item xs={2} sx={{ 
                                                display: "flex",
                                                flexDirection: "column",
                                                justifyContent: "center",
                                            }}>
                                                <EmailIcon />
                                            </Grid>
                                            <Grid item xs={10}>
                                                <TextField
                                                    type={allowEdit ? 'text' : 'password'}
                                                    value={user.email}
                                                    onChange={(event) => props.updateUserEmail(event, user.name, user.username)}
                                                    InputProps={{
                                                        sx: { 
                                                            '& .MuiInputBase-input': {
                                                                cursor: 'auto',
                                                                whiteSpace: 'nowrap',
                                                                textOverflow: 'ellipsis'
                                                            }
                                                        },
                                                        readOnly: true,
                                                        disableUnderline: true
                                                    }}
                                                    error={props.emailError[`${user.username}-${user.name}`]}
                                                    label={props.emailError[`${user.username}-${user.name}`] ? "Invalid email" : undefined}
                                                />
                                            </Grid>
                                            <Grid item xs={2} sx={{ 
                                                display: "flex",
                                                flexDirection: "column",
                                                justifyContent: "center",
                                            }}>
                                                <CallIcon />
                                            </Grid>
                                            <Grid item xs={10}>
                                                <TextField
                                                    type={allowEdit ? 'text' : 'password'}
                                                    value={user.mobile}
                                                    onChange={(event) => props.updateUserMobile(event, user.name, user.username)}
                                                    InputProps={{
                                                        sx: { 
                                                            '& .MuiInputBase-input': {
                                                                cursor: 'auto',
                                                                whiteSpace: 'nowrap',
                                                                textOverflow: 'ellipsis'
                                                            }
                                                        },
                                                        readOnly: true,
                                                        disableUnderline: true
                                                    }}
                                                    error={props.mobileError[`${user.username}-${user.name}`]}
                                                    label={props.mobileError[`${user.username}-${user.name}`] ? "Invalid number" : undefined}
                                                />
                                            </Grid>
                                        </Grid>
                                    </TableCell>
                                    <TableCell>
                                        {user.notifyPVs.map((expressionObject, index) => {
                                            const expression = expressionObject.regEx
                                            const filledChip = ((expression === fillChipName) && (index === fillChipIndex)) || (!showAddHeader && (user.name === props.filterUser.name && user.username === props.filterUser.username))
                                            return (
                                                <Chip
                                                    sx={{ 
                                                        marginRight: '1em',
                                                        marginTop: '0.5em',
                                                        marginBottom: '0.5em',
                                                        '&.MuiChip-outlinedSecondary': {
                                                            borderWidth: '1.5px'
                                                        }
                                                    }}
                                                    key={`${index}-${expression}`}
                                                    label={expression}
                                                    variant={filledChip ? undefined : "outlined"}
                                                    color="secondary"
                                                    onClick={(event) => props.setFilterUserRegex(event, expression, index)}
                                                    onDelete={props.userEdit[`${user.username}-${user.name}`] ? (event) => { props.deleteChip(event, user.name, user.username, expression) } : undefined}
                                                />
                                            )
                                        })}
                                    </TableCell>
                                    {showAddHeader && <TableCell>
                                        {
                                            props.userEdit[`${user.username}-${user.name}`]
                                                ? <TextField
                                                    value={props.addRegexVal[`${user.username}-${user.name}`]}
                                                    onChange={(event) => props.setAddRegexVal(event, user.username, user.name)}
                                                    fullWidth={true}
                                                    autoFocus={true}
                                                    error={props.regexError[`${user.username}-${user.name}`]}
                                                    label={props.regexError[`${user.username}-${user.name}`] ? "Invalid regex" : undefined}
                                                    InputProps={
                                                        props.regexError[`${user.username}-${user.name}`]
                                                            ? {
                                                                endAdornment: (
                                                                    <InputAdornment position="end"  >
                                                                        <BlockIcon />
                                                                    </InputAdornment >
                                                                )
                                                            }
                                                            : {
                                                                endAdornment: (
                                                                    <InputAdornment position="end" onClick={(event) => props.addChip(event, user.name, user.username, props.addRegexVal[`${user.username}-${user.name}`])} >
                                                                        <Tooltip title="Add" placement="bottom">
                                                                            <AddIcon style={{ cursor: 'pointer', color: theme.palette.secondary.main }} />
                                                                        </Tooltip>
                                                                    </InputAdornment >
                                                                ),
                                                            }
                                                    }
                                                />
                                                : null
                                        }
                                    </TableCell>}
                                    <TableCell align="center">
                                        {
                                            allowEdit
                                                ? props.userEdit[`${user.username}-${user.name}`]
                                                    ? <React.Fragment>
                                                        {invalidContact
                                                            ? <IconButton disabled={true} size="large">
                                                                <BlockIcon />
                                                            </IconButton>
                                                            : <Tooltip title="Apply" placement="bottom">
                                                                <IconButton
                                                                    onClick={(event) => { props.applyEdit(event, user.name, user.username) }}
                                                                    size="large">
                                                                    <DoneIcon sx={{ color: theme.palette.secondary.main }} />
                                                                </IconButton>
                                                            </Tooltip>}
                                                        <Tooltip title="Cancel" placement="bottom">
                                                            <IconButton
                                                                onClick={(event) => { props.cancelEdit(event, user.name, user.username) }}
                                                                style={{ marginLeft: '1em' }}
                                                                size="large">
                                                                <ClearIcon sx={{ color: theme.palette.secondary.main }} />
                                                            </IconButton>
                                                        </Tooltip>
                                                    </React.Fragment>
                                                    : <Tooltip title="Edit expressions" placement="bottom">
                                                        <IconButton
                                                            onClick={(event) => { props.setUserEdit(event, user.name, user.username, true) }}
                                                            size="large">
                                                            <EditIcon sx={{ color: theme.palette.secondary.main }} />
                                                        </IconButton>
                                                    </Tooltip>
                                                : null
                                        }
                                    </TableCell>
                                    <TableCell>
                                        <div
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center'
                                            }}
                                        >
                                            <div
                                                style={{ paddingRight: '0.5em' }}
                                            >
                                                {
                                                    rowSelected || !chipSelected
                                                        ? user.global
                                                            ? props.userScheduleString({ isGlobal: true, ...user.globalSetup })
                                                            : "Global schedule not enabled. Click notification expressions to see its unique notification schedule."
                                                        : user.global
                                                            ? props.userScheduleString({ isGlobal: true, ...user.globalSetup })
                                                            : props.userScheduleString({ isGlobal: false, ...user.notifyPVs[scheduleIndex].notifySetup })
                                                }
                                            </div>
                                            <div
                                                style={{
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    justifyContent: "center",
                                                    marginLeft: 'auto'
                                                }}
                                            >
                                                {
                                                    allowEdit
                                                        ? <Tooltip title="Edit schedule" placement="left">
                                                            <IconButton
                                                                onClick={(event) => { props.openDialog(event, user.name, user.username) }}
                                                                size="large">
                                                                <EventIcon sx={{ color: theme.palette.secondary.main }} />
                                                            </IconButton>
                                                        </Tooltip>
                                                        : null
                                                }
                                            </div>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            );
                        }
                        return null
                    })}

                </TableBody>
            </Table>
        </TableContainer >
    );
};

export default React.memo(UserTable);