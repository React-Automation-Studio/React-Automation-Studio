import React, { useState} from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import ErrorIcon from '@material-ui/icons/Error';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import useModifyUser from './userProfileHooks/useModifyUser'
import {usePasswordValidator} from '../Utils/passwordValidator'

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const ChangeUserPassword = (props) => {
    const [show, setShow] = useState(false);
    const [password, setPassword] = useState("");
    const {passwordError,passwordHelperText}=usePasswordValidator(password);
   
    const [confirmPassword, setConfirmPassword] = useState("");
    const {modifyUser,modifyUserError,userModified} =useModifyUser({id:props.user.id,   
        password: password
    });
    
    let confirmPasswordError;
    let confirmPasswordHelperText;

    if (password === confirmPassword) {
        confirmPasswordError = false;
        confirmPasswordHelperText = "Passwords match"
    }
    else {
        confirmPasswordError = true;
        confirmPasswordHelperText = "Passwords do not match"
    }
    let addUserDisable = (((confirmPasswordError === false) && (passwordError === false))) ? false : true;
    
    return (
        <React.Fragment>
            <Button onClick={() => setShow(true)} startIcon={<EditIcon/>}   color="primary"  variant="contained">
               Change Password
            </Button>
            <Dialog
                open={show}
                TransitionComponent={Transition}
                keepMounted
                aria-labelledby="alert-Login-title2"
                aria-describedby="alert-Login-slide-description2"
            >
                <DialogTitle id="alert-Login-title2">
                    {"Modify User"}
                </DialogTitle>
                <DialogContent>
                    <form autoComplete="off">
                        <div >
                            <Grid
                                style={{ marginTop: 8, padding: 8 }}
                                container
                                direction="row"
                                justify="center"
                                alignItems="flex-start"
                                spacing={0}
                            >
                                <Grid item xs={12} sm={12} md={12} lg={12} >
                                    <Grid
                                        style={{ padding: 8 }}
                                        container
                                        direction="row"
                                        justify="flex-start"
                                        alignItems="flex-start"
                                        spacing={2}
                                    >
                                        <React.Fragment>
                                            <Grid item xs={12}  >
                                                <TextField
                                                    required
                                                    type="password"
                                                    label="New Password"
                                                    onChange={(event) => setPassword(event.target.value)}
                                                    variant="outlined"
                                                    fullWidth
                                                    helperText={passwordHelperText}
                                                    error={passwordError}
                                                    inputProps={{
                                                        autoComplete: "off",
                                                    }}
                                                    autoComplete="new-password"
                                                />
                                            </Grid>
                                            <Grid item xs={12}  >
                                                <TextField
                                                    required
                                                    type="password"
                                                    label="Confirm Password"
                                                    onChange={(event) => setConfirmPassword(event.target.value)}
                                                    helperText={confirmPasswordHelperText}
                                                    error={confirmPasswordError}
                                                    variant="outlined"
                                                    fullWidth
                                                    autoComplete="off"
                                                />
                                            </Grid>
                                        </React.Fragment>
                                        
                                        <Grid item xs={4}  >
                                            <Button variant="contained" color="primary" disabled={addUserDisable}
                                                onClick={() =>modifyUser({
                                                    id:props.user.id,
                                                    password: password,
                                                })}
                                            >
                                                Update Password
                                            </Button>
                                        </Grid>
                                        <Grid item xs={4}  >
                                            {userModified && <CheckCircleIcon
                                                fontSize="large"
                                                color="primary"
                                                style={{
                                                    // color: theme.palette.error.main,
                                                    verticalAlign: "middle",
                                                }}
                                            />}
                                            {modifyUserError && <ErrorIcon color="error" fontSize="large"
                                                style={{
                                                verticalAlign: "middle",
                                                }}
                                            />}
                                        </Grid>
                                        <Grid item xs={4}>
                                            <Button
                                                onClick={() => setShow(false)}
                                                color="primary"
                                            >
                                                {userModified ? "Close" : "Cancel"}
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </div>
                    </form >
                </DialogContent>

            </Dialog>
        </React.Fragment>
    )
}

export default ChangeUserPassword;
