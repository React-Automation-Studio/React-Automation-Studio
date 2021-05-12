import React from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Typography from '@material-ui/core/Typography';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Link from '@material-ui/core/Link';
import EditIcon from '@material-ui/icons/Edit';
import EventIcon from '@material-ui/icons/Event';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const styleguideSection = '#/Style%20Guide/Experimental%20Alarm%20Handler'
const styleguideURL = window.location.protocol + "//" + window.location.hostname + ':6060/' + styleguideSection

const HelpDialog = (props) => {
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
                >
                    Use the <Box fontWeight='fontWeightBold' component='span'>[EDIT ALARM USERS]</Box> button to add/remove alarm users. This can only be done by an
                    alarmAdmin role user.
                </Typography>
                <Typography />
                <Typography
                    style={{ marginBottom: 20 }}
                >
                    Use the edit icon (<EditIcon />) under the <Box fontWeight='fontWeightBold' component='span'>[Actions]</Box> column of the users table to add/delete notification expressions for a given user.
                    The notification expressions are composed using Javascript regular expressions. For more information on JS regular expressions see:
                    <Link
                        href={"https://www.tutorialspoint.com/javascript/javascript_regexp_object.htm"}
                        target="_blank"
                    >
                        {` www.tutorialspoint.com`}
                    </Link>
                        .
                </Typography>
                <Typography
                    style={{ marginBottom: 20 }}
                >
                    To edit the notification schedule for a given user use the calendar icon (<EventIcon />) in the last column of the users table. Schedules can be set globally
                    or per notification expression.
                </Typography>
                <Typography
                    style={{ marginBottom: 20 }}
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