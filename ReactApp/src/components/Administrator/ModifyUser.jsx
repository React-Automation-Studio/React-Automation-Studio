import React, { useState} from 'react';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/GridLegacy';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import ErrorIcon from '@mui/icons-material/Error';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import useModifyUser from './adminDbHooks/useModifyUser'
import {usePasswordValidator} from '../SystemComponents/Utils/passwordValidator'

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


const ModifyUser = (props) => {
    const [show, setShow] = useState(false);
    const [username] = useState(props.user.username);
    const [password, setPassword] = useState("");
    const [changePassword, setChangePassword] = useState(false)
    const {passwordError,passwordHelperText}=usePasswordValidator(password);
    const [confirmPassword, setConfirmPassword] = useState("");
    const [email, setEmail] = useState(props.user.email);
    const [givenName, setGivenName] = useState(props.user.givenName);
    const [familyName, setFamilyName] = useState(props.user.familyName);
    const [phoneNumber, setPhoneNumber] = useState(props.user.phoneNumber);
    const [officeLocation, setOfficeLocation] = useState(props.user.officeLocation);
    const {modifyUser,modifyUserError,userModified} =useModifyUser({id:props.user['_id']['$oid'],
        username: username,
        password: changePassword ? password : null,
        email: email,
        givenName: givenName,
        familyName: familyName,
        phoneNumber: phoneNumber,
        officeLocation: officeLocation});

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
    // eslint-disable-next-line no-mixed-operators
    let addUserDisable = ((username.length > 0) && (changePassword === false || (confirmPasswordError === false) && (passwordError === false))) ? false : true;
    
    return (
        <React.Fragment>
            <IconButton onClick={() => setShow(true)} size="large">
                <EditIcon />
            </IconButton>
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
                                justifyContent="center"
                                alignItems="flex-start"
                                spacing={0}
                            >
                                <Grid item xs={12} sm={12} md={12} lg={12} >
                                    <Grid
                                        style={{ padding: 8 }}
                                        container
                                        direction="row"
                                        justifyContent="flex-start"
                                        alignItems="flex-start"
                                        spacing={2}
                                    >
                                        <Grid item xs={12}  >
                                            <TextField
                                                inputProps={{
                                                    autoComplete: "off",
                                                }}
                                                value={username}
                                                label="Username"
                                                variant="outlined"
                                                fullWidth
                                                disabled
                                            />
                                        </Grid>
                                        {!(import.meta.env.VITE_DisableStandardLogin === 'true') && <Grid item xs={12}  >
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        checked={changePassword === true}
                                                        onChange={(event) => (setChangePassword(event.target.checked))}
                                                        inputProps={{ 'aria-label': 'primary checkbox' }}
                                                    />
                                                }
                                                label="Change Password"
                                            />
                                        </Grid>}
                                        {changePassword && <React.Fragment>
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
                                        </React.Fragment>}
                                        <Grid item xs={12}  >
                                            <TextField
                                                inputProps={{
                                                    autoComplete: 'off'
                                                }}
                                                value={email}
                                                label="Email"
                                                onChange={(event) => setEmail(event.target.value)}
                                                variant="outlined"
                                                fullWidth
                                            />
                                        </Grid>
                                        <Grid item xs={12}  >
                                            <TextField
                                                inputProps={{
                                                    autoComplete: 'off'
                                                }}
                                                value={givenName}
                                                label="Given Name"
                                                onChange={(event) => setGivenName(event.target.value)}
                                                variant="outlined"
                                                fullWidth
                                            />
                                        </Grid>
                                        <Grid item xs={12}  >
                                            <TextField
                                                inputProps={{
                                                    autoComplete: 'off'
                                                }}
                                                label="Family Name"
                                                value={familyName}
                                                onChange={(event) => setFamilyName(event.target.value)}
                                                variant="outlined"
                                                fullWidth
                                            />
                                        </Grid>
                                        <Grid item xs={12}  >
                                            <TextField
                                                inputProps={{
                                                    autoComplete: 'off'
                                                }}
                                                value={phoneNumber}
                                                label="Phone Number"
                                                onChange={(event) => setPhoneNumber(event.target.value)}
                                                variant="outlined"
                                                fullWidth
                                            />
                                        </Grid>
                                        <Grid item xs={12}  >
                                            <TextField
                                                value={officeLocation}
                                                inputProps={{
                                                    autoComplete: 'off'
                                                }}
                                                label="Office Location "
                                                onChange={(event) => setOfficeLocation(event.target.value)}
                                                variant="outlined"
                                                fullWidth
                                            />
                                        </Grid>
                                        <Grid item xs={4}  >
                                            <Button variant="contained" color="primary" disabled={addUserDisable}
                                                onClick={() =>modifyUser({
                                                    id:props.user['_id']['$oid'],
                                                    username: username,
                                                    password: changePassword ? password : null,
                                                    email: email,
                                                    givenName: givenName,
                                                    familyName: familyName,
                                                    phoneNumber: phoneNumber,
                                                    officeLocation: officeLocation,
                                                   

                                                })}
                                            >
                                                Modify User
                                            </Button>
                                        </Grid>
                                        <Grid item xs={4}  >
                                            {userModified && <CheckCircleIcon
                                                fontSize="large"
                                                color="primary"
                                                style={{
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
    );
}

export default ModifyUser;
