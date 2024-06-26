import React from 'react';
import makeStyles from '@mui/styles/makeStyles';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';

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


const AddSubAreaDialog = (props) => {
    const classes = useStyles()

    const lastIndex = props.data?.roles?.length - 1

    const hasEmptyRole = props.data?.roles?.reduce((acc, entry) => {
        return acc || entry === ''
    }, false)

    const handleNameInput = (event) => {
        const { value } = event.target
        props.setAddSubAreaData(prevState => ({
            ...prevState,
            subArea: value.replaceAll(" ","")
        }))
    }

    const handleRoleInput = (event, index) => {
        const { value } = event.target
        props.setAddSubAreaData(prevState => ({
            ...prevState,
            roles: [...prevState.roles.slice(0, index), value, ...prevState.roles.slice(index + 1)]
        }))
    }

    const handleAddRoles = () => {
        props.setAddSubAreaData(prevState => ({
            ...prevState,
            addRoles: true,
            roles: ['']
        }))
    }

    const removeRole = (index) => {
        const lastRole = props.data.roles.length === 1
        if (lastRole) {
            props.setAddSubAreaData(prevState => ({
                ...prevState,
                addRoles: false,
                roles: []
            }))
        }
        else {
            const newRoles = props.data.roles.filter((item, itemIndex) => itemIndex !== index)
            props.setAddSubAreaData(prevState => ({
                ...prevState,
                roles: newRoles
            }))
        }
    }

    const addRole = () => {
        props.setAddSubAreaData(prevState => ({
            ...prevState,
            roles: [...prevState.roles, '']
        }))
    }

    const rolesGrid = !props.data?.addRoles
        ? <Grid item xs={12}>
            <Grid

                container
                direction="row"
                justifyContent="flex-start"
                alignItems="stretch"
            >
                <Grid item xs={4}>
                </Grid>
                <Grid item xs={4} className={classes.centerInBlock}>
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
            return (
                <Grid
                    key={`${index}-${role}`}
                    item
                    xs={12}
                >
                    <Grid

                        container
                        direction="row"
                        justifyContent="flex-start"
                        alignItems="stretch"
                    >
                        <Grid item xs={2} >
                        </Grid>
                        <Grid item xs={1} className={classes.centerInBlock}>
                            <SupervisedUserCircleIcon />
                        </Grid>
                        <Grid item xs={1} className={classes.verticalMiddle} style={{ marginRight: '2rem' }}>
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
                                    size="large">
                                    <RemoveCircleIcon color="primary" />
                                </IconButton>
                            </Tooltip>
                            {lastIndex === index && <Tooltip title="Add another role" placement="bottom">
                                <IconButton onClick={addRole} style={{ marginLeft: '0.5em' }} size="large">
                                    <AddCircleIcon color="secondary" />
                                </IconButton>
                            </Tooltip>}
                        </Grid>
                    </Grid>
                </Grid>
            );
        })

    return (
        <Dialog
            open={props.open}
            onClose={props.handleClose}
            fullWidth
            maxWidth={"sm"}
        >
            <DialogTitle >{`${!props.data.edit ? 'Add new ' : 'Edit '}subArea`}</DialogTitle>
            <DialogContent>
                <Grid
                    container
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="stretch"
                    spacing={2}
                    style={{ marginTop: '0.5rem' }}
                >
                    <Grid item xs={12}>
                        <Grid
                            container
                            direction="row"
                            justifyContent="flex-start"
                            alignItems="stretch"
                        >
                            <Grid item xs={1} className={classes.centerInBlock}>
                                <Domain />
                            </Grid>
                            <Grid item xs={3} className={[classes.verticalMiddle, classes.horizontalRight].join(' ')} style={{ marginRight: '2rem' }}>
                                <Typography className={classes.boldText} >
                                    TOP AREA NAME
                                </Typography>
                            </Grid>
                            <Grid item xs={7} className={classes.verticalMiddle}>
                                <Typography style={{ textAlign: 'left' }}>
                                    {props.data.areaIndex}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid
                            container
                            direction="row"
                            justifyContent="flex-start"
                            alignItems="stretch"
                        >
                            <Grid item xs={4} className={[classes.verticalMiddle, classes.horizontalRight].join(' ')} style={{ marginRight: '2rem' }}>
                                <Typography className={classes.boldText} >
                                    {`${!props.data.edit ? 'NEW ' : ''}SUBAREA NAME`}
                                </Typography>
                            </Grid>
                            <Grid item xs={7} className={classes.verticalMiddle}>
                                <TextField
                                    type='text'
                                    value={props.data.subArea || ''}
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
                            justifyContent="flex-start"
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
                <Button onClick={props.data.edit ? props.executeEditSubArea : props.executeAddNewSubArea} color="secondary" disabled={props.data.subArea === '' || hasEmptyRole}>
                    {props.data.edit ? 'Apply' : 'Add'}
                </Button>
            </DialogActions>
        </Dialog >
    )
}

export default React.memo(AddSubAreaDialog);