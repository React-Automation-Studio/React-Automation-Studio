import React, { useContext } from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { useTheme } from '@material-ui/core/styles';
import TraditionalLayout from '../../UI/Layout/ComposedLayouts/TraditionalLayout';
import AutomationStudioContext from '../../SystemComponents/AutomationStudioContext';
import useUserDetails from './userProfileHooks/useUserDetails';
import Paper from '@material-ui/core/Paper';
import EditUser from './EditUser'
import ChangeUserPassword from './ChangeUserPassword';





const UserProfile = (props) => {
    const context = useContext(AutomationStudioContext);
    const theme = useTheme()
    const { username } = context.userData;
    const { roles } = context.userData;
    const { userData, initialized: userDataInitialized } = useUserDetails({ username: username });
    const { email, givenName, familyName, phoneNumber, officeLocation, pwTimestamp } = userData;
    let id;
    if (userDataInitialized) {
        id = userData['_id']['$oid']
    }
    else {
        id = null
    }
    let pwDate;
    if (pwTimestamp) {
        pwDate = (new Date(pwTimestamp * 1000)).toLocaleString();
    }
    else {
        pwDate = ""
    }


    



    return (

        <TraditionalLayout
            title={"User Profile"}
        >
            <form autoComplete="off">
                <Grid
                    style={{ marginTop: 16, padding: 32 }}
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="flex-start"
                    spacing={0}
                >
                    <Grid item xs={12} sm={12} md={12} lg={4} >
                        <Paper elevation={theme.palette.paperElevation} >
                            <Grid
                                style={{ padding: 16 }}
                                container
                                direction="row"
                                justifyContent="flex-start"
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
                                    <ChangeUserPassword user={{ id: id }} />
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
                                    {userDataInitialized && <EditUser
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