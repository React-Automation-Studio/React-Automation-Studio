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
   
    // useEffect(() => {


    //     setSaveOkLatched(saveOk)

    //   }, [saveOk])
 
    const { username } = context.userData;
    const { roles } = context.userData;
    const { userData, initialized: userDataInitialized } = useUserDetails({ username: username });


    
   
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
    

    const classes = useStyles();

   

   

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
                                        label="Username"
                                        variant="outlined"
                                        fullWidth

                                    />
                                </Grid>
                                <Grid item xs={12}  >
                                    <TextField

                                        inputProps={{
                                            autoComplete: "off",
                                            disabled: true
                                        }}
                                        value={roles ? roles.toString().replace(",", ", ") : ""}
                                        label="Roles"
                                        variant="outlined"
                                        fullWidth
                                        multiline
                                    />
                                </Grid>

                                {!(process.env.REACT_APP_DisableStandardLogin === 'true') && <Grid item xs={6}  >
                                    < TextField

                                        inputProps={{
                                            autoComplete: "off",
                                            disabled: true
                                        }}
                                        value={pwDate ? pwDate : ""}
                                       
                                        label="Password last changed"
                                     
                                        variant="outlined"
                                        fullWidth
                                        multiline
                                
                                    />
                                </Grid>}

                                {!(process.env.REACT_APP_DisableStandardLogin === 'true') && <Grid item xs={6}>
                                  <ChangeUserPassword user={{id:id}}/>
                                  </Grid>}
                            
                                <Grid item xs={12}  >
                                    <TextField
                                        inputProps={{
                                            autoComplete: 'off',
                                            disabled: true
                                        }}
                                        value={email ? email : ""}
                                        label="Email"
                                    
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