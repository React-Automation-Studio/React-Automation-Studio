import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Typography from '@material-ui/core/Typography';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import { Domain, Lan, LanConnect, LanDisconnect } from "mdi-material-ui/";

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
            maxWidth={"md"}
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
                            <Grid item xs={1} className={classes.centerInBlock}>
                                <Domain />
                            </Grid>
                            <Grid item xs={1} className={classes.verticalMiddle} style={{ marginRight: '2rem' }}>
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
                            <Grid item xs={1} className={classes.centerInBlock}>
                                <Lan />
                            </Grid>
                            <Grid item xs={1} className={classes.verticalMiddle} style={{ marginRight: '2rem' }}>
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
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end"  >
                                                {props.newPVInfo["connected"]
                                                    ? <LanConnect className={classes.connected} />
                                                    : <LanDisconnect className={classes.disconnected} />
                                                }
                                            </InputAdornment >
                                        )
                                    }}
                                />
                            </Grid>
                            <Grid item className={classes.centerInBlock}>
                                <IconButton style={{ marginLeft: '0.5em' }}>
                                    <RemoveCircleIcon color="primary" />
                                </IconButton>
                                <IconButton>
                                    <AddCircleIcon color="secondary" />
                                </IconButton>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions style={{ marginTop: '2rem' }}>
                <Button onClick={props.handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={props.handleDelete} color="secondary" disabled={!props.newPVInfo["connected"]}>
                    Add
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default AddPVDialog;