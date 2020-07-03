import React from 'react';

import { makeStyles, useTheme } from '@material-ui/core/styles';
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
import HelpOutlinedIcon from '@material-ui/icons/HelpOutlined';

const useStyles = makeStyles(theme => ({
    chip: {
        marginRight: '1em',
        marginTop: '0.5em',
        marginBottom: '0.5em'
    },
    emailInputField: {
        cursor: 'auto'
    },
    styledTableHeadCell: {
        backgroundColor: theme.palette.type === 'dark' ? undefined : theme.palette.primary.light,
        color: theme.palette.type === 'dark' ? undefined : 'white',
    }
}))

const UserTable = (props) => {

    const classes = useStyles()
    const theme = useTheme()

    const showAddHeader = Object.values(props.userEdit).reduce((acc, edit) => {
        return acc || edit
    }, false)

    const { filterUserRegex } = props
    const fillChipName = filterUserRegex.length === 1 ? filterUserRegex[0] : null

    return (
        <TableContainer component={Paper} style={{ height: props.height }} elevation={theme.palette.type === 'dark' ? undefined : 5}>
            <Table aria-label="User Table" stickyHeader size="small">
                <colgroup>
                    <col style={{ width: '15%' }} />
                    <col style={{ width: '25%' }} />
                    <col style={{ width: '40%' }} />
                    <col style={{ width: '10%' }} />
                    <col style={{ width: '10%' }} />
                </colgroup>
                <TableHead>
                    <TableRow
                        onClick={(event) => {
                            event.preventDefault()
                            event.stopPropagation()
                        }}
                    >
                        <TableCell align="left" classes={{ stickyHeader: classes.styledTableHeadCell }}>Name</TableCell>
                        <TableCell align="left" classes={{ stickyHeader: classes.styledTableHeadCell }}>Email</TableCell>
                        <TableCell align="left" classes={{ stickyHeader: classes.styledTableHeadCell }}>
                            <Tooltip
                                interactive
                                title={
                                    <React.Fragment>
                                        <p>
                                            <b>The notification expressions are composed using Javascript regular expressions.</b>
                                            <br />
                                            <br />
                                            <b>For more information on JS regular expressions see: </b>
                                            <br />
                                            <b><a href="http://www.w3schools.com/js/js_regexp.asp" target="_blank" rel="noopener noreferrer">www.W3Schools.com</a></b>
                                        </p>
                                    </React.Fragment>
                                }
                                placement='bottom-start'
                                enterDelay={400}
                            >
                                <div style={{ display: 'flex', flexDirection: 'row' }}>
                                    <div >Notification Expressions</div>
                                    <HelpOutlinedIcon style={{ marginLeft: '0.5em' }} />

                                </div>
                            </Tooltip>
                        </TableCell>
                        <TableCell align="center" classes={{ stickyHeader: classes.styledTableHeadCell }}>{showAddHeader ? 'Add' : null}</TableCell>
                        <TableCell align="center" classes={{ stickyHeader: classes.styledTableHeadCell }}>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {Object.values(props.userList).map(user => {
                        return (
                            < TableRow
                                key={`${user.username}`}
                                hover
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
                                    <TextField
                                        type={props.username === user.username ? 'text' : 'password'}
                                        value={user.email}
                                        onChange={(event) => props.updateUserEmail(event, user.name, user.username)}
                                        InputProps={{
                                            classes: { input: classes.emailInputField },
                                            readOnly: props.userEdit[`${user.username}-${user.name}`] ? false : true,
                                            disableUnderline: props.userEdit[`${user.username}-${user.name}`] ? false : true
                                        }}
                                    />
                                </TableCell>
                                <TableCell>
                                    {Object.values(user.notifyPVs).map(expression => {
                                        return (
                                            <Chip
                                                key={expression}
                                                label={expression}
                                                variant={expression === fillChipName ? undefined : "outlined"}
                                                color="secondary"
                                                className={classes.chip}
                                                onClick={(event) => props.setFilterUserRegex(event, expression)}
                                                onDelete={props.userEdit[`${user.username}-${user.name}`] ? (event) => { props.deleteChip(event, user.name, user.username, expression) } : undefined}
                                            />
                                        )
                                    })}
                                </TableCell>
                                <TableCell>
                                    {
                                        props.userEdit[`${user.username}-${user.name}`]
                                            ? <TextField
                                                value={props.addRegexVal[`${user.username}-${user.name}`]}
                                                onChange={(event) => props.setAddRegexVal(event, user.username, user.name)}
                                                fullWidth={true}
                                                autoFocus={true}
                                                error={props.regexError[`${user.username}-${user.name}`]}
                                                label={props.regexError[`${user.username}-${user.name}`] ? "Invalid Regex" : undefined}
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
                                                                    <AddIcon style={{ cursor: 'pointer' }} />
                                                                </InputAdornment >
                                                            ),
                                                        }
                                                }
                                            />
                                            : null
                                    }
                                </TableCell>
                                <TableCell align="center">
                                    {
                                        props.username !== user.username
                                            ? props.userEdit[`${user.username}-${user.name}`]
                                                ? <React.Fragment>
                                                    <Tooltip title="Apply" placement="bottom">
                                                        <IconButton
                                                            onClick={(event) => { props.applyEdit(event, user.name, user.username) }}
                                                        >
                                                            <DoneIcon />
                                                        </IconButton>
                                                    </Tooltip>
                                                    <Tooltip title="Cancel" placement="bottom">
                                                        <IconButton
                                                            onClick={(event) => { props.cancelEdit(event, user.name, user.username) }}
                                                            style={{ marginLeft: '1em' }}
                                                        >
                                                            <ClearIcon />
                                                        </IconButton>
                                                    </Tooltip>
                                                </React.Fragment>
                                                : <Tooltip title="Edit" placement="right">
                                                    <IconButton onClick={(event) => { props.setUserEdit(event, user.name, user.username, true) }}>
                                                        <EditIcon />
                                                    </IconButton>
                                                </Tooltip>
                                            : null
                                    }
                                </TableCell>
                            </TableRow>
                        )

                    })}

                </TableBody>
            </Table>
        </TableContainer >
    );
};

export default React.memo(UserTable);