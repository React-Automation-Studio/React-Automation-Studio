import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

// Styles
const useStyles = makeStyles(theme => ({
    styledTableHeadCell: {
        backgroundColor: theme.palette.type === 'dark' ? undefined : theme.palette.primary.light,
        color: theme.palette.type === 'dark' ? undefined : 'white',
    },
    centerInBlock: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: 'center'
    },
    margin: {
        margin: theme.spacing(1),
    },
}))

const EditUsersDialog = (props) => {

    const classes = useStyles()
    const theme = useTheme()

    return (
        <Dialog
            open={props.open}
            onClose={props.handleClose}
            fullWidth
            maxWidth='lg'
        >
            <DialogTitle >{"Edit alarm users"}</DialogTitle>
            <DialogContent>
                <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="stretch"
                >
                    <Grid item xs={5}>
                        <Paper>
                            <Grid
                                container
                                direction="column"
                                justifyContent="center"
                                alignItems="stretch"
                            >
                                <Grid item className={classes.centerInBlock}>
                                    <Typography variant='button'>RAS Users (All)</Typography>
                                </Grid>
                                <Grid item>
                                    <TableContainer component={Paper} elevation={theme.palette.type === 'dark' ? undefined : 5}>
                                        <Table aria-label="User Table" stickyHeader size="small">
                                            <TableHead>
                                                <TableRow
                                                >
                                                    <TableCell align="left" classes={{ stickyHeader: classes.styledTableHeadCell }}>Name</TableCell>
                                                    <TableCell align="left" classes={{ stickyHeader: classes.styledTableHeadCell }}>Username</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {Object.values(props.editUsersList).map(user => {
                                                    if (user.adminDB_en && !user.isAHUser) {
                                                        return (
                                                            < TableRow
                                                                key={`${user.username}-${user.name}`}
                                                                hover
                                                                selected={user.isSelected}
                                                                onClick={() => {
                                                                    props.setEditUsersList(prevState => ({
                                                                        ...prevState,
                                                                        [`${user.username}-${user.name}`]: {
                                                                            ...prevState[`${user.username}-${user.name}`],
                                                                            isSelected: !prevState[`${user.username}-${user.name}`].isSelected
                                                                        }
                                                                    }))

                                                                }}
                                                            >
                                                                <TableCell>
                                                                    {user.name}
                                                                </TableCell>
                                                                <TableCell>
                                                                    {user.username}
                                                                </TableCell>
                                                            </ TableRow>
                                                        )
                                                    }
                                                    return null
                                                })}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                    <Grid item xs={2}>
                        <Grid
                            container
                            direction="column"
                            justifyContent="center"
                            alignItems="stretch"
                        >
                            <Grid item className={classes.centerInBlock}>
                                <IconButton
                                    color="secondary"
                                    disabled={props.forwardBDisabled}
                                    className={classes.margin}
                                    onClick={() => props.pushToAlarmUsers()}
                                >
                                    <ArrowForwardIcon fontSize="large" />
                                </IconButton>
                            </Grid>
                            <Grid item className={classes.centerInBlock}>
                                <IconButton
                                    color="secondary"
                                    disabled={props.backwardBDisabled}
                                    className={classes.margin}
                                    onClick={() => props.pushToRASUsers()}
                                >
                                    <ArrowBackIcon fontSize="large" />
                                </IconButton>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={5}>
                        <Paper>
                            <Grid
                                container
                                direction="column"
                                justifyContent="center"
                                alignItems="stretch"
                            >
                                <Grid item className={classes.centerInBlock}>
                                    <Typography variant='button'>Alarm Users</Typography>
                                </Grid>
                                <Grid item>
                                    <TableContainer component={Paper} elevation={theme.palette.type === 'dark' ? undefined : 5}>
                                        <Table aria-label="User Table" stickyHeader size="small">
                                            <TableHead>
                                                <TableRow
                                                >
                                                    <TableCell align="left" classes={{ stickyHeader: classes.styledTableHeadCell }}>Name</TableCell>
                                                    <TableCell align="left" classes={{ stickyHeader: classes.styledTableHeadCell }}>Username</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {Object.values(props.editUsersList).map(user => {
                                                    if (user.adminDB_en && user.isAHUser) {
                                                        return (
                                                            < TableRow
                                                                key={`${user.username}-${user.name}`}
                                                                hover
                                                                selected={user.isSelected}
                                                                onClick={() => {
                                                                    props.setEditUsersList(prevState => ({
                                                                        ...prevState,
                                                                        [`${user.username}-${user.name}`]: {
                                                                            ...prevState[`${user.username}-${user.name}`],
                                                                            isSelected: !prevState[`${user.username}-${user.name}`].isSelected
                                                                        }
                                                                    }))

                                                                }}
                                                            >
                                                                <TableCell>
                                                                    {user.name}
                                                                </TableCell>
                                                                <TableCell>
                                                                    {user.username}
                                                                </TableCell>
                                                            </ TableRow>
                                                        )
                                                    }
                                                    return null
                                                })}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={props.handleApplyEditUsers} color="secondary">
                    Apply
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default React.memo(EditUsersDialog);