import React from 'react';
import { useTheme } from '@mui/material/styles';
import makeStyles from '@mui/styles/makeStyles';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

// Styles
const useStyles = makeStyles(theme => ({
    styledTableHeadCell: {
        backgroundColor: theme.palette.mode === 'dark' ? undefined : theme.palette.primary.light,
        color: theme.palette.mode === 'dark' ? undefined : 'white',
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
                                    <TableContainer component={Paper} elevation={theme.palette.mode === 'dark' ? undefined : 5}>
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
                                    size="large">
                                    <ArrowForwardIcon fontSize="large" />
                                </IconButton>
                            </Grid>
                            <Grid item className={classes.centerInBlock}>
                                <IconButton
                                    color="secondary"
                                    disabled={props.backwardBDisabled}
                                    className={classes.margin}
                                    onClick={() => props.pushToRASUsers()}
                                    size="large">
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
                                    <TableContainer component={Paper} elevation={theme.palette.mode === 'dark' ? undefined : 5}>
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
    );
}

export default React.memo(EditUsersDialog);