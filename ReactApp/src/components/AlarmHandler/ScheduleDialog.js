import React from 'react';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
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
import { formatISO, isFuture, isSameDay, isToday, isAfter } from 'date-fns';

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
    chip: {
        marginRight: '1em',
        marginTop: '0.5em',
        marginBottom: '0.5em'
    },
    chipOutlinedSecondary: {
        borderWidth: '1.5px'
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
    },
    verticalCenter: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
    }
}))

const ScheduleDialog = (props) => {

    const classes = useStyles(props)
    const theme = useTheme()

    // console.table(theme)

    const { global } = props.dialogUserObject

    const displayUserObject = global
        ? props.dialogUserObject.globalSetup
        : props.dialogUserObject.notifyPVs[props.dialogUserNotifyIndex].notifySetup

    const fromTime = displayUserObject.fromTime
        ? new Date(displayUserObject.fromTime)
        : new Date()
    const toTime = displayUserObject.toTime
        ? new Date(displayUserObject.toTime)
        : new Date()

    const fromDate = displayUserObject.fromDate
        ? new Date(displayUserObject.fromDate)
        : new Date()
    const toDate = displayUserObject.toDate
        ? new Date(displayUserObject.toDate)
        : new Date()

    // console.clear()
    // global
    //     ? console.log('Global')
    //     : console.log(props.dialogUserObject.notifyPVs[props.dialogUserNotifyIndex].regEx)

    // console.table(displayUserObject)

    // const Transition = React.forwardRef(function Transition(props, ref) {
    //     return <Slide direction="left" ref={ref} {...props} />
    // })

    const handleNotifyGlobal = (event) => {
        props.setDialogUserObject({ ...props.dialogUserObject, global: event.target.checked })
    }

    const handleNotify = (event) => {
        if (global) {
            props.setDialogUserObject({
                ...props.dialogUserObject,
                globalSetup: {
                    ...props.dialogUserObject.globalSetup,
                    notify: event.target.checked
                }
            })
        }
        else {
            const newNotifyPVs = props.dialogUserObject.notifyPVs.map((area, index) => {
                if (props.dialogUserNotifyIndex !== index) {
                    return area
                }
                else {
                    const newArea = {
                        ...area,
                        notifySetup: {
                            ...area.notifySetup,
                            notify: event.target.checked
                        }
                    }
                    return newArea
                }
            })
            props.setDialogUserObject({
                ...props.dialogUserObject,
                notifyPVs: newNotifyPVs
            })
        }
    }

    const handleEmail = (event) => {
        if (global) {
            props.setDialogUserObject({
                ...props.dialogUserObject,
                globalSetup: {
                    ...props.dialogUserObject.globalSetup,
                    email: event.target.checked
                }
            })
        }
        else {
            const newNotifyPVs = props.dialogUserObject.notifyPVs.map((area, index) => {
                if (props.dialogUserNotifyIndex !== index) {
                    return area
                }
                else {
                    const newArea = {
                        ...area,
                        notifySetup: {
                            ...area.notifySetup,
                            email: event.target.checked
                        }
                    }
                    return newArea
                }
            })
            props.setDialogUserObject({
                ...props.dialogUserObject,
                notifyPVs: newNotifyPVs
            })
        }
    }

    const handleMobile = (event) => {
        if (global) {
            props.setDialogUserObject({
                ...props.dialogUserObject,
                globalSetup: {
                    ...props.dialogUserObject.globalSetup,
                    mobile: event.target.checked
                }
            })
        }
        else {
            const newNotifyPVs = props.dialogUserObject.notifyPVs.map((area, index) => {
                if (props.dialogUserNotifyIndex !== index) {
                    return area
                }
                else {
                    const newArea = {
                        ...area,
                        notifySetup: {
                            ...area.notifySetup,
                            mobile: event.target.checked
                        }
                    }
                    return newArea
                }
            })
            props.setDialogUserObject({
                ...props.dialogUserObject,
                notifyPVs: newNotifyPVs
            })
        }
    }

    const handleAllDay = (event) => {
        if (global) {
            if (!event.target.checked) {
                props.setDialogUserObject({
                    ...props.dialogUserObject,
                    globalSetup: {
                        ...props.dialogUserObject.globalSetup,
                        allDay: event.target.checked,
                        fromTime: formatISO(fromTime),
                        toTime: formatISO(toTime)
                    }
                })
            }
            else {
                props.setDialogUserObject({
                    ...props.dialogUserObject,
                    globalSetup: {
                        ...props.dialogUserObject.globalSetup,
                        allDay: event.target.checked
                    }
                })
            }

        }
        else {
            const newNotifyPVs = props.dialogUserObject.notifyPVs.map((area, index) => {
                if (props.dialogUserNotifyIndex !== index) {
                    return area
                }
                else {
                    let newArea
                    if (!event.target.checked) {
                        newArea = {
                            ...area,
                            notifySetup: {
                                ...area.notifySetup,
                                allDay: event.target.checked,
                                fromTime: formatISO(fromTime),
                                toTime: formatISO(toTime)
                            }
                        }
                    }
                    else {
                        newArea = {
                            ...area,
                            notifySetup: {
                                ...area.notifySetup,
                                allDay: event.target.checked
                            }
                        }
                    }
                    return newArea
                }
            })
            props.setDialogUserObject({
                ...props.dialogUserObject,
                notifyPVs: newNotifyPVs
            })
        }
    }

    const handleFromTime = (event) => {
        const newTime = formatISO(event)
        if (global) {
            props.setDialogUserObject({
                ...props.dialogUserObject,
                globalSetup: {
                    ...props.dialogUserObject.globalSetup,
                    fromTime: newTime
                }
            })
        }
        else {
            const newNotifyPVs = props.dialogUserObject.notifyPVs.map((area, index) => {
                if (props.dialogUserNotifyIndex !== index) {
                    return area
                }
                else {
                    const newArea = {
                        ...area,
                        notifySetup: {
                            ...area.notifySetup,
                            fromTime: newTime
                        }
                    }
                    return newArea
                }
            })
            props.setDialogUserObject({
                ...props.dialogUserObject,
                notifyPVs: newNotifyPVs
            })
        }
    }

    const handleToTime = (event) => {
        const newTime = formatISO(event)
        if (global) {
            props.setDialogUserObject({
                ...props.dialogUserObject,
                globalSetup: {
                    ...props.dialogUserObject.globalSetup,
                    toTime: newTime
                }
            })
        }
        else {
            const newNotifyPVs = props.dialogUserObject.notifyPVs.map((area, index) => {
                if (props.dialogUserNotifyIndex !== index) {
                    return area
                }
                else {
                    const newArea = {
                        ...area,
                        notifySetup: {
                            ...area.notifySetup,
                            toTime: newTime
                        }
                    }
                    return newArea
                }
            })
            props.setDialogUserObject({
                ...props.dialogUserObject,
                notifyPVs: newNotifyPVs
            })
        }
    }

    const handleWeekly = () => {
        if (global) {
            props.setDialogUserObject({
                ...props.dialogUserObject,
                globalSetup: {
                    ...props.dialogUserObject.globalSetup,
                    weekly: true,
                    dateRange: false
                }
            })
        }
        else {
            const newNotifyPVs = props.dialogUserObject.notifyPVs.map((area, index) => {
                if (props.dialogUserNotifyIndex !== index) {
                    return area
                }
                else {
                    const newArea = {
                        ...area,
                        notifySetup: {
                            ...area.notifySetup,
                            weekly: true,
                            dateRange: false
                        }
                    }
                    return newArea
                }
            })
            props.setDialogUserObject({
                ...props.dialogUserObject,
                notifyPVs: newNotifyPVs
            })
        }
    }

    const handleDay = (day) => {
        if (displayUserObject.weekly && displayUserObject.notify) {
            if (global) {
                props.setDialogUserObject({
                    ...props.dialogUserObject,
                    globalSetup: {
                        ...props.dialogUserObject.globalSetup,
                        days: {
                            ...props.dialogUserObject.globalSetup.days,
                            [day]: !props.dialogUserObject.globalSetup.days[day],
                        }
                    }
                })
            }
            else {
                const newNotifyPVs = props.dialogUserObject.notifyPVs.map((area, index) => {
                    if (props.dialogUserNotifyIndex !== index) {
                        return area
                    }
                    else {
                        const newArea = {
                            ...area,
                            notifySetup: {
                                ...area.notifySetup,
                                days: {
                                    ...area.notifySetup.days,
                                    [day]: !area.notifySetup.days[day],
                                }
                            }
                        }
                        return newArea
                    }
                })
                props.setDialogUserObject({
                    ...props.dialogUserObject,
                    notifyPVs: newNotifyPVs
                })
            }
        }
    }

    const handleDateRange = () => {
        if (global) {
            props.setDialogUserObject({
                ...props.dialogUserObject,
                globalSetup: {
                    ...props.dialogUserObject.globalSetup,
                    weekly: false,
                    dateRange: true,
                    fromDate: formatISO(fromDate),
                    toDate: formatISO(toDate)
                }
            })
        }
        else {
            const newNotifyPVs = props.dialogUserObject.notifyPVs.map((area, index) => {
                if (props.dialogUserNotifyIndex !== index) {
                    return area
                }
                else {
                    const newArea = {
                        ...area,
                        notifySetup: {
                            ...area.notifySetup,
                            weekly: false,
                            dateRange: true,
                            fromDate: formatISO(fromDate),
                            toDate: formatISO(toDate)
                        }
                    }
                    return newArea
                }
            })
            props.setDialogUserObject({
                ...props.dialogUserObject,
                notifyPVs: newNotifyPVs
            })
        }
    }

    const handleFromDate = (event) => {
        const newDate = formatISO(event)
        if (global) {
            props.setDialogUserObject({
                ...props.dialogUserObject,
                globalSetup: {
                    ...props.dialogUserObject.globalSetup,
                    fromDate: newDate
                }
            })
        }
        else {
            const newNotifyPVs = props.dialogUserObject.notifyPVs.map((area, index) => {
                if (props.dialogUserNotifyIndex !== index) {
                    return area
                }
                else {
                    const newArea = {
                        ...area,
                        notifySetup: {
                            ...area.notifySetup,
                            fromDate: newDate
                        }
                    }
                    return newArea
                }
            })
            props.setDialogUserObject({
                ...props.dialogUserObject,
                notifyPVs: newNotifyPVs
            })
        }
    }

    const handleToDate = (event) => {
        const newDate = formatISO(event)
        if (global) {
            props.setDialogUserObject({
                ...props.dialogUserObject,
                globalSetup: {
                    ...props.dialogUserObject.globalSetup,
                    toDate: newDate
                }
            })
        }
        else {
            const newNotifyPVs = props.dialogUserObject.notifyPVs.map((area, index) => {
                if (props.dialogUserNotifyIndex !== index) {
                    return area
                }
                else {
                    const newArea = {
                        ...area,
                        notifySetup: {
                            ...area.notifySetup,
                            toDate: newDate
                        }
                    }
                    return newArea
                }
            })
            props.setDialogUserObject({
                ...props.dialogUserObject,
                notifyPVs: newNotifyPVs
            })
        }
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
            <DialogTitle className={classes.horizontalCenter}>
                {
                    global
                        ? `${props.dialogUserObject.name}'s notification schedule (Global)`
                        : `${props.dialogUserObject.name}'s notification schedule (${props.dialogUserObject.notifyPVs[props.dialogUserNotifyIndex].regEx})`
                }
            </DialogTitle>
            <DialogContent>
                <DialogContentText className={classes.horizontalCenter}>
                    {props.userScheduleString({ isGlobal: global, ...displayUserObject })}
                </DialogContentText>
                <Grid
                    container
                    direction="row"
                    justify="flex-start"
                    alignItems="stretch"
                >
                    <Grid item xs={12} style={{ marginTop: '0.75em', marginBottom: '0.75em' }}>
                        <Divider variant="middle" />
                    </Grid>
                    <Grid item xs={12}>
                        <Grid
                            container
                            direction="row"
                            justify="center"
                            alignItems="stretch"
                        >
                            <Grid item className={classes.centerInBlock}>
                                <span style={{ fontSize: '1.1rem', fontWeight: 500 }}>Unique schedule</span>
                            </Grid>
                            <Grid item className={classes.centerInBlock}>
                                <Switch
                                    checked={global}
                                    onChange={handleNotifyGlobal}
                                />
                            </Grid>
                            <Grid item className={classes.centerInBlock}>
                                <span style={{ fontSize: '1.1rem', fontWeight: 500 }}>Global schedule</span>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} style={{ marginTop: '0.75em', marginBottom: '0.75em' }}>
                        <Divider variant="middle" />
                    </Grid>
                    <Grid item xs={12} style={{ paddingLeft: 24, paddingRight: 24 }}>
                        {
                            props.dialogUserObject.notifyPVs.map((area, index) => {
                                return (
                                    <Chip
                                        classes={{ outlinedSecondary: classes.chipOutlinedSecondary }}
                                        key={area.regEx}
                                        label={area.regEx}
                                        variant={index === props.dialogUserNotifyIndex || global ? undefined : "outlined"}
                                        color="secondary"
                                        className={classes.chip}
                                        onClick={() => props.setDialogUserNotifyIndex(index)}
                                    />

                                )
                            })
                        }
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
                                <NotificationsActiveIcon />
                            </Grid>
                            <Grid item xs={2} className={classes.verticalCenter}>
                                <span style={{ fontSize: '1rem' }}>Notify</span>
                            </Grid>
                            <Grid item xs={8}>
                                <Checkbox
                                    checked={displayUserObject.notify}
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
                                    checked={displayUserObject.email}
                                    onChange={handleEmail}
                                    disabled={!displayUserObject.notify}
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
                                    checked={displayUserObject.mobile}
                                    onChange={handleMobile}
                                    disabled={!displayUserObject.notify || true}
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
                                    checked={displayUserObject.allDay}
                                    onChange={handleAllDay}
                                    disabled={!displayUserObject.notify}
                                />
                            </Grid>
                            {displayUserObject.allDay &&
                                <Grid item xs={6}></Grid>
                            }
                            {!displayUserObject.allDay &&
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
                                                    ampm={false}
                                                    value={fromTime}
                                                    onChange={handleFromTime}
                                                    disabled={!displayUserObject.notify}
                                                />
                                            </MuiPickersUtilsProvider>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            }
                            {!displayUserObject.allDay &&
                                <Grid item xs={6}>
                                </Grid>
                            }
                            {!displayUserObject.allDay &&
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
                                                    ampm={false}
                                                    value={toTime}
                                                    onChange={handleToTime}
                                                    disabled={!displayUserObject.notify}
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
                                    checked={displayUserObject.weekly}
                                    onChange={handleWeekly}
                                    disabled={!displayUserObject.notify}
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
                                        <Avatar onClick={() => handleDay('Monday')} style={{ marginLeft: '1em', cursor: displayUserObject.weekly && displayUserObject.notify ? 'pointer' : null }} className={[classes.smallAvatar, displayUserObject.notify && displayUserObject.weekly && displayUserObject.days.Monday ? classes.selectedAvatar : null].join(' ')}>M</Avatar>
                                    </Grid>
                                    <Grid item>
                                        <Avatar onClick={() => handleDay('Tuesday')} style={{ cursor: displayUserObject.weekly && displayUserObject.notify ? 'pointer' : null }} className={[classes.smallAvatar, displayUserObject.notify && displayUserObject.weekly && displayUserObject.days.Tuesday ? classes.selectedAvatar : null].join(' ')}>T</Avatar>
                                    </Grid>
                                    <Grid item>
                                        <Avatar onClick={() => handleDay('Wednesday')} style={{ cursor: displayUserObject.weekly && displayUserObject.notify ? 'pointer' : null }} className={[classes.smallAvatar, displayUserObject.notify && displayUserObject.weekly && displayUserObject.days.Wednesday ? classes.selectedAvatar : null].join(' ')}>W</Avatar>
                                    </Grid>
                                    <Grid item>
                                        <Avatar onClick={() => handleDay('Thursday')} style={{ cursor: displayUserObject.weekly && displayUserObject.notify ? 'pointer' : null }} className={[classes.smallAvatar, displayUserObject.notify && displayUserObject.weekly && displayUserObject.days.Thursday ? classes.selectedAvatar : null].join(' ')}>T</Avatar>
                                    </Grid>
                                    <Grid item>
                                        <Avatar onClick={() => handleDay('Friday')} style={{ cursor: displayUserObject.weekly && displayUserObject.notify ? 'pointer' : null }} className={[classes.smallAvatar, displayUserObject.notify && displayUserObject.weekly && displayUserObject.days.Friday ? classes.selectedAvatar : null].join(' ')}>F</Avatar>
                                    </Grid>
                                    <Grid item>
                                        <Avatar onClick={() => handleDay('Saturday')} style={{ cursor: displayUserObject.weekly && displayUserObject.notify ? 'pointer' : null }} className={[classes.smallAvatar, displayUserObject.notify && displayUserObject.weekly && displayUserObject.days.Saturday ? classes.selectedAvatar : null].join(' ')}>S</Avatar>
                                    </Grid>
                                    <Grid item>
                                        <Avatar onClick={() => handleDay('Sunday')} style={{ cursor: displayUserObject.weekly && displayUserObject.notify ? 'pointer' : null }} className={[classes.smallAvatar, displayUserObject.notify && displayUserObject.weekly && displayUserObject.days.Sunday ? classes.selectedAvatar : null].join(' ')}>S</Avatar>
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
                                    checked={displayUserObject.dateRange}
                                    onChange={handleDateRange}
                                    disabled={!displayUserObject.notify}
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
                                                disabled={displayUserObject.weekly || !displayUserObject.notify}
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
                                                disabled={displayUserObject.weekly || !displayUserObject.notify}
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
                <Button onClick={props.closeDialog}>
                    Cancel
                </Button>
                <Button onClick={() => props.acceptDialog(props.dialogUserObject.name, props.dialogUserObject.username)} color="secondary">
                    Apply
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default React.memo(ScheduleDialog);