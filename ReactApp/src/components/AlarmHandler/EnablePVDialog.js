import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

import DateFnsUtils from '@date-io/date-fns';
import { formatISO, parseISO, setSeconds, addHours } from 'date-fns';

import {
    MuiPickersUtilsProvider,
    DateTimePicker,
} from '@material-ui/pickers';

// Styles
const useStyles = makeStyles(theme => ({
    boldText: {
        fontWeight: 500,
        textAlign: 'center',
    },
    centerInBlock: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: 'center'
    },
    verticalMiddle: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
    }
}))


const EnablePVDialog = (props) => {
    const classes = useStyles()

    // Backwards compatible
    const dateTime = (props.data.bridge ?? false)
        ? parseISO(props.data.bridgeTime)
        : setSeconds(addHours(new Date(), 1), 0)

    const handleEnable = () => {
        props.setEnablePVDialogData({
            ...props.data,
            enable: true,
            bridge: false
        })
    }

    const handleDisable = () => {
        props.setEnablePVDialogData({
            ...props.data,
            enable: false,
            bridge: false
        })
    }

    const handleBridge = () => {
        props.setEnablePVDialogData({
            ...props.data,
            enable: false,
            bridge: true,
            bridgeTime: formatISO(dateTime)
        })
    }

    const handleBridgeTime = (event) => {
        const newDateTime = formatISO(setSeconds(event, 0))
        props.setEnablePVDialogData({
            ...props.data,
            bridgeTime: newDateTime
        })
    }

    return (
        <Dialog
            open={props.open}
            onClose={props.handleClose}
            fullWidth
            maxWidth={"xs"}
        >
            <DialogTitle >{`${props.data.name}`}</DialogTitle>
            <DialogContent>
                <Grid
                    container
                    direction="row"
                    justify="flex-start"
                    alignItems="stretch"
                    spacing={2}
                >
                    <Grid item xs={6} className={classes.centerInBlock}>
                        <FormControlLabel
                            control={
                                <Radio
                                    color="secondary"
                                    checked={props.data.enable}
                                    onChange={handleEnable}
                                />
                            }
                            label="ENABLE"
                        />
                    </Grid>
                    <Grid item xs={6} className={classes.centerInBlock}>
                        <FormControlLabel
                            control={
                                <Radio
                                    color="secondary"
                                    // Backwards compatible
                                    checked={!props.data.enable && !(props.data.bridge ?? false)}
                                    onChange={handleDisable}
                                />
                            }
                            label="DISABLE"
                        />
                    </Grid>
                    <Grid item xs={12} style={{ marginTop: '0.5em', marginBottom: '0.5em' }}>
                        <Divider variant="middle" />
                    </Grid>
                    <Grid item xs={12} className={classes.centerInBlock}>
                        <FormControlLabel
                            control={
                                <Radio
                                    color="secondary"
                                    // Backwards compatible
                                    checked={props.data.bridge ?? false}
                                    onChange={handleBridge}
                                />
                            }
                            label="BRIDGE"
                        />
                        <Typography style={{
                            marginRight: '1em'
                        }}
                        >until</Typography>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <DateTimePicker
                                format="dd MMMM yyyy HH:mm"
                                value={dateTime}
                                onChange={handleBridgeTime}
                                ampm={false}
                                disablePast
                                autoOk={false}
                                // Backwards compatible
                                disabled={!props.data.bridge ?? true}
                            />
                        </MuiPickersUtilsProvider>
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={props.executeEnablePV} color="secondary">
                    OKAY
                </Button>
            </DialogActions>
        </Dialog >
    )
}

export default React.memo(EnablePVDialog);