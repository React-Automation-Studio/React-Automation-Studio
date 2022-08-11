import React from 'react';
import makeStyles from '@mui/styles/makeStyles';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

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


const RenameDialog = (props) => {
    const classes = useStyles()

    const title = props.data?.index
        ? props.data.index.includes("=")
            ? `subArea`
            : `area`
        : ``

    const handleInput = (event) => {
        const { value } = event.target
        props.setRenameDialogData(prevState => ({
            ...prevState,
            newName: value
        }))
    }

    return (
        <Dialog
            open={props.open}
            onClose={props.handleClose}
            fullWidth
            maxWidth={"sm"}
        >
            <DialogTitle >{`Rename ${title}`}</DialogTitle>
            <DialogContent>
                <Grid
                    container
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="stretch"
                    spacing={2}
                >
                    <Grid item xs={12}>
                        <Grid
                            container
                            direction="row"
                            justifyContent="flex-start"
                            alignItems="stretch"
                        >
                            <Grid item xs={3} className={[classes.verticalMiddle, classes.horizontalRight].join(' ')}>
                                <Typography className={classes.boldText} >
                                    CURRENT NAME:
                                </Typography>
                            </Grid>
                            <Grid item xs={8} className={classes.verticalMiddle} style={{ marginLeft: '1em' }}>
                                <Typography>
                                    {props.data.currentName}
                                </Typography>
                            </Grid>
                        </Grid >
                    </Grid >
                    <Grid item xs={12}>
                        <Grid
                            container
                            direction="row"
                            justifyContent="flex-start"
                            alignItems="stretch"
                        >
                            <Grid item xs={3} className={[classes.verticalMiddle, classes.horizontalRight].join(' ')}>
                                <Typography className={classes.boldText} >
                                    NEW NAME:
                                </Typography>
                            </Grid>
                            <Grid item xs={8} className={classes.verticalMiddle} style={{ marginLeft: '1em' }}>
                                <TextField
                                    type='text'
                                    value={props.data.newName}
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
                <Button onClick={props.executeRenameArea} color="secondary" disabled={props.data.newName === ''}>
                    Rename
                </Button>
            </DialogActions>
        </Dialog >
    )
}

export default React.memo(RenameDialog);