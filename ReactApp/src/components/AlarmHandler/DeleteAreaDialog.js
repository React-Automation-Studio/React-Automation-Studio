import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const DeleteAreaDialog = (props) => {
    return (
        <Dialog
            open={props.open}
            onClose={props.handleClose}
        >
            <DialogTitle >{"Confirm area deletion"}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {`Are you sure you want to delete ${props?.data?.index?.includes("=") ? 'subArea' : 'area'} ${props?.data?.areaName}?`}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.handleClose} color="secondary">
                    No
                </Button>
                <Button onClick={props.handleDelete} color="primary">
                    Yes
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default React.memo(DeleteAreaDialog);