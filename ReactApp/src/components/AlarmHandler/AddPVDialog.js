import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { Domain, Lan, LanConnect } from "mdi-material-ui/";

// Styles
const useStyles = makeStyles(theme => ({
    boldText: {
        fontWeight: 500,
    },
    centerInBlock: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: 'center'
    },
    connected: {
        color: theme.palette.ok.main
    },
    disconnected: {
        color: theme.palette.error.main
    },
    verticalMiddle: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
    }
}))


const AddPVDialog = (props) => {
    const classes = useStyles()
    const theme = useTheme()
    return (
        <Dialog
            open={props.open}
            onClose={props.handleClose}
            fullWidth
            maxWidth={"sm"}
        >
            <DialogTitle >{`Add new PV`}</DialogTitle>
            <DialogContent>
                <Grid
                    container
                    direction="row"
                    justify="flex-start"
                    alignItems="stretch"
                    spacing={2}
                >
                    <Grid item xs={12}>
                        <Grid
                            container
                            direction="row"
                            justify="flex-start"
                            alignItems="stretch"
                        >
                            <Grid item xs={2} className={classes.centerInBlock}>
                                <Domain />
                            </Grid>
                            <Grid item xs={2} className={classes.verticalMiddle} >
                                <Typography className={classes.boldText} >
                                    AREA
                                </Typography>
                            </Grid>
                            <Grid item xs={8} className={classes.verticalMiddle}>
                                <Typography>
                                    {`${props.newPVInfo["areaName"]}`}
                                </Typography>
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
                                <Lan />
                            </Grid>
                            <Grid item xs={2} className={classes.verticalMiddle} >
                                <Typography className={classes.boldText} >
                                    PV
                                </Typography>
                            </Grid>
                            <Grid item xs={8} className={classes.verticalMiddle}>
                                <TextField
                                    type='text'
                                    value={props.newPVInfo["pvName"]}
                                    onChange={() => console.log('h')}
                                    fullWidth
                                    autoFocus
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
                                <LanConnect />
                            </Grid>
                            <Grid item xs={2} className={classes.verticalMiddle} >
                                <Typography className={classes.boldText} >
                                    STATUS
                                </Typography>
                            </Grid>
                            <Grid item xs={8} className={classes.verticalMiddle}>
                                <Typography className={[props.newPVInfo["connected"] ? classes.connected : classes.disconnected, classes.boldText].join(' ')}>
                                    {props.newPVInfo["connected"] ? "CONNECTED" : "DISCONNECTED"}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.handleClose} color="secondary">
                    Cancel
                </Button>
                <Button onClick={props.handleDelete} color="primary" disabled={!props.newPVInfo["connected"]}>
                    Add PV
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default AddPVDialog;