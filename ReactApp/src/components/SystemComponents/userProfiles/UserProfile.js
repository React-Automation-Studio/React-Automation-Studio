import React, { useState, useEffect, useContext } from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import ErrorIcon from '@material-ui/icons/Error';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
//import useModifyUser from './userProfileHooks/useModifyUser'
import TraditionalLayout from '../../UI/Layout/ComposedLayouts/TraditionalLayout';
import AutomationStudioContext from '../../SystemComponents/AutomationStudioContext';
import useUserDetails from './userProfileHooks/useUserDetails';
import Paper from '@material-ui/core/Paper';
import EditUser from './EditUser'
import ChangeUserPassword from './ChangeUserPassword';
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

const UserProfile = (props) => {
    const context = useContext(AutomationStudioContext);
    const theme = useTheme()
    console.log(context)
    const [show, setShow] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [editModeErrors, setEditModeErrors] = useState(false);
    const [save, setSave] = useState(false);
    const [saveOkLatched, setSaveOkLatched] = useState(false);
    const [showDiscardChanges, setShowDiscardChanges] = useState(false);
    const [showSaveChanges, setShowSaveChanges] = useState(false);
    const [clear, setClear] = useState(false);
    // useEffect(() => {


    //     setSaveOkLatched(saveOk)

    //   }, [saveOk])
    const [error, setError] = useState(false);
    const { username } = context.userData;
    const { roles } = context.userData;
    const { userData, initialized: userDataInitialized } = useUserDetails({ username: username });
    const [modifiedUserData, setModifiedUserData] = useState({});
    useEffect(() => {
        if (editMode === false) {
            if (userDataInitialized) {
                const newUserDetails = JSON.parse(JSON.stringify(userData));
                setModifiedUserData(newUserDetails)
            }
        }
        else if (clear === true) {
            setSave(false)
            setEditMode(false)
            setClear(false)
        }
        else if (save === true) {
            //   updateUAGs({ UAGs: modifiedUserGroups })
            setSave(false)
        }
        else if (saveOkLatched === true) {
            setEditMode(false)
            setSaveOkLatched(false)
            setSave(false)
            setClear(false)
        }


    }, [userData, editMode, save, clear, saveOkLatched, userDataInitialized])
    console.log(username, userData)
    const [usernameError, setUsernameError] = useState(false);
    const [password, setPassword] = useState("");
    const [changePassword, setChangePassword] = useState(false)
    const passwordHelperText = "Minimum length 12 characters";
    const [confirmPassword, setConfirmPassword] = useState("");
    const { email, givenName, familyName, phoneNumber, officeLocation, pwTimestamp } = userData;
    let id;
    if (userDataInitialized){
        id =userData['_id']['$oid']
    }
    else{
        id =null
    }
    let pwDate;
    if (pwTimestamp) {
        pwDate = (new Date(pwTimestamp * 1000)).toLocaleString();
    }
    else {
        pwDate = ""
    }
    const [submit, setSubmit] = useState(false);
    // const { modifyUser, modifyUserError, userModified } = useModifyUser({
    //     id: null,
    //     username: username,
    //     password: changePassword ? password : null,
    //     email: email,
    //     givenName: givenName,
    //     familyName: familyName,
    //     phoneNumber: phoneNumber,
    //     officeLocation: officeLocation
    // });

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
    let addUserDisable = ((username.length > 0) && (changePassword === false || (confirmPasswordError === false) && (passwordError === false))) ? false : true;

    const usernameHelperText = ""

    return (

        <TraditionalLayout
            title={"User Profile"}
        >


            <form autoComplete="off">




                <Grid
                    style={{ marginTop: 16, padding: 32 }}
                    container
                    direction="row"
                    justify="center"
                    alignItems="flex-start"
                    spacing={0}
                >




                    <Grid item xs={12} sm={12} md={12} lg={4} >
                        <Paper elevation={theme.palette.paperElevation} >

                            <Grid
                                style={{ padding: 16 }}
                                container
                                direction="row"
                                justify="flex-start"
                                alignItems="flex-start"
                                spacing={4}
                            >
                                <Grid item xs={12}  >
                                    <TextField

                                        inputProps={{
                                            autoComplete: "off",
                                            disabled: true
                                        }}
                                        value={username}
                                        // required
                                        label="Username"
                                        // onChange={(event) => setUsername(event.target.value)}
                                        variant="outlined"
                                        fullWidth
                                    // helperText={usernameHelperText}
                                    // error={usernameError}

                                    />
                                </Grid>
                                <Grid item xs={12}  >
                                    <TextField

                                        inputProps={{
                                            autoComplete: "off",
                                            disabled: true
                                        }}
                                        value={roles ? roles.toString().replace(",", ", ") : ""}
                                        // required
                                        label="Roles"
                                        // onChange={(event) => setUsername(event.target.value)}
                                        variant="outlined"
                                        fullWidth
                                        multiline
                                    // helperText={usernameHelperText}
                                    // error={usernameError}

                                    />
                                </Grid>

                                {!(process.env.REACT_APP_DisableStandardLogin === 'true') && <Grid item xs={6}  >
                                    < TextField

                                        inputProps={{
                                            autoComplete: "off",
                                            disabled: true
                                        }}
                                        value={pwDate ? pwDate : ""}
                                        // required
                                        label="Password last changed"
                                        // onChange={(event) => setUsername(event.target.value)}
                                        variant="outlined"
                                        fullWidth
                                        multiline
                                    // helperText={usernameHelperText}
                                    // error={usernameError}

                                    />
                                </Grid>}

                                {!(process.env.REACT_APP_DisableStandardLogin === 'true') && <Grid item xs={6}>
                                  <ChangeUserPassword user={{id:id}}/>
                                  </Grid>}
                                {/* 
                                        {!(process.env.REACT_APP_DisableStandardLogin === 'true') && <Grid item xs={12}  >
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
                                        </React.Fragment>} */}
                                <Grid item xs={12}  >
                                    <TextField
                                        inputProps={{
                                            autoComplete: 'off',
                                            disabled: true
                                        }}
                                        value={email ? email : ""}
                                        label="Email"
                                        onChange={(event) => setModifiedUserData(prev => {
                                            const newData = { ...prev }
                                            newData['email'] = event.target.value
                                            return (newData)
                                        })}
                                        variant="outlined"
                                        fullWidth

                                    />
                                </Grid>
                                <Grid item xs={12}  >
                                    <TextField
                                        inputProps={{
                                            autoComplete: 'off',
                                            disabled: true
                                        }}
                                        value={givenName ? givenName : ""}
                                        label="Given Name"
                                        onChange={(event) => setModifiedUserData(prev => {
                                            const newData = { ...prev }
                                            newData['givenName'] = event.target.value
                                            return (newData)
                                        })}
                                        variant="outlined"
                                        fullWidth

                                    />
                                </Grid>
                                <Grid item xs={12}  >
                                    <TextField
                                        inputProps={{
                                            autoComplete: 'off',
                                            disabled: true
                                        }}
                                        label="Family Name"
                                        value={familyName ? familyName : ""}
                                        onChange={(event) => setModifiedUserData(prev => {
                                            const newData = { ...prev }
                                            newData['familyName'] = event.target.value
                                            return (newData)
                                        })}
                                        variant="outlined"
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12}  >
                                    <TextField
                                        inputProps={{
                                            autoComplete: 'off',
                                            disabled: true
                                        }}

                                        label="Phone Number"
                                        value={phoneNumber ? phoneNumber : ""}
                                        onChange={(event) => setModifiedUserData(prev => {
                                            const newData = { ...prev }
                                            newData['phoneNumber'] = event.target.value
                                            return (newData)
                                        })}
                                        variant="outlined"
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12}  >
                                    <TextField

                                        inputProps={{
                                            autoComplete: 'off',
                                            disabled: true
                                        }}
                                        label="Office Location "
                                        value={officeLocation ? officeLocation : ""}
                                        onChange={(event) => setModifiedUserData(prev => {
                                            const newData = { ...prev }
                                            newData['officeLocation'] = event.target.value
                                            return (newData)
                                        })}
                                        variant="outlined"
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={4}></Grid>
                                <Grid item xs={4}></Grid>
                                <Grid item xs={4}>
                                    {userDataInitialized&&<EditUser
                                        user={{
                                            id: id,
                                            username: username,
                                            password: changePassword ? password : null,
                                            email: email,
                                            givenName: givenName,
                                            familyName: familyName,
                                            phoneNumber: phoneNumber,
                                            officeLocation: officeLocation
                                        }}
                                    />}
                                </Grid>

                            </Grid>


                        </Paper>
                    </Grid>
                </Grid>




            </form >

        </TraditionalLayout>
    )
}
export default UserProfile;