import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';
import useAddUSer from './adminDbHooks/useAddUser';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import AddIcon from '@material-ui/icons/Add';
import {usePasswordValidator} from '../SystemComponents/Utils/passwordValidator'


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


const AddUsers = (props) => {
  const [show, setShow] = useState(false);
  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState(false);
  const [password, setPassword] = useState("");
  const [requirePassword, setRequirePassword] = useState(!(process.env.REACT_APP_DisableStandardLogin === 'true'))
  const {passwordError,passwordHelperText}=usePasswordValidator(password);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [givenName, setGivenName] = useState("");
  const [familyName, setFamilyName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [officeLocation, setOfficeLocation] = useState("");
  const [submit, setSubmit] = useState(false);

  const { duplicateUser, userAdded } = useAddUSer({
    submit: submit,
    user: {
      username: username,
      password: requirePassword ? password : null,
      email: email,
      givenName: givenName,
      familyName: familyName,
      phoneNumber: phoneNumber,
      officeLocation: officeLocation,
    }
  });
  const usernameHelperText = duplicateUser ? "Error: Username Exists" : "Enter a username";

  useEffect(() => {
    if (submit) {
      setSubmit(false)
    }
  }, [submit])

  useEffect(() => {
    if (duplicateUser) {
      setUsernameError(true)
      console.log("error duplicate user")
    }
    else {
      setUsernameError(false)
    }
  }, [duplicateUser])
  
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
  let addUserDisable = ((username.length > 0) && (requirePassword === false || (confirmPasswordError === false) && (passwordError === false))) ? false : true;

  return (
    <React.Fragment>
      <IconButton onClick={() => setShow(true)}>
        <AddIcon />
      </IconButton>
      <Dialog
        open={show}
        TransitionComponent={Transition}
        keepMounted
        aria-labelledby="alert-Login-title2"
        aria-describedby="alert-Login-slide-description2"
      >
        <DialogTitle id="alert-Login-title2">
          {"Add User "}
        </DialogTitle>
        <DialogContent>
          <form autoComplete="off">
            <div style={{ "overflowX": "hidden", 'overflowY': 'hidden' }}>
              <Grid
                style={{ marginTop: 8, padding: 8 }}
                container
                direction="row"
                justifyContent="center"
                alignItems="flex-start"
                spacing={0}
              >
                <Grid item xs={12}  >
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
                        id="field1"
                        inputProps={{
                          autoComplete: "off",
                        }}
                        required
                        label="Username"
                        onChange={(event) => setUsername(event.target.value)}
                        variant="outlined"
                        fullWidth
                        helperText={usernameHelperText}
                        error={usernameError}
                      />
                    </Grid>

                    <Grid item xs={12}  >
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={requirePassword === true}
                            onChange={(event) => (setRequirePassword(event.target.checked))}
                            inputProps={{ 'aria-label': 'primary checkbox' }}
                          />
                        }
                        label="Require Password"
                      />
                    </Grid>

                    {requirePassword && <React.Fragment>
                      <Grid item xs={12}  >
                        <TextField
                          required
                          type="password"
                          label="Password"
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
                        label="Phone Number"
                        onChange={(event) => setPhoneNumber(event.target.value)}
                        variant="outlined"
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12}  >
                      <TextField
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
                        onClick={() => setSubmit(true)}
                      >
                        Add User
                    </Button>
                    </Grid>
                    <Grid item xs={4}  >
                      {userAdded && <CheckCircleIcon
                        fontSize="large"
                        color="primary"
                        style={{
                          // color: theme.palette.error.main,
                          verticalAlign: "middle",
                        }}
                      />}
                      {usernameError && <ErrorIcon color="error" fontSize="large"
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
                        {userAdded ? "Close" : "Cancel"}
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </div>
          </form >
        </DialogContent>
        <DialogActions>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  )
}

export default AddUsers;
