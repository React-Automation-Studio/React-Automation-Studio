import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Radio from '@material-ui/core/Radio';
import Switch from '@material-ui/core/Switch';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import ScheduleIcon from '@material-ui/icons/Schedule';
import EmailIcon from '@material-ui/icons/Email';
import CallIcon from '@material-ui/icons/Call';
// import Slide from '@material-ui/core/Slide';

import DateFnsUtils from '@date-io/date-fns';
import { formatISO } from 'date-fns';

import {
    MuiPickersUtilsProvider,
    TimePicker,
    DatePicker,
} from '@material-ui/pickers';

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(1),
        paddingTop: theme.spacing(2),
        width: "100%",
        margin: 0
    },
    centerInBlock: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: 'center'
    },
    horizontalCenter: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
    },
    selectedAvatar: {
        color: theme.palette.getContrastText(theme.palette.secondary.main),
        backgroundColor: theme.palette.secondary.main,
    },
    smallAvatar: {
        width: theme.spacing(4),
        height: theme.spacing(4),
        marginLeft: '0.4em',
        marginRight: '0.4em',
        cursor: props => props.dialogUserObject.weekly && props.dialogUserObject.notify ? 'pointer' : null
    },
    verticalCenter: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
    }
}))

const ScheduleDialog = (props) => {

    const classes = useStyles(props)
    // const theme = useTheme()

    const fromTime = props.dialogUserObject.fromTime
        ? new Date(props.dialogUserObject.fromTime)
        : new Date()
    const toTime = props.dialogUserObject.toTime
        ? new Date(props.dialogUserObject.toTime)
        : new Date()

    const fromDate = props.dialogUserObject.fromDate
        ? new Date(props.dialogUserObject.fromDate)
        : new Date()
    const toDate = props.dialogUserObject.toDate
        ? new Date(props.dialogUserObject.toDate)
        : new Date()

    // const Transition = React.forwardRef(function Transition(props, ref) {
    //     return <Slide direction="left" ref={ref} {...props} />
    // })

    const handleNotify = (event) => {
        props.setDialogUserObject({ ...props.dialogUserObject, notify: event.target.checked })
    }

    const handleEmail = (event) => {
        props.setDialogUserObject({ ...props.dialogUserObject, email: event.target.checked })
    }

    const handleMobile = (event) => {
        props.setDialogUserObject({ ...props.dialogUserObject, mobile: event.target.checked })
    }

    const handleAllDay = (event) => {
        if (!event.target.checked) {
            props.setDialogUserObject({
                ...props.dialogUserObject,
                allDay: event.target.checked,
                fromTime: formatISO(fromTime),
                toTime: formatISO(toTime)
            })
        }
        else {
            props.setDialogUserObject({ ...props.dialogUserObject, allDay: event.target.checked })
        }
    }

    const handleFromTime = (event) => {
        const newTime = formatISO(event)
        props.setDialogUserObject({ ...props.dialogUserObject, fromTime: newTime })

    }

    const handleToTime = (event) => {
        const newTime = formatISO(event)
        props.setDialogUserObject({ ...props.dialogUserObject, toTime: newTime })

    }

    const handleWeekly = () => {
        props.setDialogUserObject({
            ...props.dialogUserObject,
            weekly: true,
            dateRange: false
        })
    }

    const handleDay = (day) => {
        if (props.dialogUserObject.weekly && props.dialogUserObject.notify) {
            props.setDialogUserObject({
                ...props.dialogUserObject,
                days: {
                    ...props.dialogUserObject.days,
                    [day]: !props.dialogUserObject.days[day],
                }
            })
        }
    }

    const handleDateRange = () => {
        props.setDialogUserObject({
            ...props.dialogUserObject,
            weekly: false,
            dateRange: true,
            fromDate: formatISO(fromDate),
            toDate: formatISO(toDate)
        })
    }

    const handleFromDate = (event) => {
        const newDate = formatISO(event)
        props.setDialogUserObject({ ...props.dialogUserObject, fromDate: newDate })
    }

    const handleToDate = (event) => {
        const newDate = formatISO(event)
        props.setDialogUserObject({ ...props.dialogUserObject, toDate: newDate })
    }

    return (
        <Dialog
            // TransitionComponent={Transition}
            fullWidth
            // maxWidth='xl'
            open={props.dialogOpen}
            onBackdropClick={props.closeDialog}
            onClose={props.closeDialog}
        >
            <DialogTitle>{`${props.dialogUser.name}'s notification schedule`}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {props.userScheduleString(props.dialogUserObject)}
                </DialogContentText>
                <Grid
                    container
                    direction="row"
                    justify="flex-start"
                    alignItems="stretch"
                >
                    <Grid item xs={12}>
                        <Grid
                            container
                            direction="row"
                            justify="flex-start"
                            alignItems="stretch"
                        >
                            <Grid item xs={2} className={classes.centerInBlock}>
                                <NotificationsActiveIcon />
                            </Grid>
                            <Grid item xs={2} className={classes.verticalCenter}>
                                <span style={{ fontSize: '1rem' }}>Notify</span>
                            </Grid>
                            <Grid item xs={8}>
                                <Checkbox
                                    checked={props.dialogUserObject.notify}
                                    onChange={handleNotify}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} style={{ marginTop: '0.75em', marginBottom: '0.75em' }}>
                        <Divider variant="middle" />
                    </Grid>
                    <Grid item xs={12}>
                        <Grid
                            container
                            direction="row"
                            justify="flex-start"
                            alignItems="stretch"
                        >
                            <Grid item xs={2} className={classes.centerInBlock}>
                                <EmailIcon />
                            </Grid>
                            <Grid item xs={2} className={classes.verticalCenter}>
                                <span style={{ fontSize: '1rem' }}>Email</span>
                            </Grid>
                            <Grid item xs={8}>
                                <Checkbox
                                    checked={props.dialogUserObject.email}
                                    onChange={handleEmail}
                                    disabled={!props.dialogUserObject.notify}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid
                            container
                            direction="row"
                            justify="flex-start"
                            alignItems="stretch"
                        >
                            <Grid item xs={2} className={classes.centerInBlock}>
                                <CallIcon />
                            </Grid>
                            <Grid item xs={2} className={classes.verticalCenter}>
                                <span style={{ fontSize: '1rem' }}>Mobile</span>
                            </Grid>
                            <Grid item xs={8}>
                                <Checkbox
                                    checked={props.dialogUserObject.mobile}
                                    onChange={handleMobile}
                                    disabled={!props.dialogUserObject.notify || true}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} style={{ marginTop: '0.75em', marginBottom: '0.75em' }}>
                        <Divider variant="middle" />
                    </Grid>
                    <Grid item xs={12}>
                        <Grid
                            container
                            direction="row"
                            justify="flex-start"
                            alignItems="stretch"
                        >
                            <Grid item xs={2} className={classes.centerInBlock}>
                                <ScheduleIcon />
                            </Grid>
                            <Grid item xs={2} className={classes.verticalCenter}>
                                <span style={{ fontSize: '1rem' }}>All-day</span>
                            </Grid>
                            <Grid item xs={2}>
                                <Switch
                                    checked={props.dialogUserObject.allDay}
                                    onChange={handleAllDay}
                                    disabled={!props.dialogUserObject.notify}
                                />
                            </Grid>
                            {props.dialogUserObject.allDay &&
                                <Grid item xs={6}></Grid>
                            }
                            {!props.dialogUserObject.allDay &&
                                <Grid item xs={6}>
                                    <Grid
                                        container
                                        direction="row"
                                        justify="flex-start"
                                        alignItems="stretch"
                                    >
                                        <Grid item xs={3} className={classes.verticalCenter}>
                                            From
                                    </Grid>
                                        <Grid item xs={9} >
                                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                <TimePicker
                                                    value={fromTime}
                                                    onChange={handleFromTime}
                                                    disabled={!props.dialogUserObject.notify}
                                                />
                                            </MuiPickersUtilsProvider>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            }
                            {!props.dialogUserObject.allDay &&
                                <Grid item xs={6}>
                                </Grid>
                            }
                            {!props.dialogUserObject.allDay &&
                                <Grid item xs={6} >
                                    <Grid
                                        container
                                        direction="row"
                                        justify="flex-start"
                                        alignItems="stretch"
                                    >
                                        <Grid item xs={3} className={classes.verticalCenter}>
                                            To
                                    </Grid>
                                        <Grid item xs={9} >
                                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                <TimePicker
                                                    value={toTime}
                                                    onChange={handleToTime}
                                                    disabled={!props.dialogUserObject.notify}
                                                />
                                            </MuiPickersUtilsProvider>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            }
                        </Grid>
                    </Grid>
                    <Grid item xs={12} style={{ marginTop: '0.75em', marginBottom: '0.75em' }}>
                        <Divider variant="middle" />
                    </Grid>
                    <Grid item xs={12} >
                        <Grid
                            container
                            direction="row"
                            justify="flex-start"
                            alignItems="stretch"
                        >
                            <Grid item xs={2} className={classes.centerInBlock}>
                                <Radio
                                    checked={props.dialogUserObject.weekly}
                                    onChange={handleWeekly}
                                    disabled={!props.dialogUserObject.notify}
                                />
                            </Grid>
                            <Grid item xs={2} className={classes.verticalCenter}>
                                <span style={{ fontSize: '1rem' }}>Weekly</span>
                            </Grid>
                            <Grid item xs={8} className={classes.verticalCenter}>
                                <Grid
                                    container
                                    direction="row"
                                    justify="flex-start"
                                    alignItems="stretch"
                                >
                                    <Grid item>
                                        <Avatar onClick={() => handleDay('Monday')} style={{ marginLeft: '1em' }} className={[classes.smallAvatar, props.dialogUserObject.notify && props.dialogUserObject.weekly && props.dialogUserObject.days.Monday ? classes.selectedAvatar : null].join(' ')}>M</Avatar>
                                    </Grid>
                                    <Grid item>
                                        <Avatar onClick={() => handleDay('Tuesday')} className={[classes.smallAvatar, props.dialogUserObject.notify && props.dialogUserObject.weekly && props.dialogUserObject.days.Tuesday ? classes.selectedAvatar : null].join(' ')}>T</Avatar>
                                    </Grid>
                                    <Grid item>
                                        <Avatar onClick={() => handleDay('Wednesday')} className={[classes.smallAvatar, props.dialogUserObject.notify && props.dialogUserObject.weekly && props.dialogUserObject.days.Wednesday ? classes.selectedAvatar : null].join(' ')}>W</Avatar>
                                    </Grid>
                                    <Grid item>
                                        <Avatar onClick={() => handleDay('Thursday')} className={[classes.smallAvatar, props.dialogUserObject.notify && props.dialogUserObject.weekly && props.dialogUserObject.days.Thursday ? classes.selectedAvatar : null].join(' ')}>T</Avatar>
                                    </Grid>
                                    <Grid item>
                                        <Avatar onClick={() => handleDay('Friday')} className={[classes.smallAvatar, props.dialogUserObject.notify && props.dialogUserObject.weekly && props.dialogUserObject.days.Friday ? classes.selectedAvatar : null].join(' ')}>F</Avatar>
                                    </Grid>
                                    <Grid item>
                                        <Avatar onClick={() => handleDay('Saturday')} className={[classes.smallAvatar, props.dialogUserObject.notify && props.dialogUserObject.weekly && props.dialogUserObject.days.Saturday ? classes.selectedAvatar : null].join(' ')}>S</Avatar>
                                    </Grid>
                                    <Grid item>
                                        <Avatar onClick={() => handleDay('Sunday')} className={[classes.smallAvatar, props.dialogUserObject.notify && props.dialogUserObject.weekly && props.dialogUserObject.days.Sunday ? classes.selectedAvatar : null].join(' ')}>S</Avatar>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={4} ></Grid>
                    <Grid item xs={8} style={{ marginTop: '0.75em', marginBottom: '0.75em' }}>
                        <Divider variant="middle" />
                    </Grid>
                    <Grid item xs={12} style={{ marginBottom: '1em' }}>
                        <Grid
                            container
                            direction="row"
                            justify="flex-start"
                            alignItems="stretch"
                        >
                            <Grid item xs={2} className={classes.centerInBlock}>
                                <Radio
                                    checked={props.dialogUserObject.dateRange}
                                    onChange={handleDateRange}
                                    disabled={!props.dialogUserObject.notify}
                                />
                            </Grid>
                            <Grid item xs={2} className={classes.verticalCenter}>
                                <span style={{ fontSize: '1rem' }}>Date range</span>
                            </Grid>
                            <Grid item xs={8}>
                                <Grid
                                    container
                                    direction="row"
                                    justify="flex-start"
                                    alignItems="stretch"
                                >
                                    <Grid item xs={2} style={{ marginLeft: '1.5em' }} className={classes.verticalCenter}>
                                        From
                                    </Grid>
                                    <Grid item xs={9}>
                                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                            <DatePicker
                                                format="dd MMMM yyyy"
                                                value={fromDate}
                                                onChange={handleFromDate}
                                                disabled={props.dialogUserObject.weekly}
                                                autoOk
                                            />
                                        </MuiPickersUtilsProvider>
                                    </Grid>
                                    <Grid item xs={2} style={{ marginLeft: '1.5em' }} className={classes.verticalCenter}>
                                        To
                                    </Grid>
                                    <Grid item xs={9}>
                                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                            <DatePicker
                                                format="dd MMMM yyyy"
                                                value={toDate}
                                                onChange={handleToDate}
                                                disabled={props.dialogUserObject.weekly}
                                                autoOk
                                            />
                                        </MuiPickersUtilsProvider>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.closeDialog} color="secondary">
                    Cancel
                </Button>
                <Button onClick={() => props.acceptDialog(props.dialogUser.name, props.dialogUser.username)} color="secondary">
                    Apply
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default React.memo(ScheduleDialog);