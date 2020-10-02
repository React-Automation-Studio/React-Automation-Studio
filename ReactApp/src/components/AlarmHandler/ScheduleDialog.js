import React from 'react';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import Radio from '@material-ui/core/Radio';
import Switch from '@material-ui/core/Switch';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import ScheduleIcon from '@material-ui/icons/Schedule';
// import Slide from '@material-ui/core/Slide';

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
    verticalCenter: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
    }
}))

const ScheduleDialog = (props) => {

    const classes = useStyles()
    const theme = useTheme()

    console.log(theme)

    // const Transition = React.forwardRef(function Transition(props, ref) {
    //     return <Slide direction="left" ref={ref} {...props} />
    // })

    return (
        <Dialog
            // TransitionComponent={Transition}
            fullWidth
            // maxWidth='xl'
            open={props.dialogOpen}
            onBackdropClick={props.closeDialog}
            onClose={props.closeDialog}
        >
            <DialogTitle>{`${props.name}'s notification schedule`}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Notify me all day everyday
                </DialogContentText>
                <Grid
                    container
                    direction="row"
                    justify="flex-start"
                    alignItems="stretch"
                >
                    <Grid item xs={12} style={{ marginBottom: '1em' }}>
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
                                <Checkbox />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} style={{ marginBottom: '1em' }}>
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
                            <Grid item xs={8}>
                                <Switch />
                            </Grid>
                            <Grid item xs={4}>
                            </Grid>
                            <Grid item xs={8} style={{ paddingLeft: '0.75em' }}>
                                From
                            </Grid>
                            <Grid item xs={4}>
                            </Grid>
                            <Grid item xs={8} style={{ paddingLeft: '0.75em' }}>
                                To
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} style={{ marginBottom: '1em' }}>
                        <Grid
                            container
                            direction="row"
                            justify="flex-start"
                            alignItems="stretch"
                        >
                            <Grid item xs={2} className={classes.centerInBlock}>
                                <Radio checked={true} />
                            </Grid>
                            <Grid item xs={2} className={classes.verticalCenter}>
                                <span style={{ fontSize: '1rem' }}>Weekly</span>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} style={{ marginBottom: '1em' }}>
                        <Grid
                            container
                            direction="row"
                            justify="flex-start"
                            alignItems="stretch"
                        >
                            <Grid item xs={2} className={classes.centerInBlock}>
                                <Radio />
                            </Grid>
                            <Grid item xs={2} className={classes.verticalCenter}>
                                <span style={{ fontSize: '1rem' }}>Date range</span>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.closeDialog} color="secondary">
                    Cancel
                </Button>
                <Button onClick={props.closeDialog} color="secondary">
                    Apply
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default React.memo(ScheduleDialog);