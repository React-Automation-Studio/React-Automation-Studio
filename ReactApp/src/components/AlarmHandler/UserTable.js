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
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import HelpOutlinedIcon from '@material-ui/icons/HelpOutlined';

const useStyles = makeStyles(theme => ({
    chip: {
        marginRight: '1em',
        marginTop: '0.5em',
        marginBottom: '0.5em'
    },
    styledTableHeadCell: {
        backgroundColor: theme.palette.type === 'dark' ? undefined : theme.palette.primary.light,
        color: theme.palette.type === 'dark' ? undefined : 'white',
    }
}))

const UserTable = (props) => {

    const classes = useStyles()
    const theme = useTheme()

    return (
        <TableContainer component={Paper} style={{ height: props.height }} elevation={theme.palette.type === 'dark' ? undefined : 5}>
            <Table aria-label="User Table" stickyHeader size="small">
                <colgroup>
                    <col style={{ width: '15%' }} />
                    <col style={{ width: '25%' }} />
                    <col style={{ width: '50%' }} />
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
                        <TableCell align="center" classes={{ stickyHeader: classes.styledTableHeadCell }}></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {Object.values(props.userList).map(user => {
                        return (
                            < TableRow key={`${user.username}-${user.email}`} hover>
                                <TableCell>
                                    {user.name}
                                </TableCell>
                                <TableCell>
                                    <TextField
                                        style={{ cursor: 'none' }}
                                        type="password"
                                        value={user.email}
                                        InputProps={{
                                            readOnly: true,
                                            disableUnderline: true
                                        }}
                                    />
                                </TableCell>
                                <TableCell>
                                    <Chip
                                        label="Basic"
                                        variant="outlined"
                                        color="secondary"
                                        className={classes.chip}
                                        onDelete={() => { console.log('hello') }}
                                    />
                                </TableCell>
                                <TableCell>
                                    <Tooltip title="Edit" placement="right">
                                        <IconButton >
                                            <EditIcon />
                                        </IconButton>
                                    </Tooltip>

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