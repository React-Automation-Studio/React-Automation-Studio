import React from 'react';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import Tooltip from '@material-ui/core/Tooltip';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import ClearIcon from '@material-ui/icons/Clear';
import DoneIcon from '@material-ui/icons/Done';
import AddIcon from '@material-ui/icons/Add';
import BlockIcon from '@material-ui/icons/Block';
import EventIcon from '@material-ui/icons/Event';
import EmailIcon from '@material-ui/icons/Email';
import CallIcon from '@material-ui/icons/Call';

const useStyles = makeStyles(theme => ({
    chip: {
        marginRight: '1em',
        marginTop: '0.5em',
        marginBottom: '0.5em'
    },
    chipOutlinedSecondary: {
        borderWidth: '1.5px'
    },
    emailInputField: {
        cursor: 'auto',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis'
    },
    icon: {
        color: theme.palette.secondary.main
    },
    styledTableHeadCell: {
        backgroundColor: theme.palette.type === 'dark' ? undefined : theme.palette.primary.light,
        color: theme.palette.type === 'dark' ? undefined : 'white',
    },
    verticalMiddle: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
    }
}))

const UserTable = (props) => {

    const classes = useStyles()
    const theme = useTheme()

    const showAddHeader = Object.values(props.userEdit).reduce((acc, edit) => {
        return acc || edit
    }, false)

    const { filterUserRegex } = props
    const fillChipIndex = filterUserRegex.length === 1 ? filterUserRegex[0].index : null
    const fillChipName = filterUserRegex.length === 1 ? filterUserRegex[0].regEx : null

    return (
        <TableContainer component={Paper} style={{ height: props.height }} elevation={theme.palette.type === 'dark' ? undefined : 5}>
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
                        <TableCell align="left" classes={{ stickyHeader: classes.styledTableHeadCell }}>Name</TableCell>
                        <TableCell align="left" classes={{ stickyHeader: classes.styledTableHeadCell }}>Contact</TableCell>
                        <TableCell align="left" classes={{ stickyHeader: classes.styledTableHeadCell }}>
                            <div style={{ display: 'flex', flexDirection: 'row' }}>
                                <div >Notification Expressions</div>
                            </div>
                        </TableCell>
                        {showAddHeader && <TableCell align="center" classes={{ stickyHeader: classes.styledTableHeadCell }}>Add</TableCell>}
                        <TableCell align="center" classes={{ stickyHeader: classes.styledTableHeadCell }}>Actions</TableCell>
                        <TableCell align="left" classes={{ stickyHeader: classes.styledTableHeadCell }}>Notification Schedule</TableCell>
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
                                            justify="center"
                                            alignItems="center"
                                        >
                                            <Grid item xs={2} className={classes.verticalMiddle}>
                                                <EmailIcon />
                                            </Grid>
                                            <Grid item xs={10}>
                                                <TextField
                                                    type={allowEdit ? 'text' : 'password'}
                                                    value={user.email}
                                                    onChange={(event) => props.updateUserEmail(event, user.name, user.username)}
                                                    InputProps={{
                                                        classes: { input: classes.emailInputField },
                                                        readOnly: true,
                                                        disableUnderline: true
                                                    }}
                                                    error={props.emailError[`${user.username}-${user.name}`]}
                                                    label={props.emailError[`${user.username}-${user.name}`] ? "Invalid email" : undefined}
                                                />
                                            </Grid>
                                            <Grid item xs={2} className={classes.verticalMiddle}>
                                                <CallIcon />
                                            </Grid>
                                            <Grid item xs={10}>
                                                <TextField
                                                    type={allowEdit ? 'text' : 'password'}
                                                    value={user.mobile}
                                                    onChange={(event) => props.updateUserMobile(event, user.name, user.username)}
                                                    InputProps={{
                                                        classes: { input: classes.emailInputField },
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
                                                    classes={{ outlinedSecondary: classes.chipOutlinedSecondary }}
                                                    key={`${index}-${expression}`}
                                                    label={expression}
                                                    variant={filledChip ? undefined : "outlined"}
                                                    color="secondary"
                                                    className={classes.chip}
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
                                                                            <AddIcon style={{ cursor: 'pointer' }} className={classes.icon} />
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
                                                            ? <IconButton
                                                                disabled={true}
                                                            >
                                                                <BlockIcon />
                                                            </IconButton>
                                                            : <Tooltip title="Apply" placement="bottom">
                                                                <IconButton
                                                                    onClick={(event) => { props.applyEdit(event, user.name, user.username) }}
                                                                >
                                                                    <DoneIcon className={classes.icon} />
                                                                </IconButton>
                                                            </Tooltip>}
                                                        <Tooltip title="Cancel" placement="bottom">
                                                            <IconButton
                                                                onClick={(event) => { props.cancelEdit(event, user.name, user.username) }}
                                                                style={{ marginLeft: '1em' }}
                                                            >
                                                                <ClearIcon className={classes.icon} />
                                                            </IconButton>
                                                        </Tooltip>
                                                    </React.Fragment>
                                                    : <Tooltip title="Edit expressions" placement="bottom">
                                                        <IconButton onClick={(event) => { props.setUserEdit(event, user.name, user.username, true) }}>
                                                            <EditIcon className={classes.icon} />
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
                                                className={classes.verticalMiddle}
                                                style={{
                                                    marginLeft: 'auto'
                                                }}
                                            >
                                                {
                                                    allowEdit
                                                        ? <Tooltip title="Edit schedule" placement="left">
                                                            <IconButton onClick={(event) => { props.openDialog(event, user.name, user.username) }}>
                                                                <EventIcon className={classes.icon} />
                                                            </IconButton>
                                                        </Tooltip>
                                                        : null
                                                }
                                            </div>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            )
                        }
                        return null
                    })}

                </TableBody>
            </Table>
        </TableContainer >
    );
};

export default React.memo(UserTable);