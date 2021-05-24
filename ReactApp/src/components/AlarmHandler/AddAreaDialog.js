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

import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';

import { Domain } from "mdi-material-ui/";

// Styles
const useStyles = makeStyles(theme => ({
    boldText: {
        fontWeight: 500,
        textAlign: 'center',
    },
    button: {
        margin: theme.spacing(1),
    },
    centerInBlock: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: 'center'
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

    const lastIndex = props.data?.roles?.length - 1

    const hasEmptyRole = props.data?.roles?.reduce((acc, entry) => {
        return acc || entry === ''
    }, false)

    const handleNameInput = (event) => {
        const { value } = event.target
        props.setAddAreaDialogData(prevState => ({
            ...prevState,
            area: value
        }))
    }

    const handleRoleInput = (event, index) => {
        const { value } = event.target
        props.setAddAreaDialogData(prevState => ({
            ...prevState,
            roles: [...prevState.roles.slice(0, index), value, ...prevState.roles.slice(index + 1)]
        }))
    }

    const handleAddRoles = () => {
        props.setAddAreaDialogData(prevState => ({
            ...prevState,
            addRoles: true,
            roles: ['']
        }))
    }

    const removeRole = (index) => {
        const lastRole = props.data.roles.length === 1
        if (lastRole) {
            props.setAddAreaDialogData(prevState => ({
                ...prevState,
                addRoles: false,
                roles: []
            }))
        }
        else {
            const newRoles = props.data.roles.filter((item, itemIndex) => itemIndex !== index)
            props.setAddAreaDialogData(prevState => ({
                ...prevState,
                roles: newRoles
            }))
        }
    }

    const addRole = () => {
        props.setAddAreaDialogData(prevState => ({
            ...prevState,
            roles: [...prevState.roles, '']
        }))
    }

    const rolesGrid = !props.data?.addRoles
        ? <Grid item xs={12}>
            <Grid

                container
                direction="row"
                justify="flex-start"
                alignItems="stretch"
            >
                <Grid item xs={4} style={{ marginRight: '1em' }}>
                </Grid>
                <Grid item xs={4}>
                    <Button
                        variant="contained"
                        color="secondary"
                        size="small"
                        className={classes.button}
                        startIcon={<SupervisedUserCircleIcon />}
                        onClick={handleAddRoles}
                    >
                        Add roles
                    </Button>
                </Grid>
            </Grid>
        </Grid>
        : props.data?.roles?.map((role, index) => {
            return <Grid
                key={`${index}-${role}`}
                item
                xs={12}
            >
                <Grid

                    container
                    direction="row"
                    justify="flex-start"
                    alignItems="stretch"
                >
                    <Grid item xs={2} >
                    </Grid>
                    <Grid item xs={1} className={classes.centerInBlock}>
                        <SupervisedUserCircleIcon />
                    </Grid>
                    <Grid item xs={1} className={classes.verticalMiddle} style={{ marginRight: '1rem' }}>
                        <Typography className={classes.boldText} >
                            Role
                        </Typography>
                    </Grid>
                    <Grid item xs={4} className={classes.verticalMiddle}>
                        <TextField
                            type='text'
                            value={props.data.roles[index] || ''}
                            onChange={(event) => handleRoleInput(event, index)}
                            fullWidth
                            autoFocus
                        />
                    </Grid>
                    <Grid item >
                        <Tooltip title="Remove role" placement="bottom">
                            <IconButton
                                onClick={() => removeRole(index)}
                                style={{ marginLeft: '0.5em' }}
                            >
                                <RemoveCircleIcon color="primary" />
                            </IconButton>
                        </Tooltip>
                        {lastIndex === index && <Tooltip title="Add another role" placement="bottom">
                            <IconButton
                                onClick={addRole}
                                style={{ marginLeft: '0.5em' }}
                            >
                                <AddCircleIcon color="secondary" />
                            </IconButton>
                        </Tooltip>}
                    </Grid>
                </Grid>
            </Grid>
        })

    return (
        <Dialog
            open={props.open}
            onClose={props.handleClose}
            fullWidth
            maxWidth={"sm"}
        >
            <DialogTitle >{`${!props.data.edit ? 'Add new ' : 'Edit '}area`}</DialogTitle>
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
                            <Grid item xs={3} className={classes.verticalMiddle} style={{ marginRight: '1rem' }}>
                                <Typography className={classes.boldText} >
                                    {`${props.data.edit ? '' : 'NEW '}AREA NAME`}
                                </Typography>
                            </Grid>
                            <Grid item xs={7} className={classes.verticalMiddle}>
                                <TextField
                                    type='text'
                                    value={props.data.area || ''}
                                    onChange={handleNameInput}
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
                            {rolesGrid}
                        </Grid>
                    </Grid>
                </Grid >
            </DialogContent >
            <DialogActions style={{ marginTop: '2rem' }}>
                <Button onClick={props.handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={props.data.edit ? props.editArea : props.addNewArea} color="secondary" disabled={props.data.area === '' || hasEmptyRole}>
                    {`${props.data.edit ? 'Apply' : 'Add'}`}
                </Button>
            </DialogActions>
        </Dialog >
    )
}

export default React.memo(AddAreaDialog);