import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import ErrorIcon from '@material-ui/icons/Error';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import useModifyUser from './userProfileHooks/useModifyUser'
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});




const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        padding: theme.spacing(2)
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));

const ChangeUserPassword = (props) => {

    const [show, setShow] = useState(false);
    const [error, setError] = useState(false);
    const [username, setUsername] = useState(props.user.username);
    const [usernameError, setUsernameError] = useState(false);
    const [password, setPassword] = useState("");
    const [changePassword, setChangePassword] = useState(false)
    const passwordHelperText = "Minimum length 12 characters";
    const [confirmPassword, setConfirmPassword] = useState("");
    const [email, setEmail] = useState(props.user.email);
    const [givenName, setGivenName] = useState(props.user.givenName);
    const [familyName, setFamilyName] = useState(props.user.familyName);
    const [phoneNumber, setPhoneNumber] = useState(props.user.phoneNumber);
    const [officeLocation, setOfficeLocation] = useState(props.user.officeLocation);
    const [submit, setSubmit] = useState(false);
    const {modifyUser,modifyUserError,userModified} =useModifyUser({id:props.user.id,
   
    password: password ,
   });

    const classes = useStyles();

    let passwordError;

    if (password.length < 12) {
        passwordError = true;
    }
    else {
        passwordError = false;
    }
    let confirmPasswordError;
    let confirmPasswordHelperText;

    if (password == confirmPassword) {
        confirmPasswordError = false;
        confirmPasswordHelperText = "Passwords match"
    }
    else {
        confirmPasswordError = true;
        confirmPasswordHelperText = "Passwords do not match"
    }
    let addUserDisable = (((confirmPasswordError === false) && (passwordError === false))) ? false : true;

    const usernameHelperText = ""
    
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
                          // color: theme.palette.error.main,
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