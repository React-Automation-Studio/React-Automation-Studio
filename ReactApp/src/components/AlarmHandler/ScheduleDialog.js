import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
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
import EmailOutlinedIcon from '@material-ui/icons/EmailOutlined';
import SmsOutlinedIcon from '@material-ui/icons/SmsOutlined';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import SignalIcon from './SignalIcon';
// import Slide from '@material-ui/core/Slide';

import DateFnsUtils from '@date-io/date-fns';
import { formatISO, isSameDay, isAfter, parseISO, setSeconds, startOfDay, endOfDay } from 'date-fns';

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

    // console.table(theme)

    const { global } = props.dialogUserObject

    const displayUserObject = global
        ? props.dialogUserObject.globalSetup
        : props.dialogUserObject.notifyPVs[props.dialogUserNotifyIndex].notifySetup

    const fromTime = displayUserObject.fromTime
        ? parseISO(displayUserObject.fromTime)
        : setSeconds(new Date(), 0)
    const toTime = displayUserObject.toTime
        ? parseISO(displayUserObject.toTime)
        : setSeconds(new Date(), 0)

    const fromDate = displayUserObject.fromDate
        ? parseISO(displayUserObject.fromDate)
        : startOfDay(new Date())
    const toDate = displayUserObject.toDate
        ? parseISO(displayUserObject.toDate)
        : endOfDay(new Date())

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
            // Check oneMedium is checked
            const oneMedium = !event.target.checked
                // Backwards compatible
                ? props.dialogUserObject.globalSetup.sms || props.dialogUserObject.globalSetup.whatsapp || (props.dialogUserObject.globalSetup.signal ?? false)
                : true
            //
            if (oneMedium) {
                props.setDialogUserObject({
                    ...props.dialogUserObject,
                    globalSetup: {
                        ...props.dialogUserObject.globalSetup,
                        email: event.target.checked
                    }
                })
            }
            else {
                props.setSnackMessage("At least one notification medium must be set!")
            }

        }
        else {
            const newNotifyPVs = props.dialogUserObject.notifyPVs.map((area, index) => {
                if (props.dialogUserNotifyIndex !== index) {
                    return area
                }
                else {
                    // Check oneMedium is checked
                    const oneMedium = !event.target.checked
                        // Backwards compatible
                        ? area.notifySetup.sms || area.notifySetup.whatsapp || (area.notifySetup.signal ?? false)
                        : true
                    //
                    if (oneMedium) {
                        const newArea = {
                            ...area,
                            notifySetup: {
                                ...area.notifySetup,
                                email: event.target.checked
                            }
                        }
                        return newArea
                    }
                    else {
                        props.setSnackMessage("At least one notification medium must be set!")
                        return area
                    }
                }
            })
            props.setDialogUserObject({
                ...props.dialogUserObject,
                notifyPVs: newNotifyPVs
            })
        }
    }

    const handleSMS = (event) => {
        if (global) {
            // Check oneMedium is checked
            const oneMedium = !event.target.checked
                // Backwards compatible
                ? props.dialogUserObject.globalSetup.email || props.dialogUserObject.globalSetup.whatsapp || (props.dialogUserObject.globalSetup.signal ?? false)
                : true
            //
            if (oneMedium) {
                props.setDialogUserObject({
                    ...props.dialogUserObject,
                    globalSetup: {
                        ...props.dialogUserObject.globalSetup,
                        sms: event.target.checked
                    }
                })
            }
            else {
                props.setSnackMessage("At least one notification medium must be set!")
            }
        }
        else {
            const newNotifyPVs = props.dialogUserObject.notifyPVs.map((area, index) => {
                if (props.dialogUserNotifyIndex !== index) {
                    return area
                }
                else {
                    // Check oneMedium is checked
                    const oneMedium = !event.target.checked
                        // Backwards compatible
                        ? area.notifySetup.email || area.notifySetup.whatsapp || (area.notifySetup.signal ?? false)
                        : true
                    //
                    if (oneMedium) {
                        const newArea = {
                            ...area,
                            notifySetup: {
                                ...area.notifySetup,
                                sms: event.target.checked
                            }
                        }
                        return newArea
                    }
                    else {
                        props.setSnackMessage("At least one notification medium must be set!")
                        return area
                    }

                }
            })
            props.setDialogUserObject({
                ...props.dialogUserObject,
                notifyPVs: newNotifyPVs
            })
        }
    }

    const handleWhatsApp = (event) => {
        if (global) {
            // Check oneMedium is checked
            const oneMedium = !event.target.checked
                // Backwards compatible
                ? props.dialogUserObject.globalSetup.email || props.dialogUserObject.globalSetup.sms || (props.dialogUserObject.globalSetup.signal ?? false)
                : true
            //
            if (oneMedium) {
                props.setDialogUserObject({
                    ...props.dialogUserObject,
                    globalSetup: {
                        ...props.dialogUserObject.globalSetup,
                        whatsapp: event.target.checked
                    }
                })
            }
            else {
                props.setSnackMessage("At least one notification medium must be set!")
            }
        }
        else {
            const newNotifyPVs = props.dialogUserObject.notifyPVs.map((area, index) => {
                if (props.dialogUserNotifyIndex !== index) {
                    return area
                }
                else {
                    // Check oneMedium is checked
                    const oneMedium = !event.target.checked
                        // Backwards compatible
                        ? area.notifySetup.email || area.notifySetup.sms || (area.notifySetup.signal ?? false)
                        : true
                    //
                    if (oneMedium) {
                        const newArea = {
                            ...area,
                            notifySetup: {
                                ...area.notifySetup,
                                whatsapp: event.target.checked
                            }
                        }
                        return newArea
                    }
                    else {
                        props.setSnackMessage("At least one notification medium must be set!")
                        return area
                    }

                }
            })
            props.setDialogUserObject({
                ...props.dialogUserObject,
                notifyPVs: newNotifyPVs
            })
        }
    }

    const handleSignal = (event) => {
        if (global) {
            // Check oneMedium is checked
            const oneMedium = !event.target.checked
                ? props.dialogUserObject.globalSetup.email || props.dialogUserObject.globalSetup.sms || props.dialogUserObject.globalSetup.whatsapp
                : true
            //
            if (oneMedium) {
                props.setDialogUserObject({
                    ...props.dialogUserObject,
                    globalSetup: {
                        ...props.dialogUserObject.globalSetup,
                        signal: event.target.checked
                    }
                })
            }
            else {
                props.setSnackMessage("At least one notification medium must be set!")
            }
        }
        else {
            const newNotifyPVs = props.dialogUserObject.notifyPVs.map((area, index) => {
                if (props.dialogUserNotifyIndex !== index) {
                    return area
                }
                else {
                    // Check oneMedium is checked
                    const oneMedium = !event.target.checked
                        // Backwards compatible
                        ? area.notifySetup.email || area.notifySetup.sms || area.notifySetup.whatsapp
                        : true
                    //
                    if (oneMedium) {
                        const newArea = {
                            ...area,
                            notifySetup: {
                                ...area.notifySetup,
                                signal: event.target.checked
                            }
                        }
                        return newArea
                    }
                    else {
                        props.setSnackMessage("At least one notification medium must be set!")
                        return area
                    }

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
        const newTime = formatISO(setSeconds(event, 0))
        if (global) {
            props.setDialogUserObject({
                ...props.dialogUserObject,
                globalSetup: {
                    ...props.dialogUserObject.globalSetup,
                    fromTime: newTime,
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
        const newTime = formatISO(setSeconds(event, 0))
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
                // Check at least one day selected
                let days = Object.entries(props.dialogUserObject.globalSetup.days).reduce((acc, day) => {
                    if (day[1]) {
                        acc.push(day[0])
                    }
                    return acc
                }, [])
                const lastDayChecked = days.length === 1 && days[0] === day
                //
                if (lastDayChecked) {
                    props.setSnackMessage("At least one day must be selected!")
                }
                else {
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
            }
            else {
                const newNotifyPVs = props.dialogUserObject.notifyPVs.map((area, index) => {
                    if (props.dialogUserNotifyIndex !== index) {
                        return area
                    }
                    else {
                        // Check at least one day selected
                        let days = Object.entries(area.notifySetup.days).reduce((acc, day) => {
                            if (day[1]) {
                                acc.push(day[0])
                            }
                            return acc
                        }, [])
                        const lastDayChecked = days.length === 1 && days[0] === day
                        //
                        if (lastDayChecked) {
                            props.setSnackMessage("At least one day must be selected!")
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
        const newDate = formatISO(startOfDay(event))
        if (global) {
            // Check if fromDate after toDate
            let newDateAfterToDate = false
            if (isAfter(parseISO(newDate), parseISO(props.dialogUserObject.globalSetup.toDate))) {
                newDateAfterToDate = true
            }
            //
            props.setDialogUserObject({
                ...props.dialogUserObject,
                globalSetup: {
                    ...props.dialogUserObject.globalSetup,
                    fromDate: newDate,
                    toDate: newDateAfterToDate
                        ? newDate
                        : props.dialogUserObject.globalSetup.toDate
                }
            })
        }
        else {
            const newNotifyPVs = props.dialogUserObject.notifyPVs.map((area, index) => {
                if (props.dialogUserNotifyIndex !== index) {
                    return area
                }
                else {
                    // Check if fromDate after toDate
                    let newDateAfterToDate = false
                    if (isAfter(parseISO(newDate), parseISO(area.notifySetup.toDate))) {
                        newDateAfterToDate = true
                    }
                    //
                    const newArea = {
                        ...area,
                        notifySetup: {
                            ...area.notifySetup,
                            fromDate: newDate,
                            toDate: newDateAfterToDate
                                ? newDate
                                : area.notifySetup.toDate
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
        const newDate = formatISO(endOfDay(event))
        if (global) {
            // Check if toDate after fromDate
            let newDateAfterFromDate = false
            if (isAfter(parseISO(newDate), parseISO(props.dialogUserObject.globalSetup.fromDate))) {
                newDateAfterFromDate = true
            }
            else if (isSameDay(parseISO(newDate), parseISO(props.dialogUserObject.globalSetup.fromDate))) {
                newDateAfterFromDate = true
            }
            //
            if (newDateAfterFromDate) {
                props.setDialogUserObject({
                    ...props.dialogUserObject,
                    globalSetup: {
                        ...props.dialogUserObject.globalSetup,
                        toDate: newDate
                    }
                })
            }
            else {
                props.setSnackMessage("To date must be after from date!")
            }

        }
        else {
            const newNotifyPVs = props.dialogUserObject.notifyPVs.map((area, index) => {
                if (props.dialogUserNotifyIndex !== index) {
                    return area
                }
                else {
                    // Check if toDate after fromDate
                    let newDateAfterFromDate = false
                    if (isAfter(parseISO(newDate), parseISO(area.notifySetup.fromDate))) {
                        newDateAfterFromDate = true
                    }
                    else if (isSameDay(parseISO(newDate), parseISO(area.notifySetup.fromDate))) {
                        newDateAfterFromDate = true
                    }
                    //
                    if (newDateAfterFromDate) {
                        const newArea = {
                            ...area,
                            notifySetup: {
                                ...area.notifySetup,
                                toDate: newDate
                            }
                        }
                        return newArea
                    }
                    else {
                        props.setSnackMessage("To date must be after from date!")
                        return area
                    }
                }
            })
            props.setDialogUserObject({
                ...props.dialogUserObject,
                notifyPVs: newNotifyPVs
            })
        }
    }

    const handleAlarmType = (event, alarmType) => {
        if (global) {
            props.setDialogUserObject({
                ...props.dialogUserObject,
                globalSetup: {
                    ...props.dialogUserObject.globalSetup,
                    [alarmType]: event.target.checked
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
                            [alarmType]: event.target.checked
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
                                    disabled={props.dialogUserObject.notifyPVs.length === 0}
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
                                        key={`${index}-${area.regEx}`}
                                        label={area.regEx}
                                        variant={index === props.dialogUserNotifyIndex || global ? undefined : "outlined"}
                                        color="secondary"
                                        className={classes.chip}
                                        onClick={() => props.setDialogUserNotifyIndex(index)}
                                        disabled={global}
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
                            style={{
                                paddingLeft: '1em',
                                paddingRight: '1em'
                            }}
                        >
                            <Grid item xs={3}>
                                <Grid
                                    container
                                    direction="row"
                                    justify="center"
                                    alignItems="stretch"
                                >
                                    <Grid item className={classes.verticalCenter}>
                                        <span style={{ fontSize: '1rem', marginRight: 'auto' }}>MINOR</span>
                                    </Grid>
                                    <Grid item >
                                        <Checkbox
                                            // Backwards compatible
                                            checked={displayUserObject.alarmMinor ?? true}
                                            onChange={(event) => handleAlarmType(event, 'alarmMinor')}
                                            disabled={!displayUserObject.notify}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={3}>
                                <Grid
                                    container
                                    direction="row"
                                    justify="center"
                                    alignItems="stretch"
                                >
                                    <Grid item className={classes.verticalCenter}>
                                        <span style={{ fontSize: '1rem' }}>MAJOR</span>
                                    </Grid>
                                    <Grid item >
                                        <Checkbox
                                            // Backwards compatible
                                            checked={displayUserObject.alarmMajor ?? true}
                                            onChange={(event) => handleAlarmType(event, 'alarmMajor')}
                                            disabled={!displayUserObject.notify}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={3}>
                                <Grid
                                    container
                                    direction="row"
                                    justify="center"
                                    alignItems="stretch"
                                >
                                    <Grid item className={classes.verticalCenter}>
                                        <span style={{ fontSize: '1rem' }}>INVALID</span>
                                    </Grid>
                                    <Grid item >
                                        <Checkbox
                                            // Backwards compatible
                                            checked={displayUserObject.alarmInvalid ?? true}
                                            onChange={(event) => handleAlarmType(event, 'alarmInvalid')}
                                            disabled={!displayUserObject.notify}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={3}>
                                <Grid
                                    container
                                    direction="row"
                                    justify="center"
                                    alignItems="stretch"
                                >
                                    <Grid item className={classes.verticalCenter}>
                                        <span style={{ fontSize: '1rem' }}>DISCONN</span>
                                    </Grid>
                                    <Grid item >
                                        <Checkbox
                                            // Backwards compatible
                                            checked={displayUserObject.alarmDisconn ?? true}
                                            onChange={(event) => handleAlarmType(event, 'alarmDisconn')}
                                            disabled={!displayUserObject.notify}
                                        />
                                    </Grid>
                                </Grid>
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
                            <Grid item xs={6}>
                                <Grid
                                    container
                                    direction="row"
                                    justify="center"
                                    alignItems="stretch"
                                >
                                    <Grid item xs={3} className={classes.centerInBlock}>
                                        <EmailOutlinedIcon />
                                    </Grid>
                                    <Grid item xs={4} className={classes.verticalCenter}>
                                        <span style={{ fontSize: '1rem' }}>Email</span>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <Checkbox
                                            checked={displayUserObject.email}
                                            onChange={handleEmail}
                                            disabled={!displayUserObject.notify}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={6}>
                                <Grid
                                    container
                                    direction="row"
                                    justify="center"
                                    alignItems="stretch"
                                >
                                    <Grid item xs={3} className={classes.centerInBlock}>
                                        <WhatsAppIcon />
                                    </Grid>
                                    <Grid item xs={4} className={classes.verticalCenter}>
                                        <span style={{ fontSize: '1rem' }}>WhatsApp</span>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <Checkbox
                                            checked={displayUserObject.whatsapp}
                                            onChange={handleWhatsApp}
                                            disabled={!displayUserObject.notify}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={6}>
                                <Grid
                                    container
                                    direction="row"
                                    justify="center"
                                    alignItems="stretch"
                                >
                                    <Grid item xs={3} className={classes.centerInBlock}>
                                        <SmsOutlinedIcon />
                                    </Grid>
                                    <Grid item xs={4} className={classes.verticalCenter}>
                                        <span style={{ fontSize: '1rem' }}>SMS</span>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <Checkbox
                                            checked={displayUserObject.sms}
                                            onChange={handleSMS}
                                            disabled={!displayUserObject.notify}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={6}>
                                <Grid
                                    container
                                    direction="row"
                                    justify="center"
                                    alignItems="stretch"
                                >
                                    <Grid item xs={3} className={classes.centerInBlock}>
                                        <SignalIcon />
                                    </Grid>
                                    <Grid item xs={4} className={classes.verticalCenter}>
                                        <span style={{ fontSize: '1rem' }}>Signal</span>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <Checkbox
                                            // Backwards compatible
                                            checked={displayUserObject.signal ?? false}
                                            onChange={handleSignal}
                                            disabled={!displayUserObject.notify}
                                        />
                                    </Grid>
                                </Grid>
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