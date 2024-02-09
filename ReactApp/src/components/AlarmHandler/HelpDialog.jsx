import React from 'react';
import { useTheme } from '@mui/material/styles';
import makeStyles from '@mui/styles/makeStyles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Typography from '@mui/material/Typography';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import EditIcon from '@mui/icons-material/Edit';
import EventIcon from '@mui/icons-material/Event';

// Styles
const useStyles = makeStyles(theme => ({
    styledTableHeadCell: {
        backgroundColor: theme.palette.mode === 'dark' ? undefined : theme.palette.primary.light,
        color: theme.palette.mode === 'dark' ? undefined : 'white',
    }
}))

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const styleguideSection = '#/Style%20Guide/Experimental%20Alarm%20Handler'
const styleguideURL = window.location.protocol + "//" + window.location.hostname + ':6060/' + styleguideSection

const HelpDialog = (props) => {

    const classes = useStyles()
    const theme = useTheme()

    return (
        <Dialog
            open={props.open}
            TransitionComponent={Transition}
            onClose={props.handleClose}
            fullWidth
            maxWidth='md'
        >
            <DialogTitle >Alarm notification abridged help</DialogTitle>
            <DialogContent>
                <Typography
                    style={{ marginBottom: 20 }}
                    variant='body2'
                >
                    Use the <Box fontWeight='fontWeightBold' component='span'>[EDIT ALARM USERS]</Box> button to add/remove alarm users. This can only be done by an
                    alarmAdmin role user.
                </Typography>
                <Typography />
                <Typography
                    variant='body2'
                    style={{ marginBottom: 10 }}
                >
                    Use the edit icon (<EditIcon />) under the <Box fontWeight='fontWeightBold' component='span'>[Actions]</Box> column of the users table to add/delete notification expressions for a given user.
                    The notification expressions are composed using Javascript regular expressions. Some examples are shown below.
                </Typography>
                <TableContainer
                    style={{ marginBottom: 10 }}
                    component={Paper}
                    elevation={theme.palette.mode === 'dark' ? undefined : 5}
                >
                    <Table stickyHeader size="small">
                        <TableHead>
                            <TableRow                       >
                                <TableCell align="center" classes={{ stickyHeader: classes.styledTableHeadCell }}>Expression</TableCell>
                                <TableCell align="left" classes={{ stickyHeader: classes.styledTableHeadCell }}>Description</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell align="center">[...]</TableCell>
                                <TableCell>
                                    Match any character between the brackets
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell align="center">^p</TableCell>
                                <TableCell>
                                    Match any string with p at the beginning of it
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell align="center">p$</TableCell>
                                <TableCell>
                                    Match any string with p at the end of it
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell align="center">(foo|bar|baz)</TableCell>
                                <TableCell>
                                    Match any of the alternatives specified
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
                <Typography
                    style={{ marginBottom: 20 }}
                    variant='body2'
                >
                    For more examples and information on JS regular expressions see:
                    <Link
                        href={"https://www.tutorialspoint.com/javascript/javascript_regexp_object.htm"}
                        target="_blank"
                    >
                        {` www.tutorialspoint.com`}
                    </Link>
                        . Typing in an expression in the <Box fontWeight='fontWeightBold' component='span'>[Actions]</Box> column will also evaluate the
                        expression and show the list of pvs matched in the filtered pv list below.
                </Typography>
                <Typography
                    style={{ marginBottom: 20 }}
                    variant='body2'
                >
                    To edit the notification schedule for a given user use the calendar icon (<EventIcon />) in the last column of the users table. Schedules can be set globally
                    or per notification expression.
                </Typography>
                <Typography
                    style={{ marginBottom: 20 }}
                    variant='body2'
                >
                    For a complete guide on setting up and using the alarm handler refer to the
                    <Link
                        href={styleguideURL}
                        target="_blank"
                    >
                        {` RAS Styleguide`}
                    </Link>
                        .
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.handleClose} color="primary">
                    Okay
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default React.memo(HelpDialog);