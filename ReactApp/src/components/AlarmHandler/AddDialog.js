import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

const AddDialog = (props) => {
    const addEnabled = props.name.length !== 0 && props.username.length !== 0
    return (
        <Dialog
            open={props.open}
            onClose={props.handleClose}
            fullWidth
            maxWidth='xs'
        >
            <DialogTitle >{"Add new user"}</DialogTitle>
            <DialogContent>
                <Grid
                    container
                    direction="column"
                    justify="center"
                    alignItems="stretch"
                >
                    <Grid item>
                        <TextField
                            required
                            label="Name"
                            helperText="Full name and surname"
                            fullWidth
                            value={props.name}
                            onChange={props.setNewName}
                            autoFocus
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            required
                            label="Username"
                            helperText="React Automation Studio username"
                            fullWidth
                            value={props.username}
                            onChange={props.setNewUsername}
                        />
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={props.handleAddNewUser} color="secondary" disabled={!addEnabled}>
                    Add
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default AddDialog;