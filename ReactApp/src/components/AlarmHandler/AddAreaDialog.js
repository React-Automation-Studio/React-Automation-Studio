import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import { Domain } from "mdi-material-ui/";

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
    horizontalRight: {
        alignItems: "flex-end"
    },
    verticalMiddle: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
    }
}))


const AddAreaDialog = (props) => {
    const classes = useStyles()

    const handleInput = (event) => {
        const { value } = event.target
        props.setAddAreaName(value)
    }

    return (
        <Dialog
            open={props.open}
            onClose={props.handleClose}
            fullWidth
            maxWidth={"sm"}
        >
            <DialogTitle >{`Add new area`}</DialogTitle>
            <DialogContent>
                <Grid
                    container
                    direction="row"
                    justify="flex-start"
                    alignItems="stretch"
                    spacing={2}
                    style={{ marginTop: '0.5rem' }}
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
                            <Grid item xs={2} className={classes.verticalMiddle} style={{ marginRight: '2rem' }}>
                                <Typography className={classes.boldText} >
                                    AREA NAME
                                </Typography>
                            </Grid>
                            <Grid item xs={8} className={classes.verticalMiddle}>
                                <TextField
                                    type='text'
                                    value={props.addAreaName}
                                    onChange={handleInput}
                                    fullWidth
                                    autoFocus
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid >
            </DialogContent >
            <DialogActions style={{ marginTop: '2rem' }}>
                <Button onClick={props.handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={props.addNewArea} color="secondary" disabled={props.addAreaName === ''}>
                    Add
                </Button>
            </DialogActions>
        </Dialog >
    )
}

export default React.memo(AddAreaDialog);