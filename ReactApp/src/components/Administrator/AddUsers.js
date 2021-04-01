import React, { useState,useEffect } from 'react';



import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';


import Grid from '@material-ui/core/Grid';


import Card from '@material-ui/core/Card';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import useAddUSer from './adminDbHooks/useAddUser';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';




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



const AddUsers = (props) => {

  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState(false);
  const [password, setPassword] = useState("");
  const [requirePassword, setRequirePassword] = useState(!(process.env.REACT_APP_DisableStandardLogin === 'true'))
  const passwordHelperText = "Minimum length 12 characters";
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [givenName, setGivenName] = useState("");
  const [familyName, setFamilyName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [officeLocation, setOfficeLocation] = useState("");
  const [submit, setSubmit] = useState(false);

  const {duplicateUser,userAdded} = useAddUSer({
    submit: submit,
    user: {
      username: username,
      password: requirePassword ? password : "",
      email: email,
      givenName: givenName,
      familyName: familyName,
      phoneNumber: phoneNumber,
      officeLocation: officeLocation,
    }
  });
  const usernameHelperText =duplicateUser?"Error: Username Exists": "Enter a username";
  useEffect(() => {
    if (submit) {

      setSubmit(false)
    }
  }, [submit])

  useEffect(()=>{
    if (duplicateUser){
      setUsernameError(true)
      console.log("error duplicate user")
    }
    else{
      setUsernameError(false)
    }
  
  },[duplicateUser])
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
  let addUserDisable = ((username.length > 0) && (requirePassword === false || (confirmPasswordError === false) && (passwordError === false))) ? false : true;
  
  return (
    <form autoComplete="off">
    
     
      <div style={{ "overflowX": "hidden", 'overflowY': 'hidden' }}>
    
        <Grid
          style={{ marginTop: 8, padding: 8 }}
          container
          direction="row"
          justify="center"
          alignItems="flex-start"
          spacing={0}
        >



          <Grid item xs={12} sm={12} md={6} lg={4} >
            <Typography> New User</Typography>
            <Card style={{ padding: 8 }}>
              <Grid
                style={{ padding: 8 }}
                container
                direction="row"
                justify="flex-start"
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
                <Grid item xs={6}  >
                  <Button variant="contained" color="primary" disabled={addUserDisable}
                    onClick={() =>setSubmit(true)}
                  >
                    Add User
                    </Button>
              </Grid>
              <Grid item xs={6}  >
                 {userAdded&&<CheckCircleIcon
                  fontSize="large"
                  color="primary"
                  style={{
                   // color: theme.palette.error.main,
                    verticalAlign: "middle",
                  }}
                 />}
                 {usernameError&&<ErrorIcon   color="error" fontSize="large"
                 style={{
                  // color: theme.palette.error.main,
                   verticalAlign: "middle",
                 }}
                 />}
              </Grid>

              </Grid>

            </Card>

        </Grid>
        </Grid>



      </div>
    </form >




  )

}


export default AddUsers;
//export default AddUsers;
