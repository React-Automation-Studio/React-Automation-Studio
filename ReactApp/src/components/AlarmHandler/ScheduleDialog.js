import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
// import Slide from '@material-ui/core/Slide';

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(1),
        paddingTop: theme.spacing(2),
        width: "100%",
        margin: 0
    },
}))

const ScheduleDialog = (props) => {

    const classes = useStyles()

    // const Transition = React.forwardRef(function Transition(props, ref) {
    //     return <Slide direction="left" ref={ref} {...props} />
    // })

    return (
        <Dialog
            // TransitionComponent={Transition}
            // fullWidth={fullWidth}
            // maxWidth={maxWidth}
            open={props.dialogOpen}
            onBackdropClick={props.closeDialog}
            onClose={props.closeDialog}
        >
            <DialogTitle>{`Set ${props.name}'s notification schedule`}</DialogTitle>
            <DialogContent>
            </DialogContent>
        </Dialog>
    );
};

export default React.memo(ScheduleDialog);